<?php

namespace App\Http\Controllers;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;

class UserController extends Controller
{
    /*  Show All User  */
    public function index()
    {
        $users = User::select('id', 'name', 'email', 'role')->paginate(8);
        return response()->json(['User' => new UserCollection($users)]);
    }

    /*  Store User  */
    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->validated());
        return response()->json(['message' => 'تم اضافة المستخدم بنجاح', 'user' => new UserResource($user)]);
    }

    /*  Update User By Id  */
    public function update(UpdateUserRequest $request, User $user)
    {
        $user->update($request->validated());
        return response()->json(['message' => 'تم تحديث المستخدم بنجاح', 'user' => new UserResource($user)]);
    }

    /*  delete User  By Id */
    public function destroy(User $user)
    {
        $user->delete();
        return response()->json(['message' => 'تم حذف الاكونت بنجاح']);
    }
}
