<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\LogoutController;
use App\Http\Controllers\RegisterController;

Route::get("/", function () {
	return redirect("login");
});

Route::middleware(["guest"])->group(function () {
	Route::get("/login", function () {
		return Inertia::render("Login");
	})->name("login");

	Route::post("/login", [LoginController::class, "authenticate"]);

	Route::get("/register", function () {
		return Inertia::render("Register");
	});
	Route::post("/register", [RegisterController::class, "register"]);
});

Route::middleware(["auth"])->group(function () {
	Route::get("/dashboard", function () {
		return Inertia::render("Dashboard");
	})
		->name("dashboard")
		->middleware("auth");

	Route::post("/logout", [LogoutController::class, "logout"]);
});

Route::get("/welcome", function () {
	return view("welcome");
});
