<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class CreateRoomController extends Controller
{
	public function index(): Response
	{
		return Inertia::render("Rooms/CreatePage");
	}
}
