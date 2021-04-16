<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

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