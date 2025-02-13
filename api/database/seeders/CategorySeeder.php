<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            [
                'name' => 'عقارات',
                'slug' => 'real-estate',
                'icon' => 'building',
                'subcategories' => [
                    ['name' => 'شقق للبيع', 'slug' => 'apartments-for-sale'],
                    ['name' => 'شقق للإيجار', 'slug' => 'apartments-for-rent'],
                    ['name' => 'فلل للبيع', 'slug' => 'villas-for-sale'],
                    ['name' => 'فلل للإيجار', 'slug' => 'villas-for-rent'],
                    ['name' => 'أراضي', 'slug' => 'lands'],
                ]
            ],
            [
                'name' => 'سيارات',
                'slug' => 'cars',
                'icon' => 'car',
                'subcategories' => [
                    ['name' => 'سيارات جديدة', 'slug' => 'new-cars'],
                    ['name' => 'سيارات مستعملة', 'slug' => 'used-cars'],
                    ['name' => 'قطع غيار', 'slug' => 'car-parts'],
                    ['name' => 'إكسسوارات', 'slug' => 'car-accessories'],
                ]
            ],
            [
                'name' => 'إلكترونيات',
                'slug' => 'electronics',
                'icon' => 'mobile',
                'subcategories' => [
                    ['name' => 'هواتف', 'slug' => 'phones'],
                    ['name' => 'حواسيب', 'slug' => 'computers'],
                    ['name' => 'أجهزة لوحية', 'slug' => 'tablets'],
                    ['name' => 'ألعاب فيديو', 'slug' => 'video-games'],
                ]
            ],
            [
                'name' => 'أثاث منزلي',
                'slug' => 'furniture',
                'icon' => 'couch',
                'subcategories' => [
                    ['name' => 'غرف نوم', 'slug' => 'bedrooms'],
                    ['name' => 'صالونات', 'slug' => 'living-rooms'],
                    ['name' => 'مطابخ', 'slug' => 'kitchens'],
                    ['name' => 'حدائق', 'slug' => 'gardens'],
                ]
            ],
            [
                'name' => 'خدمات',
                'slug' => 'services',
                'icon' => 'briefcase',
                'subcategories' => [
                    ['name' => 'صيانة منزلية', 'slug' => 'home-maintenance'],
                    ['name' => 'نقل وتوصيل', 'slug' => 'delivery'],
                    ['name' => 'تعليم', 'slug' => 'education'],
                    ['name' => 'صحة وجمال', 'slug' => 'health-beauty'],
                ]
            ]
        ];

        foreach ($categories as $category) {
            $subcategories = $category['subcategories'] ?? [];
            unset($category['subcategories']);
            
            $mainCategory = Category::create($category);

            foreach ($subcategories as $subcategory) {
                $subcategory['parent_id'] = $mainCategory->id;
                Category::create($subcategory);
            }
        }
    }
}
