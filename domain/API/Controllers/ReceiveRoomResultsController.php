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
		 *     description: string,
		 *     incorrectAnswer: int
		 * } $validated
		 */
		$validated = $request->validated();

		$totalAnswersAmount = $room->questions()->count();
		$correctAnswersAmount =
			$totalAnswersAmount - $validated["incorrectAnswer"];

		$room->results()->create([
			"name" => $validated["name"],
			"description" => $validated["description"],
			"correct_answers_amount" => $correctAnswersAmount,
			"total_answers_amount" => $totalAnswersAmount,
		]);

		return ApiJsonResponse::make()->export();
	}
}
