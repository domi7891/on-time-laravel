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
        Schema::create('baskets', function (Blueprint $table) {
            $table->uuid('basket_id');
            $table->primary('basket_id');
            $table->timestamp('date')->useCurrent();
            $table->decimal('total_price')->default('0.00');
            $table->decimal('subtotal')->default('0.00');
            $table->decimal('shipping_price')->default('0.00');
            $table->integer('quantity')->default('0');
            $table->decimal('discount_total')->nullable();
            $table->string('discount_promo_code')->nullable();
            $table->boolean('payed')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('baskets');
    }
};
