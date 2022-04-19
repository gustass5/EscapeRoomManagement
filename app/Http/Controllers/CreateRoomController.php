<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Room;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Domain\Room\Enums\RoomVisibilityEnum;

class CreateRoomController extends Controller
{
	public function index(): Response
	{
		return Inertia::render("Rooms/CreatePage");
	}

	public function create(Request $request): RedirectResponse
	{
		/** @var User $user */
		$user = auth()->user();

		$room = $request->validate([
			"name" => ["required"],
			"description" => ["required"],
		]);

        $createdRoom = $user->rooms()->create([
			"name" => $room["name"],
			"description" => $room["description"],
			"visibility" => "PUBLIC",
			"access_code" => Str::random(64),
		]);

        collect($request['questions'])->each(function($question) use ($createdRoom){
            $createdRoom->questions()->create(["question" => $question['value']]);
        });

		return redirect()->route("rooms");
	}
}
