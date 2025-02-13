<?php

namespace Database\Seeders;

use App\Models\City;
use App\Models\District;
use Illuminate\Database\Seeder;

class CitySeeder extends Seeder
{
    public function run()
    {
        $cities = [
            [
                'name' => 'الرياض',
                'districts' => [
                    'النخيل',
                    'الملقا',
                    'حطين',
                    'الياسمين',
                    'الورود',
                    'العليا',
                    'السليمانية',
                    'النزهة',
                    'الروضة',
                    'الربوة'
                ]
            ],
            [
                'name' => 'جدة',
                'districts' => [
                    'البوادي',
                    'الشاطئ',
                    'الحمراء',
                    'السلامة',
                    'الروضة',
                    'الصفا',
                    'المروة',
                    'النزهة',
                    'الفيحاء',
                    'الربوة'
                ]
            ],
            [
                'name' => 'مكة المكرمة',
                'districts' => [
                    'العزيزية',
                    'النسيم',
                    'العوالي',
                    'الشوقية',
                    'الزاهر',
                    'الهنداوية',
                    'الرصيفة',
                    'الشبيكة',
                    'جرول',
                    'التيسير'
                ]
            ],
            [
                'name' => 'المدينة المنورة',
                'districts' => [
                    'قباء',
                    'العوالي',
                    'الدار',
                    'السلام',
                    'الفتح',
                    'الروضة',
                    'شوران',
                    'الرانوناء',
                    'بني ظفر',
                    'الأزهري'
                ]
            ],
            [
                'name' => 'الدمام',
                'districts' => [
                    'الشاطئ',
                    'الروضة',
                    'الجلوية',
                    'البديع',
                    'النزهة',
                    'الفيصلية',
                    'العنود',
                    'المزروعية',
                    'البحيرة',
                    'الريان'
                ]
            ]
        ];

        foreach ($cities as $cityData) {
            $city = City::create(['name' => $cityData['name']]);
            
            foreach ($cityData['districts'] as $districtName) {
                District::create([
                    'city_id' => $city->id,
                    'name' => $districtName
                ]);
            }
        }
    }
}
