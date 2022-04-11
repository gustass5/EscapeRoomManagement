<?php

namespace App\Models;

use Domain\Room\Enums\RoomVisibilityEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Domain\Room\Models\Room
 *
 * @property int $id
 * @property int $user_id
 * @property string $name
 * @property string $description
 * @property RoomVisibilityEnum $visibility
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Question[] $questions
 * @property-read int|null $questions_count
 * @method static \Illuminate\Database\Eloquent\Builder|Room newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Room query()
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Room whereVisibility($value)
 * @mixin \Eloquent
 */
class Room extends Model
{
	use HasFactory;

	protected $guarded = [];

	protected $casts = [
		"visibility" => RoomVisibilityEnum::class,
	];

	/**
	 * @return HasMany<Question>
	 */
	public function questions(): HasMany
	{
		return $this->hasMany(Question::class);
	}
}
