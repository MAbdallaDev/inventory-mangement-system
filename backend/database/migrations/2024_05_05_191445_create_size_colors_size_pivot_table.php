<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {

    public function up(): void
    {
        Schema::create('size_colors_pivot', function (Blueprint $table) {
            $table->id();
            $table->foreignId('size_id')->references('id')->on('sizes')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('color_id')->references('id')->on('colors')->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('product_quantity');
            $table->foreignId('product_id')->references('id')->on('products')->cascadeOnUpdate()->cascadeOnDelete();
          //  $table->string('order_quantity')->nullable();
        //    $table->foreignId('order_id')->nullable()->references('id')->on('orders')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('size_colors_pivot');
    }
};
