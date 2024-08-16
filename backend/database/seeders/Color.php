<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Color extends Seeder
{

    public function run(): void
    {
        DB::table('colors')->delete();
        $colors = [
            ['name' => ' red'], ['name' => 'blue'], ['name' => 'green'],
        ];
        foreach ($colors as $color) {
            \App\Models\Color::create($color);
        }
    }
}
