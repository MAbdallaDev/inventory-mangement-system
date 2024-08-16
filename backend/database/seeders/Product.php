<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Product extends Seeder
{

    public function run(): void
    {
        DB::table('products')->delete();
        $products = [
            ['name' => ' '],
            ['name' => ' '],
            ['name' => ' '],
            ['name' => ' '],
            ['name' => ' '],
            ['name' => ' '],
            ['name' => ' ']
        ];
        foreach ($products as $product) {
            \App\Models\Product::create($product);
        }
    }
}
