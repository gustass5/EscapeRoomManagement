<?php

namespace App\Http\Controllers;

use App\Models\User;
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

    public function create(Request $request): Response{
        /** @var User $user */
        $user = auth()->user();

        $room = $request->validate(["name"=>["required"], "description" =>["required"]]);

        $createdRoom = $user->rooms()->create(["name"=>$room['name'], "description" =>$room['description'],"visibility" => RoomVisibilityEnum::PUBLIC]);

        collect($request['questions'])->each(function($question) use ($createdRoom){
            $createdRoom->questions()->create(["question" => $question['value']]);
        });

        return Inertia::render("Rooms/IndexPage", [
            "rooms" => $user->rooms->toArray(),
        ]);
    }
}
