<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // إنشاء دور المدير
        $adminRole = Role::create(['name' => 'admin']);

        // إضافة دور المدير للمستخدم الأول
        $admin = User::first();
        if ($admin) {
            $admin->assignRole('admin');
        }
    }
}
