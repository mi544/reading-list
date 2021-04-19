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
    public function getById($gid)
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


        return GAPIClient::getBookById($gid);
    }


    /**
     * Gets books by general query.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function getByGeneralQuery($query, $page = 0)
    {
        $validator = Validator::make(['query' => $query], [
            'query' => ['required', 'string', 'min:1', 'max:200']
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }


        return GAPIClient::getBooksByGeneralQuery($query, $page);
    }
}