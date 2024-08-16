<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        $this->call([
            \Database\Seeders\User::class,
            \Database\Seeders\Color::class,
            \Database\Seeders\Size::class,
            //\Database\Seeders\Product::class,

        ]);

    }
}
