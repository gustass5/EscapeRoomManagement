<?php

namespace Domain\API\Controllers;

use App\Models\Question;
use App\Models\Room;
use Domain\API\Classes\ApiJsonResponse;
use Illuminate\Http\JsonResponse;

class GetRoomWithAccessCodeController
{
	public function __invoke(Room $room): JsonResponse
	{
		$questions = $room
			->questions()
			->with("answers")
			->get();

		return ApiJsonResponse::make()
			->setData([
				"room" => [
					...$room->only(["name", "description"]),
					"questions" => $questions->map(
						fn(Question $question) => [
							...$question->only(["id", "question"]),
							"answers" => $question->answers->map->only([
                                "id",
								"answer",
								"is_correct",
							]),
						]
					),
				],
			])
			->export();
	}
}
