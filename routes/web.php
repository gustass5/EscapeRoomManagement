<?php

use App\Http\Controllers\CreateRoomController;
use App\Http\Controllers\EditRoomController;
use App\Http\Controllers\RoomsController;
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
	})->name("dashboard");

	Route::get("/rooms/dashboard", function () {
		return Inertia::render("RoomDashboard");
	})->name("room-dashboard");

	Route::post("/logout", [LogoutController::class, "logout"]);

	Route::get("/rooms", [RoomsController::class, "index"])->name("rooms");
	Route::get("/rooms/create", [CreateRoomController::class, "index"]);
	Route::get("/rooms/{room}/edit", [
		EditRoomController::class,
		"index",
	])->name("rooms.edit");
	Route::post("/rooms/{room}/edit", [EditRoomController::class, "update"]);
	Route::post("/rooms/{room}/delete", [EditRoomController::class, "delete"]);
	Route::post("/rooms/create", [CreateRoomController::class, "create"]);
});

Route::get("/welcome", function () {
	return view("welcome");
});
