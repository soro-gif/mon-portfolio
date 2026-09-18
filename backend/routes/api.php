<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

Route::get('/portfolio', [App\Http\Controllers\PortfolioController::class, 'index']);
Route::get('/portfolio/projects', [App\Http\Controllers\PortfolioController::class, 'projects']);
Route::get('/portfolio/experiences', [App\Http\Controllers\PortfolioController::class, 'experiences']);
Route::get('/portfolio/skills', [App\Http\Controllers\PortfolioController::class, 'skills']);
Route::post('/contact', [App\Http\Controllers\PortfolioController::class, 'contact']);
