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
		/** @var User $user */
		$user = User::factory()->create([
			"email" => "a@a",
			"password" => bcrypt("a"),
		]);

		Room::factory(8)->create([
			"user_id" => $user->id,
		]);
	}
}
