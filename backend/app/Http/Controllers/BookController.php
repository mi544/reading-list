<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Book;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use App\Http\Clients\GAPIClient;
use Illuminate\Support\Carbon;


class BookController extends Controller
{
    /**
     * Display all books in ascending order.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $user_id = Auth::user()->id;
        $user = User::find($user_id);
        $books = $user->books()->orderBy('order', 'ASC')->get();

        return response()->json($books);
    }

    /**
     * Store a new book in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gid' => ['required', 'string', 'min:1', 'max:100'],
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }

        $user_id = Auth::user()->id;

        $user = User::find($user_id);

        $book_id = request()->only(['gid']);

        // see if a book with that gid already exists for that user
        $book_found = $user->books()->where('gid', $book_id)->first();

        // if a book with that id exists, don't add it
        if ($book_found) {
            $response_data = [
                'status' => 'error_book_already_exists',
            ];

            return response()->json($response_data, 303);
        }

        $last_book = $user->books()->orderBy('order', 'DESC')->first();
        // if no last book found (no books exist yet), set order to 1
        $last_book_order_num = $last_book ? $last_book->order : 0;

        $book_data = GAPIClient::getBookById($book_id['gid']);

        if (!$book_data) {
            $response_data = [
                'status' => 'error',
            ];

            return response()->json($response_data, 500);
        }

        $new_book = Book::create([
            'gid' => $book_data['id'],
            'thumbnail_url' => isset($book_data['volumeInfo']['imageLinks']['thumbnail']) ? $book_data['volumeInfo']['imageLinks']['thumbnail'] : null,
            'title' =>  $book_data['volumeInfo']['title'],
            'subtitle' =>  isset($book_data['volumeInfo']['subtitle']) ? $book_data['volumeInfo']['subtitle'] : null,
            'authors' =>  isset($book_data['volumeInfo']['authors']) ? json_encode($book_data['volumeInfo']['authors']) : null,
            'categories' =>  isset($book_data['volumeInfo']['categories']) ? json_encode($book_data['volumeInfo']['categories']) : null,
            'order' =>  $last_book_order_num + 1,
            'user_id' => $user_id,
        ]);

        return response()->json($new_book);
    }

    /**
     * Sets a new order of books in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function setOrder(Request $request)
    {
        $validator = Validator::make($request->all(), [
            '*.gid' => ['required', 'string', 'min:1', 'max:100'],
            '*.order' => ['required', 'int', 'min:1'],
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }

        $user_id = Auth::user()->id;

        $user = User::find($user_id);

        $book_data = request()->all();

        for ($i = 0; $i < count($book_data); $i += 1) {
            $book_found = $user->books()->where('gid', $book_data[$i]['gid'])->first();
            if ($book_found) {
                $book_found->order = $book_data[$i]['order'];
                $book_found->save();
            }
        }

        return response()->json($book_data);
    }

    /**
     * Show a specific book if exists (by gid).
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($gid)
    {
        $validator = Validator::make(['gid' => $gid], [
            'gid' => ['required', 'string', 'min:1', 'max:100']
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }

        $user_id = Auth::user()->id;

        $user = User::find($user_id);
        $book_found = $user->books()->where('gid', $gid)->first();

        if (!$book_found) {
            $response_data = [
                'status' => 'error_not_found',
            ];

            return response()->json($response_data, 404);
        }

        return response()->json($book_found);
    }

    /**
     * Update a specific book to mark as complete.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'gid' => ['required', 'string', 'min:1', 'max:100'],
            'finished' => ['required', 'boolean'],
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }

        $book_data = $request->only(['gid', 'finished']);

        $user_id = Auth::user()->id;
        $user = User::find($user_id);
        $book_found = $user->books()->where('gid', $book_data['gid'])->first();

        if (!$book_found) {
            $response_data = [
                'status' => 'error_not_found',
            ];

            return response()->json($response_data, 404);
        }

        $book_found->finished = $book_data['finished'];
        $book_found->finished_at = $book_data['finished'] ? Carbon::now() : null;
        $book_found->save();

        return response()->json($book_found);
    }

    /**
     * Remove a specific book.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($gid)
    {
        $validator = Validator::make(['gid' => $gid], [
            'gid' => ['required', 'string', 'min:1', 'max:100']
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }

        $user_id = Auth::user()->id;

        $user = User::find($user_id);
        $book_found = $user->books()->where('gid', $gid)->first();

        if (!$book_found) {
            $response_data = [
                'status' => 'error_not_found',
            ];

            return response()->json($response_data, 404);
        }

        $delete_result = $book_found->delete();

        if (!$delete_result) {
            $response_data = [
                'status' => 'error_not_deleted',
            ];

            return response()->json($response_data, 500);
        }

        return response()->json($book_found);
    }
}