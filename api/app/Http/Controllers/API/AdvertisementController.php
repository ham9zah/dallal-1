<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Advertisement;
use App\Models\Category;
use App\Models\City;
use App\Models\District;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class AdvertisementController extends Controller
{
    public function index(Request $request)
    {
        try {
            $query = Advertisement::with(['category', 'city', 'district', 'user']);

            if ($request->has('category')) {
                $query->where('category_id', $request->category);
            }

            if ($request->has('city')) {
                $query->where('city_id', $request->city);
            }

            if ($request->has('district')) {
                $query->where('district_id', $request->district);
            }

            $advertisements = $query->latest()->paginate(12);
            return response()->json([
                'message' => 'تم جلب الإعلانات بنجاح',
                'data' => $advertisements
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء جلب الإعلانات',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function store(Request $request)
    {
        try {
            \Log::info('بيانات الإعلان المستلمة:', $request->all());
            \Log::info('الملفات المرفقة:', $request->allFiles());
            \Log::info('المتغيرات:', [
                'has_images' => $request->hasFile('images'),
                'content_type' => $request->header('Content-Type'),
                'category_id' => $request->input('category_id'),
                'city_id' => $request->input('city_id'),
                'district_id' => $request->input('district_id')
            ]);

            // التحقق من وجود الصور
            if (!$request->hasFile('images')) {
                return response()->json([
                    'message' => 'يجب إرفاق صور للإعلان',
                    'errors' => ['images' => ['يجب إرفاق صور للإعلان']]
                ], 422);
            }

            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:0',
                'category_id' => 'required',
                'city_id' => 'required',
                'district_id' => 'required',
                'condition' => 'required|in:new,used',
                'is_negotiable' => 'required|in:0,1',
                'allow_bidding' => 'required|in:0,1'
            ]);

            if ($validator->fails()) {
                \Log::error('أخطاء التحقق:', $validator->errors()->toArray());
                return response()->json([
                    'message' => 'بيانات غير صحيحة',
                    'errors' => $validator->errors()
                ], 422);
            }

            // التحقق من وجود الفئة والمدينة والحي
            $category = Category::find($request->input('category_id'));
            $city = City::find($request->input('city_id'));
            $district = District::find($request->input('district_id'));

            if (!$category || !$city || !$district) {
                \Log::error('أخطاء التحقق من البيانات:', [
                    'category' => $category ? true : false,
                    'city' => $city ? true : false,
                    'district' => $district ? true : false
                ]);
                return response()->json([
                    'message' => 'الفئة أو المدينة أو الحي غير موجود',
                    'errors' => [
                        'category_id' => !$category ? ['الفئة غير موجودة'] : [],
                        'city_id' => !$city ? ['المدينة غير موجودة'] : [],
                        'district_id' => !$district ? ['الحي غير موجود'] : []
                    ]
                ], 422);
            }

            $data = [
                'title' => $request->input('title'),
                'description' => $request->input('description'),
                'price' => $request->input('price'),
                'category_id' => $category->id,
                'city_id' => $city->id,
                'district_id' => $district->id,
                'condition' => $request->input('condition'),
                'is_negotiable' => $request->input('is_negotiable') === '1',
                'allow_bidding' => $request->input('allow_bidding') === '1',
                'user_id' => Auth::id(),
                'status' => 'active'
            ];

            \Log::info('بيانات الإعلان قبل الحفظ:', $data);

            $advertisement = Advertisement::create($data);

            foreach ($request->file('images') as $index => $image) {
                $path = $image->store('advertisements', 'public');
                $advertisement->images()->create([
                    'image_path' => $path,
                    'order' => $index
                ]);
            }

            return response()->json([
                'message' => 'تم إضافة الإعلان بنجاح',
                'data' => $advertisement->load(['category', 'city', 'district', 'images'])
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء إضافة الإعلان',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(Advertisement $advertisement)
    {
        try {
            return response()->json([
                'message' => 'تم جلب الإعلان بنجاح',
                'data' => $advertisement->load(['category', 'city', 'district', 'user', 'images'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء جلب الإعلان',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function update(Request $request, Advertisement $advertisement)
    {
        try {
            $this->authorize('update', $advertisement);

            $validator = Validator::make($request->all(), [
                'title' => 'string|max:255',
                'description' => 'string',
                'price' => 'numeric|min:0',
                'category_id' => 'exists:categories,id',
                'city_id' => 'exists:cities,id',
                'district_id' => 'exists:districts,id',
                'images.*' => 'image|mimes:jpeg,png,jpg|max:2048',
                'negotiable' => 'boolean',
                'allow_bidding' => 'boolean',
                'condition' => 'in:new,used'
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'message' => 'بيانات غير صحيحة',
                    'errors' => $validator->errors()
                ], 422);
            }

            $advertisement->update($request->all());

            if ($request->hasFile('images')) {
                foreach ($request->file('images') as $image) {
                    $path = $image->store('advertisements', 'public');
                    $advertisement->images()->create([
                        'path' => $path
                    ]);
                }
            }

            return response()->json([
                'message' => 'تم تحديث الإعلان بنجاح',
                'data' => $advertisement->load(['category', 'city', 'district', 'images'])
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء تحديث الإعلان',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function destroy(Advertisement $advertisement)
    {
        try {
            $this->authorize('delete', $advertisement);

            foreach ($advertisement->images as $image) {
                Storage::disk('public')->delete($image->path);
            }

            $advertisement->delete();

            return response()->json([
                'message' => 'تم حذف الإعلان بنجاح'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء حذف الإعلان',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function search(Request $request)
    {
        try {
            $query = Advertisement::with(['category', 'city', 'district', 'user']);

            if ($request->has('q')) {
                $query->where(function($q) use ($request) {
                    $q->where('title', 'like', "%{$request->q}%")
                      ->orWhere('description', 'like', "%{$request->q}%");
                });
            }

            $advertisements = $query->latest()->paginate(12);
            return response()->json([
                'message' => 'تم جلب الإعلانات بنجاح',
                'data' => $advertisements
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء جلب الإعلانات',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function toggleFavorite(Advertisement $advertisement)
    {
        try {
            $user = Auth::user();
            $user->favorites()->toggle($advertisement->id);
            return response()->json([
                'message' => 'تم إضافة الإعلان إلى المفضلة بنجاح',
                'favorited' => $user->favorites()->where('advertisement_id', $advertisement->id)->exists()
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء إضافة الإعلان إلى المفضلة',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function favorites()
    {
        try {
            $favorites = Auth::user()->favorites()->with(['category', 'city', 'district'])->latest()->paginate(12);
            return response()->json([
                'message' => 'تم جلب الإعلانات المفضلة بنجاح',
                'data' => $favorites
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء جلب الإعلانات المفضلة',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function placeBid(Request $request, Advertisement $advertisement)
    {
        try {
            $request->validate([
                'amount' => 'required|numeric|min:' . ($advertisement->price + 1)
            ]);

            if (!$advertisement->allow_bidding) {
                return response()->json([
                    'message' => 'لا يسمح بالمزايدة على هذا الإعلان'
                ], 422);
            }

            $bid = $advertisement->bids()->create([
                'user_id' => Auth::id(),
                'amount' => $request->amount
            ]);

            return response()->json([
                'message' => 'تم إضافة العرض بنجاح',
                'data' => $bid
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'حدث خطأ أثناء إضافة العرض',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
