<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        // إنشاء مستخدم للاختبار
        User::create([
            'name' => 'مستخدم تجريبي',
            'email' => 'test@example.com',
            'password' => Hash::make('password'),
            'phone' => '0500000000',
        ]);

        // يمكنك إضافة المزيد من المستخدمين هنا
    }
}
