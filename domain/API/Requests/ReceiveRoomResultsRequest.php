<?php

namespace Domain\API\Requests;

use App\Models\Room;
use Illuminate\Foundation\Http\FormRequest;

class ReceiveRoomResultsRequest extends FormRequest
{
	/**
	 * Determine if the user is authorized to make this request.
	 *
	 * @return bool
	 */
	public function authorize(): bool
	{
		return true;
	}

	/**
	 * Get the validation rules that apply to the request.
	 *
	 * @return array<string, mixed>
	 */
	public function rules(): array
	{
		return [
			"name" => ["required", "string", "max:256"],
			"description" => ["required", "string", "max:1000"],
			"incorrectAnswer" => ["required", "integer", "min:0"],
		];
	}
}
