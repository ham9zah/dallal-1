<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // تشغيل البذور
        $this->call([
            ResetRolesSeeder::class,
            CategorySeeder::class,
            ListingSeeder::class,
        ]);
    }
}
