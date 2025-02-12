<?php

namespace App\Services;

use App\Models\Listing;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\Cache;

class ListingService
{
    /**
     * الحصول على قائمة الإعلانات مع التصفية
     */
    public function getListings(array $filters): LengthAwarePaginator
    {
        $cacheKey = 'listings:' . md5(json_encode($filters));

        return Cache::remember($cacheKey, now()->addMinutes(30), function () use ($filters) {
            return Listing::with(['user', 'category'])
                ->active()
                ->filter($filters)
                ->latest()
                ->paginate(12);
        });
    }

    /**
     * الحصول على تفاصيل إعلان محدد
     */
    public function getListingDetails(int $id): Listing
    {
        return Cache::remember('listing:' . $id, now()->addMinutes(30), function () use ($id) {
            return Listing::with(['user', 'category', 'media'])
                ->findOrFail($id);
        });
    }

    /**
     * إنشاء إعلان جديد
     */
    public function createListing(array $data, int $userId): Listing
    {
        $data['user_id'] = $userId;
        $data['status'] = 'active';

        $listing = Listing::create($data);

        if (isset($data['images'])) {
            foreach ($data['images'] as $image) {
                $listing->addMedia($image)->toMediaCollection('listings');
            }
        }

        Cache::tags(['listings'])->flush();

        return $listing;
    }

    /**
     * تحديث إعلان
     */
    public function updateListing(Listing $listing, array $data): Listing
    {
        $listing->update($data);

        if (isset($data['images'])) {
            foreach ($data['images'] as $image) {
                $listing->addMedia($image)->toMediaCollection('listings');
            }
        }

        Cache::forget('listing:' . $listing->id);
        Cache::tags(['listings'])->flush();

        return $listing;
    }

    /**
     * حذف إعلان
     */
    public function deleteListing(Listing $listing): bool
    {
        $deleted = $listing->delete();

        if ($deleted) {
            Cache::forget('listing:' . $listing->id);
            Cache::tags(['listings'])->flush();
        }

        return $deleted;
    }
}
