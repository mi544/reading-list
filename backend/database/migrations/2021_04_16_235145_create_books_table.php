<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('g_book_id')->nullable();
            $table->string('thumbnail_url', 400)->nullable();
            $table->string('title');
            $table->string('subtitle')->nullable();
            $table->string('authors')->nullable();
            $table->boolean('finished')->default(false);
            $table->timestamp('finished_at')->nullable();
            $table->unsignedInteger('order');
            $table->foreignId('user_id')->constrained();
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
        Schema::dropIfExists('books');
    }
}