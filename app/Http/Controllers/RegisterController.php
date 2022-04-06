<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rules\Password;

use App\Models\User;

class RegisterController extends Controller
{
	public function register(Request $request)
	{
		$credentials = $request->validate([
			"email" => [
				"required",
				"email",
				"regex:/[a-z0-9]+@(ogt013|roctilburg|onderwijsgroeptilburg)\.nl/i",
			],
			"password" => [
				"required",
				Password::min(8)
					->letters()
					->numbers()
					->uncompromised(),
				"confirmed",
			],
		]);

		if (User::where("email", $credentials["email"])->first() !== null) {
			return back()->withErrors(["email" => "Email already exists"]);
		}

		$newUser = User::create([
			"name" => "user",
			"email" => $credentials["email"],
			"password" => Hash::make($credentials["password"]),
		]);

		Auth::loginUsingId($newUser->id, true);

		return redirect()->route("dashboard");
	}
}
