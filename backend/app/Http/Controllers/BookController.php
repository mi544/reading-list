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

        // $users = User::with(['posts' => function ($query) {
        //     $query->orderBy('created_at', 'desc');
        // }])->get();

        // $books = User::with(['books' => function ($query) {
        //     $query->orderBy('created_at', 'desc');
        // }])->get();

        // return response()->json($books);

        // return Book::orderBy('order', 'DESC')->get();
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
            'g_book_id' => ['required', 'string', 'min:1', 'max:100'],
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
        $last_book = $user->books()->orderBy('order', 'DESC')->first();
        // if no last book found (no books exist yet), set order to 1
        $last_book_order_num = $last_book ? $last_book->order : 0;

        $book_id = request()->only('g_book_id')['g_book_id'];
        $book_data = GAPIClient::getBookById($book_id);

        if (!$book_data) {
            $response_data = [
                'status' => 'error',
            ];

            return response()->json($response_data, 500);
        }

        $new_book = Book::create([
            'g_book_id' => $book_data['id'],
            'thumbnail_url' => isset($book_data['volumeInfo']['imageLinks']['thumbnail']) ? $book_data['volumeInfo']['imageLinks']['thumbnail'] : null,
            'title' =>  $book_data['volumeInfo']['title'],
            'subtitle' =>  isset($book_data['volumeInfo']['subtitle']) ? $book_data['volumeInfo']['subtitle'] : null,
            'authors' =>  isset($book_data['volumeInfo']['authors']) ? json_encode($book_data['volumeInfo']['authors']) : null,
            'order' =>  $last_book_order_num + 1,
            'user_id' => $user_id,
        ]);

        return response()->json($new_book);
    }

    /**
     * Show a specific book (by id).
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($book_id)
    {
        $book_id_int = (int) $book_id;

        $validator = Validator::make(['book_id_int' => $book_id_int], [
            'book_id_int' => ['required', 'int', 'min:1']
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
        $book_found = $user->books()->where('id', $book_id_int)->first();

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
            'book_id' => ['required', 'int', 'min:1'],
            'finished' => ['required', 'boolean'],
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }

        $book_data = $request->only(['book_id', 'finished']);

        $user_id = Auth::user()->id;
        $user = User::find($user_id);
        $book_found = $user->books()->where('id', $book_data['book_id'])->first();

        if (!$book_found) {
            $response_data = [
                'status' => 'error_not_found',
            ];

            return response()->json($response_data, 404);
        }

        $book_found->finished = $book_data['finished'];
        $book_found->finished_at = Carbon::now();
        $book_found->save();

        return response()->json($book_found);
    }

    /**
     * Remove a specific book.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($book_id)
    {
        $book_id_int = (int) $book_id;

        $validator = Validator::make(['book_id_int' => $book_id_int], [
            'book_id_int' => ['required', 'int', 'min:1']
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
        $book_found = $user->books()->where('id', $book_id_int)->first();

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