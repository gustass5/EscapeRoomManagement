<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create("room_results", function (Blueprint $table) {
			$table->id();
			$table->foreignId("room_id");
			$table->string("name");
			$table->text("description");
			$table->integer("correct_answers_amount");
			$table->integer("total_answers_amount");
			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists("room_results");
	}
};
