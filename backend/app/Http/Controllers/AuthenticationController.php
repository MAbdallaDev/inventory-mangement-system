<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgetPasswordRequest;
use App\Http\Requests\LoginUserRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Http\Requests\StoreUserRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use App\Notifications\ResetPasswordVerificationNotification;
use Ichtrojan\Otp\Otp;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthenticationController extends Controller
{
    private $otp;

    public function __construct()
    {
        $this->otp = new Otp();
    }

    /* Register a new user */
    public function register(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        return response()->json([
            'message' => __('تم تسجيلك بنجاح'),
            'token' => $user->createToken("User Token")->plainTextToken,
            'user'=>new UserResource($user)
        ]);
    }


    /* Login a  user */
    public function login(LoginUserRequest $request)
    {
        if (!Auth::attempt($request->only(['email', 'password']))) {
            return response()->json(['message' => 'كلمة المرور و الاميل غير متطابقان .'], 401);
        } else {
            $user = User::where('email', $request->email)->first();
            return response()->json([
                'message' => __('تم تسجيل دخول بنجاح'),
                'token' => $user->createToken("User Token")->plainTextToken,
                'user'=>new UserResource($user)
            ]);
        }
    }

    public function forgotPassword(ForgetPasswordRequest $request)
    {
        $user = User::where('email', $request['email'])->first();
        $user->notify(new ResetPasswordVerificationNotification());
        return response()->json(['status' => 'success'], 200);
    }

    public function resetPassword(ResetPasswordRequest $request)
    {
        $otp2 = $this->otp->validate($request->email, $request->otp);
        if (!$otp2->status) {
            return response()->json(['error' => $otp2], 401);
        }
        $user = User::where('email', $request->email)->first();
        $user->update(['password' => Hash::make($request->password)]);
        $user->tokens()->delete();
        return response()->json(['status' => 'تم تغير الباسورد بنجاح'], 200);
    }

}
