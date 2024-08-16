<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;


///////////////////////////////////  Authentication Route ///////////////////////////////////
Route::controller(AuthenticationController::class)->group(function () {
    Route::middleware('guest')->group(function () {
        Route::post('register', 'register');
        Route::post('login', 'login');
        Route::post('forgot-password', 'forgotPassword');
        Route::post('reset-password', 'resetPassword')->name('password.reset');

    });
});
///////////////////////////////////   End Authentication Route ///////////////////////////////////


///////////////////////////////////  Profile Route ///////////////////////////////////////
Route::controller(ProfileController::class)->prefix('profile')->group(function () {
    Route::get('/getCurrentUser', 'getCurrentUser');
    Route::PUT('/update', 'update');
    Route::get('/logout', 'logout');
    Route::delete('/delete', 'delete');
});
///////////////////////////////////   End Profile Route ///////////////////////////////////

