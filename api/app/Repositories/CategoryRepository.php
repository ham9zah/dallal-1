<?php

namespace App\Repositories;

use App\Models\Category;

class CategoryRepository extends BaseRepository
{
    public function __construct(Category $model)
    {
        parent::__construct($model);
    }

    /**
     * الحصول على الفئات الرئيسية النشطة
     */
    public function getActiveParentCategories()
    {
        return $this->model
            ->with('children')
            ->parents()
            ->active()
            ->orderBy('order')
            ->get();
    }

    /**
     * البحث عن فئة مع تحميل العلاقات
     */
    public function findWithRelations($id)
    {
        return $this->model
            ->with(['children', 'parent'])
            ->find($id);
    }

    /**
     * التحقق من وجود فئات فرعية
     */
    public function hasChildren($id): bool
    {
        return $this->model->find($id)->children()->exists();
    }

    /**
     * البحث عن فئة بواسطة Slug
     */
    public function findBySlug($slug)
    {
        return $this->model
            ->where('slug', $slug)
            ->first();
    }
}
