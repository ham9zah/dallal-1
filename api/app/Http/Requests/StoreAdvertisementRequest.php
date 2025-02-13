<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAdvertisementRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric|min:0',
            'city_id' => 'required|exists:cities,id',
            'district_id' => 'required|exists:districts,id',
            'condition' => 'required|in:new,used',
            'is_negotiable' => 'boolean',
            'allow_bidding' => 'boolean',
            'images' => 'required|array|min:1|max:8',
            'images.*' => 'image|mimes:jpeg,png,jpg|max:2048' // 2MB لكل صورة
        ];
    }

    public function messages()
    {
        return [
            'category_id.required' => 'يجب اختيار التصنيف',
            'category_id.exists' => 'التصنيف المختار غير موجود',
            'title.required' => 'عنوان الإعلان مطلوب',
            'title.max' => 'عنوان الإعلان يجب أن لا يتجاوز 255 حرف',
            'description.required' => 'وصف الإعلان مطلوب',
            'price.required' => 'السعر مطلوب',
            'price.numeric' => 'السعر يجب أن يكون رقماً',
            'price.min' => 'السعر يجب أن يكون 0 أو أكثر',
            'city_id.required' => 'يجب اختيار المدينة',
            'city_id.exists' => 'المدينة المختارة غير موجودة',
            'district_id.required' => 'يجب اختيار الحي',
            'district_id.exists' => 'الحي المختار غير موجود',
            'condition.required' => 'يجب تحديد حالة المنتج',
            'condition.in' => 'حالة المنتج يجب أن تكون جديد أو مستعمل',
            'images.required' => 'يجب إرفاق صورة واحدة على الأقل',
            'images.max' => 'لا يمكن إرفاق أكثر من 8 صور',
            'images.*.image' => 'الملف المرفق يجب أن يكون صورة',
            'images.*.mimes' => 'الصور يجب أن تكون من نوع: jpeg, png, jpg',
            'images.*.max' => 'حجم الصورة يجب أن لا يتجاوز 2 ميجابايت'
        ];
    }
}
