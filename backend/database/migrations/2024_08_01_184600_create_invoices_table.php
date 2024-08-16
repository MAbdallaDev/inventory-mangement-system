<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('quantity');
            $table->string('price');
            $table->foreignId('invoice_info_id')->references('id')->on('invoice_infos')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('size_id')->references('id')->on('sizes')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('color_id')->references('id')->on('colors')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
