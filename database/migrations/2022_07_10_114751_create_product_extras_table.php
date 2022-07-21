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
        Schema::create('product_extras', function (Blueprint $table) {
            $table->id()->autoIncrement();
            $table->string('type');
            $table->string('weight')->nullable();
            $table->string('emb_type')->nullable();
            $table->string('emb_position')->nullable();
            $table->string('emb_back')->nullable();
            $table->string('desc');
            $table->decimal('factor')->nullable();
            $table->integer('price')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_extras');
    }
};
