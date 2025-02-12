<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * السياسات المسجلة للتطبيق.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 
    ];

    /**
     * تسجيل أي خدمات مصادقة للتطبيق.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // تعريف الأدوار
        Gate::define('admin', function ($user) {
            return $user->role === 'admin';
        });

        Gate::define('user', function ($user) {
            return $user->role === 'user';
        });
    }
}
