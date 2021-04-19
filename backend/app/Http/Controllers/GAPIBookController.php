<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Clients\GAPIClient;

class GAPIBookController extends Controller
{
    /**
     * Gets a specific book by GAPI book id.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getById($book_id)
    {
        $validator = Validator::make(['book_id' => $book_id], [
            'book_id' => ['required', 'string', 'min:1', 'max:100']
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }


        return GAPIClient::getBookById($book_id);
    }


    /**
     * Gets books by general query.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getByGeneralQuery($book_name, $page = 0)
    {
        $validator = Validator::make(['book_name' => $book_name], [
            'book_name' => ['required', 'string', 'min:1', 'max:200']
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }


        return GAPIClient::getBooksByGeneralQuery($book_name, $page);
    }
}
