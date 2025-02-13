<?php

namespace App\Http\Controllers;

use App\Models\Advertisement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreAdvertisementRequest;

class AdvertisementController extends Controller
{
    public function store(StoreAdvertisementRequest $request)
    {
        try {
            DB::beginTransaction();

            // إنشاء الإعلان
            $advertisement = Advertisement::create([
                'user_id' => auth()->id(),
                'category_id' => $request->category_id,
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'city_id' => $request->city_id,
                'district_id' => $request->district_id,
                'condition' => $request->condition,
                'is_negotiable' => $request->has('is_negotiable'),
                'allow_bidding' => $request->has('allow_bidding'),
                'status' => 'pending'
            ]);

            // معالجة الصور
            if ($request->hasFile('images')) {
                $images = $request->file('images');
                foreach ($images as $index => $image) {
                    if ($index >= 8) break; // الحد الأقصى 8 صور

                    $path = $image->store('advertisements', 'public');
                    $advertisement->images()->create([
                        'image_path' => 'storage/' . $path,
                        'order' => $index
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'تم إنشاء الإعلان بنجاح',
                'advertisement' => $advertisement->load('images', 'category', 'city', 'district')
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'حدث خطأ أثناء إنشاء الإعلان',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index(Request $request)
    {
        $query = Advertisement::with(['images', 'category', 'city', 'district', 'user'])
            ->where('status', 'active');

        // التصفية حسب التصنيف
        if ($request->has('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // التصفية حسب المدينة
        if ($request->has('city_id')) {
            $query->where('city_id', $request->city_id);
        }

        // التصفية حسب نطاق السعر
        if ($request->has('min_price')) {
            $query->where('price', '>=', $request->min_price);
        }
        if ($request->has('max_price')) {
            $query->where('price', '<=', $request->max_price);
        }

        // التصفية حسب الحالة
        if ($request->has('condition')) {
            $query->where('condition', $request->condition);
        }

        $advertisements = $query->latest()->paginate(15);

        return response()->json($advertisements);
    }

    public function show(Advertisement $advertisement)
    {
        return response()->json(
            $advertisement->load(['images', 'category', 'city', 'district', 'user', 'bids'])
        );
    }

    public function update(StoreAdvertisementRequest $request, Advertisement $advertisement)
    {
        try {
            DB::beginTransaction();

            // التحقق من ملكية الإعلان
            if ($advertisement->user_id !== auth()->id()) {
                return response()->json(['message' => 'غير مصرح لك بتعديل هذا الإعلان'], 403);
            }

            // تحديث الإعلان
            $advertisement->update([
                'category_id' => $request->category_id,
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'city_id' => $request->city_id,
                'district_id' => $request->district_id,
                'condition' => $request->condition,
                'is_negotiable' => $request->has('is_negotiable'),
                'allow_bidding' => $request->has('allow_bidding')
            ]);

            // معالجة الصور الجديدة
            if ($request->hasFile('images')) {
                // حذف الصور القديمة
                foreach ($advertisement->images as $image) {
                    Storage::disk('public')->delete(str_replace('storage/', '', $image->image_path));
                }
                $advertisement->images()->delete();

                // إضافة الصور الجديدة
                $images = $request->file('images');
                foreach ($images as $index => $image) {
                    if ($index >= 8) break;

                    $path = $image->store('advertisements', 'public');
                    $advertisement->images()->create([
                        'image_path' => 'storage/' . $path,
                        'order' => $index
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'message' => 'تم تحديث الإعلان بنجاح',
                'advertisement' => $advertisement->load('images', 'category', 'city', 'district')
            ]);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'message' => 'حدث خطأ أثناء تحديث الإعلان',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Advertisement $advertisement)
    {
        try {
            if ($advertisement->user_id !== auth()->id()) {
                return response()->json(['message' => 'غير مصرح لك بحذف هذا الإعلان'], 403);
            }

            // حذف الصور
            foreach ($advertisement->images as $image) {
                Storage::disk('public')->delete(str_replace('storage/', '', $image->image_path));
            }

            $advertisement->delete();

            return response()->json(['message' => 'تم حذف الإعلان بنجاح']);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء حذف الإعلان',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
