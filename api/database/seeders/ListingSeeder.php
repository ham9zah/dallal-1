<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Listing;
use App\Models\User;
use Illuminate\Database\Seeder;

class ListingSeeder extends Seeder
{
    public function run(): void
    {
        // إنشاء مستخدمين للإعلانات
        $users = User::factory(5)->create();

        // الحصول على جميع الفئات الفرعية
        $categories = Category::whereNotNull('parent_id')->get();

        // إنشاء إعلانات لكل فئة
        foreach ($categories as $category) {
            Listing::factory(5)->create([
                'category_id' => $category->id,
                'user_id' => $users->random()->id,
                'status' => 'active'
            ]);

            // إضافة بعض الإعلانات المباعة
            Listing::factory(2)->create([
                'category_id' => $category->id,
                'user_id' => $users->random()->id,
                'status' => 'sold'
            ]);

            // إضافة بعض الإعلانات غير النشطة
            Listing::factory(1)->create([
                'category_id' => $category->id,
                'user_id' => $users->random()->id,
                'status' => 'inactive'
            ]);
        }
    }
}
