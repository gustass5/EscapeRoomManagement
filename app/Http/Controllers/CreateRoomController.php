<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Room;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class CreateRoomController extends Controller
{
	public function index(): Response
	{
		return Inertia::render("Rooms/CreatePage");
	}

    public function create(Request $request): Response{
        /** @var User $user */
        $user = auth()->user();

        $room = $request->validate(["name"=>["required"], "description" =>["required"]]);

        $user->rooms()->create(["name"=>$room['name'], "description" =>$room['description'], "visibility" => "PUBLIC"]);

        return Inertia::render("Rooms/IndexPage", [
            "rooms" => $user->rooms->toArray(),
        ]);
    }
}
