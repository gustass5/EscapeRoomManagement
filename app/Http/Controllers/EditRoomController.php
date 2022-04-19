<?php

namespace App\Http\Controllers;

use App\Models\Room;
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

        $questionsIds = collect($request['questions'])->pluck('id');

        collect($room->questions)->each(function ($question) use ($room, $questionsIds){
            if(!$questionsIds->contains($question->id)){
                $room->questions()->find($question->id)->delete();
                // [TODO]: Also delete question answers here;
            }
        });

        collect($request['questions'])->each(function($question) use ($room){
            $room->questions()->updateOrCreate(["id" => $question["id"]], ["question" => $question['value']]);
        });
        return Inertia::render("Rooms/EditPage", ["room" => $room, "questions" => $room->questions()->get()]);
    }
}
