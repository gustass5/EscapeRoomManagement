<?php

namespace Domain\API\Controllers;

use App\Models\Room;
use Domain\API\Classes\ApiJsonResponse;
use Domain\API\Requests\ReceiveRoomResultsRequest;
use Illuminate\Http\JsonResponse;

class ReceiveRoomResultsController
{
	public function __invoke(
		ReceiveRoomResultsRequest $request,
		Room $room
	): JsonResponse {
		/** @var array{
		 *     name: string,
		 *     correctAnswers: int
		 *     completionTime: int
		 * } $validated
		 */
		$validated = $request->validated();

		$totalAnswersAmount = $room->questions()->count();
		$correctAnswersAmount =
			$totalAnswersAmount - $validated["incorrectAnswer"];

		$room->results()->create([
			"name" => $validated["name"],
			"correct_answers_amount" => $validated["correctAnswers"],
			"completion_time" => $validated["completionTime"],
		]);

		return ApiJsonResponse::make()->export();
	}
}
