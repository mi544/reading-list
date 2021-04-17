<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GAPIBookController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

///////////////////////////
// Publicly Available Routes //
///////////////////////////
Route::group([], function () {
    Route::prefix('/gbook')->group(
        function () {
            Route::get('/id/{book_id}', [GAPIBookController::class, 'getById']);
            Route::get('/name/{book_name}', [GAPIBookController::class, 'getByName']);
        }
    );
});

///////////////////////////
// Authentication Routes //
///////////////////////////
Route::group([], function () {
    Route::prefix('/auth')->group(
        function () {
            Route::post('/register', [AuthController::class, 'register']);
            Route::post('/login', [AuthController::class, 'login']);
        }
    );
});

//////////////////////////
// Authenticated Routes //
//////////////////////////
Route::group(['middleware' => ['auth:api']], function () {
    Route::prefix('/auth')->group(
        function () {
            Route::delete('/logout', [AuthController::class, 'logout']);
        }
    );

    Route::get('/test', function () {
        return response()->json(['status' => 'success']);
    });
});