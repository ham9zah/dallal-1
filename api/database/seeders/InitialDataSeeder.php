<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class InitialDataSeeder extends Seeder
{
    public function run()
    {
        // إضافة التصنيفات الرئيسية
        $categories = [
            ['name' => 'عقارات', 'slug' => 'real-estate', 'icon' => 'home'],
            ['name' => 'سيارات', 'slug' => 'cars', 'icon' => 'car'],
            ['name' => 'إلكترونيات', 'slug' => 'electronics', 'icon' => 'mobile'],
            ['name' => 'أثاث منزلي', 'slug' => 'furniture', 'icon' => 'couch'],
            ['name' => 'خدمات', 'slug' => 'services', 'icon' => 'briefcase'],
        ];

        foreach ($categories as $category) {
            DB::table('categories')->insertOrIgnore($category);
        }

        // إضافة المدن الرئيسية
        $cities = [
            ['name' => 'الرياض'],
            ['name' => 'جدة'],
            ['name' => 'مكة المكرمة'],
            ['name' => 'المدينة المنورة'],
            ['name' => 'الدمام'],
        ];

        foreach ($cities as $city) {
            DB::table('cities')->insertOrIgnore($city);
        }

        // إضافة بعض الأحياء لكل مدينة
        $districts = [
            // الرياض
            ['city_id' => 1, 'name' => 'النخيل'],
            ['city_id' => 1, 'name' => 'الملقا'],
            ['city_id' => 1, 'name' => 'حي السفارات'],
            // جدة
            ['city_id' => 2, 'name' => 'الحمراء'],
            ['city_id' => 2, 'name' => 'الروضة'],
            ['city_id' => 2, 'name' => 'البوادي'],
            // مكة المكرمة
            ['city_id' => 3, 'name' => 'العزيزية'],
            ['city_id' => 3, 'name' => 'النزهة'],
            ['city_id' => 3, 'name' => 'العوالي'],
        ];

        foreach ($districts as $district) {
            DB::table('districts')->insertOrIgnore($district);
        }
    }
}
