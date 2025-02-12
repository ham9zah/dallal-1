<?php

namespace App\Providers;

use App\Repositories\CategoryRepository;
use Illuminate\Support\ServiceProvider;

class RepositoryServiceProvider extends ServiceProvider
{
    /**
     * تسجيل خدمات التطبيق
     */
    public function register(): void
    {
        $this->app->bind(CategoryRepository::class, function ($app) {
            return new CategoryRepository($app->make(\App\Models\Category::class));
        });
    }
}
