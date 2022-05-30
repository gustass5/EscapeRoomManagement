<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\RoomResult>
 */
class RoomResultFactory extends Factory
{
	/**
	 * Define the model's default state.
	 *
	 * @return array<string, mixed>
	 */
	public function definition()
	{
		$totalAnswersAmount = $this->faker->numberBetween(3, 4);

		return [
			"name" => $this->faker->text(15),
			"description" => $this->faker->text(100),
			"total_answers_amount" => $totalAnswersAmount,
			"correct_answers_amount" => $this->faker->numberBetween(
				0,
				$totalAnswersAmount
			),
		];
	}
}
