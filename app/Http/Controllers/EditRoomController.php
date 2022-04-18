<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Question;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EditRoomController extends Controller{

    public function index(Room $room):  Response{
        return Inertia::render("Rooms/EditPage", ["room" => $room, "questions" => $room->questions()->get()]);
    }

    public function update(Request $request, $id): Response {
        $roomData = $request->validate(["name"=>["required"], "description" =>["required"], "questions" => []]);
        $room = Room::find($id);
        $room->name = $roomData["name"];
        $room->description = $roomData["description"];
        $room->save();
        collect($request['questions'])->each(function($question) use ($room){
            // [TODO]: Delete question if it is empty
            $questionToUpdate = Question::updateOrCreate(["id" => $question["id"], "room_id" => $room["id"]], ["question" => $question['value']]);
        });
        return Inertia::render("Rooms/EditPage", ["room" => $room, "questions" => $room->questions()->get()]);
    }
}
