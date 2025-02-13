<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\AdvertisementController;
use App\Http\Controllers\API\CategoryController;
use App\Http\Controllers\API\CityController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| مسارات API
|--------------------------------------------------------------------------
*/

// المسارات العامة
Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);
Route::get('categories', [CategoryController::class, 'index']);
Route::get('cities', [CityController::class, 'index']);
Route::get('cities/{city}/districts', [CityController::class, 'districts']);

// المسارات المحمية
Route::middleware('auth:sanctum')->group(function () {
    // مسارات المستخدم
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user', [AuthController::class, 'user']);

    // مسارات الإعلانات
    Route::apiResource('advertisements', AdvertisementController::class);
    Route::post('advertisements/{advertisement}/favorite', [AdvertisementController::class, 'toggleFavorite']);
    Route::get('favorites', [AdvertisementController::class, 'favorites']);
    Route::post('advertisements/{advertisement}/bid', [AdvertisementController::class, 'placeBid']);
});
