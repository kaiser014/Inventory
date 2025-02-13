<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\Http\Requests\RegisterRequest;
use App\Models\SalesManager;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{

    public const ADMIN_USER = 1;
    public const SALES_MANAGER = 2;

    public function login(AuthRequest $request){
        if($request->input('user_type') == self::ADMIN_USER){
            $user = (new User())->getUserByEmail($request->all());
            $role = self::ADMIN_USER;
        }else{
            $user = (new SalesManager())->getUserByEmail($request->all());
            $role = self::SALES_MANAGER;
        }
        if($user && Hash::check($request->input('password'), $user->password)){
            $user_data['token'] = $user->createToken($user->email)->plainTextToken;
            $user_data['name'] = $user->name;
            $user_data['email'] = $user->email;
            $user_data['phone'] = $user->phone;
            $user_data['role'] = $role;
            return response()->json($user_data);
        }
        throw ValidationException::withMessages([
            'email' => ['The provided credentials are incorrect'],
        ]);
    }

    public function register(RegisterRequest $request){
        $user_exists = (new User())->getUserEmail($request->email);
        if($user_exists === null){
            $user = $request->all();
            // if($user['confirmed_password'].' - '.$user['password']){
            if($user['password'] === $user['confirmed_password']){
                (new User())->storeUser($user);
                return response()->json([
                    'message' => 'Register Successfully',
                    'cls' => 'success',
                ]);
            }
        }
        return response()->json([
            'message' => 'Your Are Already Regitered',
            'icon' => 'error'
        ]);
    }

    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Logged Out Successfully'
        ]);
    }
}
