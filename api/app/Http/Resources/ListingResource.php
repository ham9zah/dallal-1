<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ListingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'formatted_price' => number_format($this->price, 2) . ' ريال',
            'category' => [
                'id' => $this->category->id,
                'name' => $this->category->name,
            ],
            'user' => [
                'id' => $this->user->id,
                'name' => $this->user->name,
            ],
            'location' => $this->location,
            'contact_info' => $this->contact_info,
            'status' => $this->status,
            'images' => $this->when($this->media->isNotEmpty(), function () {
                return $this->media->map(function ($media) {
                    return [
                        'id' => $media->id,
                        'url' => $media->getFullUrl(),
                        'thumbnail' => $media->getFullUrl('thumbnail'),
                    ];
                });
            }, []),
            'created_at' => $this->created_at->format('Y-m-d H:i:s'),
            'updated_at' => $this->updated_at->format('Y-m-d H:i:s'),
        ];
    }
}
