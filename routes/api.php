<?php

use Domain\API\Controllers\GetTestPostsController;
use Illuminate\Support\Facades\Route;

Route::get("/test/posts", GetTestPostsController::class);
