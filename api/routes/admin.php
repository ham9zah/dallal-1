<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\BackupController;

Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::post('/backup/database', [BackupController::class, 'backup']);
});
