<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;

class UsersWithRolesSeeder extends Seeder
{
    public function run()
    {
        // إنشاء الأدوار إذا لم تكن موجودة
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $managerRole = Role::firstOrCreate(['name' => 'manager']);
        $userRole = Role::firstOrCreate(['name' => 'user']);

        // إنشاء مستخدم عادي
        $user = User::create([
            'name' => 'مستخدم عادي',
            'email' => 'user@dallal.com',
            'password' => Hash::make('User123456'),
        ]);
        $user->assignRole($userRole);

        // إنشاء مشرف
        $admin = User::create([
            'name' => 'مشرف النظام',
            'email' => 'admin@dallal.com',
            'password' => Hash::make('Admin123456'),
        ]);
        $admin->assignRole($adminRole);

        // إنشاء مدير
        $manager = User::create([
            'name' => 'مدير النظام',
            'email' => 'manager@dallal.com',
            'password' => Hash::make('Manager123456'),
        ]);
        $manager->assignRole($managerRole);
    }
}
