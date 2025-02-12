<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Collection;

abstract class BaseRepository
{
    protected $model;

    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * الحصول على جميع السجلات
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * البحث عن سجل بواسطة المعرف
     */
    public function find($id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * إنشاء سجل جديد
     */
    public function create(array $attributes): Model
    {
        return $this->model->create($attributes);
    }

    /**
     * تحديث سجل
     */
    public function update($id, array $attributes): bool
    {
        return $this->model->where('id', $id)->update($attributes);
    }

    /**
     * حذف سجل
     */
    public function delete($id): bool
    {
        return $this->model->destroy($id);
    }

    /**
     * البحث عن سجل أو إنشاءه
     */
    public function firstOrCreate(array $attributes): Model
    {
        return $this->model->firstOrCreate($attributes);
    }
}
