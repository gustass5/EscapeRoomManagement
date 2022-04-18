<?php

use Domain\API\Controllers\GetRoomWithAccessCodeController;
use Domain\API\Controllers\GetTestPostsController;
use Illuminate\Support\Facades\Route;

Route::get("/test/posts", GetTestPostsController::class);

Route::get("/rooms/{room:access_code}", GetRoomWithAccessCodeController::class);
