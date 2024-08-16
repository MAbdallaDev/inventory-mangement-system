<?php

use App\Http\Controllers\ClientController;
use App\Http\Controllers\ColorController;
use App\Http\Controllers\DashbordController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\InvoiceController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\SizeController;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/api/auth.php';
// auth:sanctum
Route::middleware('auth:sanctum')->group(function () {

///////////////////////////////////////  Dashboard Route ///////////////////////////////////
    Route::get('statistics', [DashbordController::class, 'statistics']);
///////////////////////////////////   End Dashboard Route ///////////////////////////////////

//////////////////////////////////  Size Route ///////////////////////////////////
    Route::resource('/size', SizeController::class)->except('edit', 'create', 'show');
///////////////////////////////////   End Size Route ///////////////////////////////////

    //////////////////////////////////  User Route ///////////////////////////////////
    Route::resource('/user', UserController::class)->except('edit', 'create', 'show');
///////////////////////////////////   End User Route ///////////////////////////////////

///////////////////////////////////////  Color Route ///////////////////////////////////
    Route::resource('/color', ColorController::class)->except('edit', 'create');
///////////////////////////////////   End Color Route ///////////////////////////////////

///////////////////////////////////  Product Route ///////////////////////////////////
    Route::controller(ProductController::class)->prefix('product')->group(function () {
        Route::get('index', 'index');
        Route::get('all', 'productsAll');
        Route::post('/store', 'store');
        Route::PUT('/update/{product}', 'update');
        Route::get('show/{product}', 'show');
        Route::post('/search', 'search');
        Route::delete('destroy/{product}', 'destroy');
        Route::post('get_color', 'getColor');
    });
///////////////////////////////////   End Product Route ///////////////////////////////////

///////////////////////////////////  client Route //////////////////////////////////
    Route::resource('/client', ClientController::class)->except('edit', 'create');
    Route::get('client/invoice/{client}', [ClientController::class, 'clientInvoice']);
    Route::get('show/client/{client}', [ClientController::class, 'showClient']);
///////////////////////////////////  client Route //////////////////////////////////

///////////////////////////////////////  Order Route ///////////////////////////////////
    Route::resource('/invoice', InvoiceController::class)->except('edit', 'create');
    Route::post('search_invoice_by_date', [InvoiceController::class, 'search_invoice_by_date']);

///////////////////////////////////   End Order Route ///////////////////////////////////

});


