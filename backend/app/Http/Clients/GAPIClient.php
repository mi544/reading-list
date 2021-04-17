<?php

namespace App\Http\Clients;

use Illuminate\Support\Facades\Http;

class GAPIClient
{
    private static $base_url = 'https://www.googleapis.com/books/v1/volumes';

    private static function makeGetRequest($uri)
    {
        $response = Http::get($uri);
        $data = $response->json();
        if (isset($data['error'])) {
            return null;
        }
        return $data;
    }

    public static function getBookByName($book_name)
    {
        $api_key = config('app.gapi_key');
        $uri = self::$base_url . '?key=' . $api_key . '&q=' . $book_name;
        return self::makeGetRequest($uri);
    }

    public static function getBookById($gBookId)
    {
        $api_key = config('app.gapi_key');
        $uri = self::$base_url . '/' . $gBookId . '?key=' . $api_key;
        return self::makeGetRequest($uri);
    }
}