<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Services\Category\CategoryService;
use App\Traits\ApiResponse;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    use ApiResponse;

    protected $categoryService;

    public function __construct(CategoryService $categoryService)
    {
        $this->categoryService = $categoryService;
    }

    /**
     * عرض قائمة الفئات
     */
    public function index(): JsonResponse
    {
        try {
            $categories = $this->categoryService->getAllParentCategories();
            return $this->successResponse(
                CategoryResource::collection($categories),
                'تم جلب الفئات بنجاح'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * إنشاء فئة جديدة
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'icon' => ['nullable', 'string'],
                'parent_id' => ['nullable', 'exists:categories,id'],
                'order' => ['nullable', 'integer'],
                'is_active' => ['nullable', 'boolean']
            ]);

            $validated['slug'] = Str::slug($validated['name']);
            
            $category = $this->categoryService->createCategory($validated);
            
            return $this->successResponse(
                new CategoryResource($category),
                'تم إنشاء الفئة بنجاح',
                201
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * عرض فئة محددة
     */
    public function show(int $id): JsonResponse
    {
        try {
            $category = $this->categoryService->find($id);
            if (!$category) {
                return $this->errorResponse('الفئة غير موجودة', 404);
            }
            return $this->successResponse(
                new CategoryResource($category->load('children')),
                'تم جلب الفئة بنجاح'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * تحديث فئة محددة
     */
    public function update(Request $request, int $id): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => ['required', 'string', 'max:255'],
                'description' => ['nullable', 'string'],
                'icon' => ['nullable', 'string'],
                'parent_id' => ['nullable', 'exists:categories,id'],
                'order' => ['nullable', 'integer'],
                'is_active' => ['nullable', 'boolean']
            ]);

            $category = $this->categoryService->find($id);
            if (!$category) {
                return $this->errorResponse('الفئة غير موجودة', 404);
            }

            if ($request->has('name') && $category->name !== $validated['name']) {
                $validated['slug'] = Str::slug($validated['name']);
            }

            $category = $this->categoryService->updateCategory($id, $validated);
            
            return $this->successResponse(
                new CategoryResource($category),
                'تم تحديث الفئة بنجاح'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }

    /**
     * حذف فئة محددة
     */
    public function destroy(int $id): JsonResponse
    {
        try {
            $this->categoryService->deleteCategory($id);
            return $this->successResponse(
                null,
                'تم حذف الفئة بنجاح'
            );
        } catch (\Exception $e) {
            return $this->errorResponse($e->getMessage());
        }
    }
}
