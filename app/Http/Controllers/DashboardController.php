<?php

namespace App\Http\Controllers;

use App\Models\RoomResult;
use App\Models\RoomOpenEvent;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\CarbonImmutable;
use Carbon\CarbonPeriod;

class DashboardController extends Controller
{
	public function index(): Response
	{
		$user = auth()->user();

		$rooms = $user->rooms()->pluck("id", "name");
		$roomIds = $rooms->values();
		$roomsOpenedCount = RoomOpenEvent::whereIn(
			"room_id",
			$roomIds
		)->count();

		$now = CarbonImmutable::now();
		$weekStartDate = $now->startOfWeek()->format("Y-m-d");
		$weekEndDate = $now->endOfWeek()->format("Y-m-d");
		$period = CarbonPeriod::create($weekStartDate, "1 day", $weekEndDate);

		$roomsOpenedThisWeek = collect([]);

		foreach ($period as $key => $date) {
			$roomsOpenedThisWeek->push(
				RoomOpenEvent::whereIn("room_id", $roomIds)
					->where(
						"created_at",
						">=",
						$date->setTime(0, 0, 0)->toDateTimeString()
					)
					->where(
						"created_at",
						"<=",
						$date->setTime(23, 59, 59)->toDateTimeString()
					)
					->count()
			);
		}

		$roomsCompletedCount = RoomResult::whereIn(
			"room_id",
			$roomIds
		)->count();

		$averageTime = RoomResult::whereIn("room_id", $roomIds)->avg(
			"completion_time"
		);

		$roomTimes = $rooms->map(function ($roomId) {
			return number_format(
				RoomResult::where("room_id", $roomId)->avg("completion_time") ??
					0,
				2
			);
		});

		return Inertia::render("Dashboard", [
			"roomsOpened" => $roomsOpenedCount,
			"roomsOpenedThisWeek" => $roomsOpenedThisWeek,
			"roomsCompleted" => $roomsCompletedCount,
			"averageTime" => number_format($averageTime ?? 0, 2),
			"chartSubtitle" => "From " . $weekStartDate . " to " . $weekEndDate,
			"roomLabels" => $rooms->keys(),
			"roomTimes" => $roomTimes,
		]);
	}
}
