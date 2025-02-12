<?php

namespace App\Providers;

use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Event;

class EventServiceProvider extends ServiceProvider
{
    /**
     * الأحداث المسجلة للتطبيق.
     *
     * @var array<class-string, array<int, class-string>>
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
    ];

    /**
     * تسجيل أي أحداث للتطبيق.
     */
    public function boot(): void
    {
        //
    }

    /**
     * تحديد ما إذا كان يجب اكتشاف الأحداث والمستمعين تلقائياً.
     */
    public function shouldDiscoverEvents(): bool
    {
        return false;
    }
}
