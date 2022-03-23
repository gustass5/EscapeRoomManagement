<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Login');
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
});

Route::get('/welcome', function () {
    return view('welcome');
});
