<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
	public function index(): Response
	{
		/** @var User $user */
		$user = auth()->user();

		return Inertia::render("Dashboard", [
			"roomCount" => $user
				->rooms()
				->orderByDesc("created_at")
				->get()
				->count(),
			"roomsOpened" => $user
				->rooms()
				->get()
				->map(function ($room) {
					return $room->openEvents()->get();
				}),
		]);
	}
}
