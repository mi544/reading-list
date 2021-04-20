<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Book extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'gid',
        'thumbnail_url',
        'title',
        'subtitle',
        'authors',
        'categories',
        'description',
        'order',
        'user_id',
    ];

    /**
     * Get the user for the book.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}