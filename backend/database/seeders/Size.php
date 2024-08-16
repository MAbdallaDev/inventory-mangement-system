<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Size extends Seeder
{

    public function run(): void
    {
        DB::table('sizes')->delete();
        $sizes = [
            ['name' => ' xl'], ['name' => '2xl'], ['name' => '3xl'],
        ];
        foreach ($sizes as $size) {
            \App\Models\Size::create($size);
        }
    }
}
