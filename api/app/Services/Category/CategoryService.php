<?php

namespace App\Services\Category;

use App\Repositories\CategoryRepository;
use Exception;

class CategoryService
{
    protected $categoryRepository;

    public function __construct(CategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * الحصول على جميع الفئات الرئيسية النشطة
     */
    public function getAllParentCategories()
    {
        return $this->categoryRepository->getActiveParentCategories();
    }

    /**
     * إنشاء فئة جديدة
     */
    public function createCategory(array $data)
    {
        return $this->categoryRepository->create($data);
    }

    /**
     * البحث عن فئة
     */
    public function find($id)
    {
        return $this->categoryRepository->findWithRelations($id);
    }

    /**
     * تحديث فئة
     */
    public function updateCategory($id, array $data)
    {
        $category = $this->categoryRepository->find($id);
        if (!$category) {
            throw new Exception('الفئة غير موجودة');
        }

        $this->categoryRepository->update($id, $data);
        return $this->categoryRepository->find($id);
    }

    /**
     * حذف فئة
     */
    public function deleteCategory($id)
    {
        $category = $this->categoryRepository->find($id);
        if (!$category) {
            throw new Exception('الفئة غير موجودة');
        }

        if ($this->categoryRepository->hasChildren($id)) {
            throw new Exception('لا يمكن حذف الفئة لأنها تحتوي على فئات فرعية');
        }

        return $this->categoryRepository->delete($id);
    }
}
