<?php

namespace App\Http\Controllers;

use App\Models\Room;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EditRoomController extends Controller
{
	public function index(Room $room): Response
	{
		return Inertia::render("Rooms/EditPage", [
			"room" => Room::with([
				"questions",
				"questions.answers",
			])->findOrFail($room->id),
		]);
	}

	public function update(Request $request, $id)
	{
		$roomData = $request->validate([
			"name" => ["required"],
			"description" => ["required"],
			"questions" => [],
		]);
		$room = Room::find($id);
		$room->name = $roomData["name"];
		$room->description = $roomData["description"];
		$room->save();

		$questionsIds = collect($request["questions"])->pluck("id");

		collect($room->questions)->each(function ($question) use (
			$room,
			$questionsIds
		) {
			if (!$questionsIds->contains($question->id)) {
				$room
					->questions()
					->find($question->id)
					->delete();
			}
		});

		collect($request["questions"])->each(function ($question) use ($room) {
			$updatedQuestion = $room
				->questions()
				->updateOrCreate(
					["id" => $question["id"]],
					["question" => $question["value"]]
				);
			collect($question["answers"])->each(function ($answer) use (
				$updatedQuestion
			) {
				$updatedQuestion
					->answers()
					->where("id", $answer["id"])
					->update(["answer" => $answer["value"]]);
			});
		});

		return redirect()->route("rooms", ["room" => $room->id]);
	}

	public function delete(Room $room)
	{
		$room->delete();

		return redirect()->route("rooms");
	}
}
