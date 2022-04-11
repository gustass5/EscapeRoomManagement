<?php

namespace Database\Factories;

use App\Models\Question;
use App\Models\Room;
use Domain\Room\Enums\RoomVisibilityEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\Domain\Room\Models\Room>
 */
class RoomFactory extends Factory
{
	public function configure(): RoomFactory
	{
		return $this->afterCreating(function (Room $room) {
			Question::factory($this->faker->numberBetween(2, 6))->create([
				"room_id" => $room->id,
			]);
		});
	}

	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		return [
			"name" => (string) Str::of($this->faker->text(30))->replaceLast(
				".",
				""
			),
			"description" => $this->faker->text(150),
			"visibility" => $this->faker->randomElement(
				RoomVisibilityEnum::cases()
			),
		];
	}
}