<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasswordRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'current_password' => ['required', 'string'],
            'new_password' => ['required', 'string', 'min:8', 'confirmed'],
            'new_password_confirmation' => ['required', 'string']
        ];
    }

    public function messages()
    {
        return [
            'current_password.required' => 'حقل كلمة المرور الحالية مطلوب',
            'new_password.required' => 'حقل كلمة المرور الجديدة مطلوب',
            'new_password.min' => 'يجب أن تكون كلمة المرور الجديدة 8 أحرف على الأقل',
            'new_password.confirmed' => 'كلمة المرور الجديدة غير متطابقة',
            'new_password_confirmation.required' => 'حقل تأكيد كلمة المرور مطلوب'
        ];
    }
}
