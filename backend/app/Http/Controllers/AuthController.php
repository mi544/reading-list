<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * Register
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'min:1', 'max:50'],
            'username' => ['required', 'string', 'min:3', 'max:50', 'unique:users'],
            'password' => ['required', 'string', 'min:5', 'max:50'],
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }

        $credentials = request()->only('name', 'username', 'password');

        User::create([
            'name' => $credentials['name'],
            'username' => $credentials['username'],
            'password' => Hash::make($credentials['password']),
        ]);

        $auth_attempt = Auth::attempt($credentials);

        if ($auth_attempt) {
            $access_token = Auth::user()->createToken('authToken')->accessToken;

            return response()->json([
                'user' => Auth::user(),
                'access_token' => $access_token
            ]);
        }

        return response()->json(['status' => 'auth_error', 500]);
    }

    /**
     * Login
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => ['required', 'string', 'min:3', 'max:50'],
            'password' => ['required', 'string', 'min:5', 'max:50'],
        ]);

        if ($validator->fails()) {
            $response_data = [
                'status' => 'validation_error',
                'errors' => $validator->errors(),
            ];

            return response()->json($response_data, 400);
        }

        $credentials = request()->only('username', 'password');

        $auth_attempt = Auth::attempt($credentials);

        if ($auth_attempt) {
            $access_token = Auth::user()->createToken('authToken')->accessToken;

            return response()->json([
                'user' => Auth::user(),
                'access_token' => $access_token
            ]);
        }

        return response()->json(['status' => 'auth_error', 'error' => 'Invalid credentials'], 401);
    }

    /**
     * Log out
     *
     * @return \Illuminate\Http\Response
     */
    public function logout(Request $request)
    {
        $access_token = Auth::user()->token();
        $access_token->delete();
        return response()->json([
            'message' => 'User logout successful'
        ]);
    }


    /**
     * Display information about logged in user.
     *
     * @return \Illuminate\Http\Response
     */
    public function info(Request $request)
    {
        return Auth::user();
        return response()->json([
            'message' => 'User logout successful'
        ]);
    }
}