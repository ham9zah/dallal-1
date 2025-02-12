<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ListingRequest;
use App\Http\Resources\ListingResource;
use App\Models\Listing;
use App\Services\ListingService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class ListingController extends Controller
{
    public function __construct(private ListingService $listingService)
    {
    }

    /**
     * عرض قائمة الإعلانات
     */
    public function index(Request $request): AnonymousResourceCollection
    {
        $listings = $this->listingService->getListings($request->all());
        return ListingResource::collection($listings);
    }

    /**
     * إنشاء إعلان جديد
     */
    public function store(ListingRequest $request): JsonResponse
    {
        $listing = $this->listingService->createListing(
            $request->validated(),
            $request->user()->id
        );

        return response()->json([
            'message' => 'تم إنشاء الإعلان بنجاح',
            'listing' => new ListingResource($listing)
        ], 201);
    }

    /**
     * عرض تفاصيل إعلان محدد
     */
    public function show(Listing $listing): ListingResource
    {
        return new ListingResource(
            $this->listingService->getListingDetails($listing->id)
        );
    }

    /**
     * تحديث إعلان
     */
    public function update(ListingRequest $request, Listing $listing): JsonResponse
    {
        $this->authorize('update', $listing);

        $listing = $this->listingService->updateListing($listing, $request->validated());

        return response()->json([
            'message' => 'تم تحديث الإعلان بنجاح',
            'listing' => new ListingResource($listing)
        ]);
    }

    /**
     * حذف إعلان
     */
    public function destroy(Listing $listing): JsonResponse
    {
        $this->authorize('delete', $listing);

        $this->listingService->deleteListing($listing);

        return response()->json([
            'message' => 'تم حذف الإعلان بنجاح'
        ]);
    }
}
