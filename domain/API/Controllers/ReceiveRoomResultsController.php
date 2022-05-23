<?php

namespace Domain\API\Controllers;

use Domain\API\Classes\ApiJsonResponse;
use Illuminate\Http\JsonResponse;

class ReceiveRoomResultsController
{
	public function __invoke(): JsonResponse
	{
		return ApiJsonResponse::make()->export();
	}
}
