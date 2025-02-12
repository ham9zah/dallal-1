<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ListingRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'category_id' => ['required', 'exists:categories,id'],
            'location' => ['required', 'string', 'max:255'],
            'contact_info' => ['required', 'string', 'max:255'],
            'images.*' => ['image', 'mimes:jpeg,png,jpg,gif', 'max:2048']
        ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'عنوان الإعلان مطلوب',
            'title.max' => 'عنوان الإعلان يجب أن لا يتجاوز 255 حرف',
            'description.required' => 'وصف الإعلان مطلوب',
            'price.required' => 'السعر مطلوب',
            'price.numeric' => 'السعر يجب أن يكون رقماً',
            'price.min' => 'السعر يجب أن يكون أكبر من صفر',
            'category_id.required' => 'القسم مطلوب',
            'category_id.exists' => 'القسم المحدد غير موجود',
            'location.required' => 'الموقع مطلوب',
            'location.max' => 'الموقع يجب أن لا يتجاوز 255 حرف',
            'contact_info.required' => 'معلومات الاتصال مطلوبة',
            'contact_info.max' => 'معلومات الاتصال يجب أن لا تتجاوز 255 حرف',
            'images.*.image' => 'الملف يجب أن يكون صورة',
            'images.*.mimes' => 'الصورة يجب أن تكون من نوع: jpeg, png, jpg, gif',
            'images.*.max' => 'حجم الصورة يجب أن لا يتجاوز 2 ميجابايت'
        ];
    }
}
