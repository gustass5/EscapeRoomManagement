<?php

namespace Database\Seeders;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
	/**
	 * Run the database seeds.
	 *
	 * @return void
	 */
	public function run()
	{
		/** @var User $userA */
		$userA = User::factory()->create([
			"email" => "a@a",
			"password" => bcrypt("a"),
		]);

		/** @var User $userB */
		$userB = User::factory()->create([
			"name" => "Petras",
			"email" => "teacher@roctilburg.nl",
			"password" => bcrypt("SE123!"),
		]);

		Room::factory(8)->create([
			"user_id" => $userA->id,
		]);

		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Mathematics",
		]);
		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Robotics",
		]);
		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Geography",
		]);
		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Engineering",
		]);
		Room::factory()->create([
			"user_id" => $userB->id,
			"name" => "Biology",
		]);
	}
}
