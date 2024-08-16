<?php

namespace App\Http\Controllers;

use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    /* Get  user  has been Authenticated */
    public function getCurrentUser(Request $request)
    {
        return response()->json([
            'user' => new UserResource($request->user())
        ]);
    }

    /* Update  user */
    public function update(UpdateUserRequest $request)
    {
        $user = $request->user();
        $user->update($request->validated());
        return response()->json(['message' => 'تم تحديث بنجاح','user'=>new UserResource($user)]);
    }

    /* Log out Account   */
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        return response()->json(['message' => 'تم تسجيل خروجك',]);
    }

    /* delete Account */
    public function delete(Request $request)
    {
        $request->user()->delete();
        return response()->json(['message' => 'تم حذف الحساب بنجاج']);
    }

}
