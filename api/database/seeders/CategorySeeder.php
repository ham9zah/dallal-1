<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $mainCategories = [
            [
                'name' => 'عقارات',
                'icon' => 'fa-home',
                'children' => [
                    ['name' => 'شقق للبيع', 'icon' => 'fa-building'],
                    ['name' => 'فلل للبيع', 'icon' => 'fa-house'],
                    ['name' => 'أراضي للبيع', 'icon' => 'fa-map'],
                    ['name' => 'عقارات للإيجار', 'icon' => 'fa-key']
                ]
            ],
            [
                'name' => 'سيارات',
                'icon' => 'fa-car',
                'children' => [
                    ['name' => 'سيارات جديدة', 'icon' => 'fa-car-side'],
                    ['name' => 'سيارات مستعملة', 'icon' => 'fa-car-rear'],
                    ['name' => 'قطع غيار', 'icon' => 'fa-gear'],
                    ['name' => 'إكسسوارات', 'icon' => 'fa-car-battery']
                ]
            ],
            [
                'name' => 'إلكترونيات',
                'icon' => 'fa-mobile',
                'children' => [
                    ['name' => 'هواتف ذكية', 'icon' => 'fa-mobile-screen'],
                    ['name' => 'أجهزة لوحية', 'icon' => 'fa-tablet'],
                    ['name' => 'لابتوب', 'icon' => 'fa-laptop'],
                    ['name' => 'إكسسوارات', 'icon' => 'fa-headphones']
                ]
            ],
            [
                'name' => 'أثاث منزلي',
                'icon' => 'fa-couch',
                'children' => [
                    ['name' => 'غرف نوم', 'icon' => 'fa-bed'],
                    ['name' => 'صالونات', 'icon' => 'fa-chair'],
                    ['name' => 'مطابخ', 'icon' => 'fa-kitchen-set'],
                    ['name' => 'أثاث حدائق', 'icon' => 'fa-tree']
                ]
            ]
        ];

        foreach ($mainCategories as $mainCategory) {
            $category = Category::create([
                'name' => $mainCategory['name'],
                'slug' => Str::slug($mainCategory['name']),
                'icon' => $mainCategory['icon'],
                'is_active' => true
            ]);

            foreach ($mainCategory['children'] as $index => $child) {
                Category::create([
                    'name' => $child['name'],
                    'slug' => Str::slug($mainCategory['name'] . '-' . $child['name']),
                    'icon' => $child['icon'],
                    'parent_id' => $category->id,
                    'order' => $index + 1,
                    'is_active' => true
                ]);
            }
        }
    }
}
