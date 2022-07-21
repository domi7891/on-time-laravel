<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->id('rating_id')->autoIncrement();
            $table->dateTime('date')->useCurrent();
            $table->string('name');
            $table->string('title');
            $table->string('facility')->nullable();
            $table->string('facility_name')->nullable();
            $table->string('photo_path')->nullable();
            $table->string('recession')->nullable();
            $table->enum('rating', ['1', '2', "3", '4', '5']);
            $table->boolean('recommend')->default(true);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('ratings');
    }
};
