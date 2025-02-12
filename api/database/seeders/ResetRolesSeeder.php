<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class ResetRolesSeeder extends Seeder
{
    public function run()
    {
        // حذف جميع الأدوار والمستخدمين الحاليين
        Role::query()->delete();
        User::query()->delete();

        // إنشاء الأدوار
        $adminRole = Role::create(['name' => 'admin']);
        $managerRole = Role::create(['name' => 'manager']);
        $userRole = Role::create(['name' => 'user']);

        // إنشاء المستخدمين
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@dallal.com',
            'password' => Hash::make('Admin123456'),
        ]);
        $admin->assignRole('admin');

        $manager = User::create([
            'name' => 'Manager User',
            'email' => 'manager@dallal.com',
            'password' => Hash::make('Manager123456'),
        ]);
        $manager->assignRole('manager');

        $user = User::create([
            'name' => 'Regular User',
            'email' => 'user@dallal.com',
            'password' => Hash::make('User123456'),
        ]);
        $user->assignRole('user');
    }
}
