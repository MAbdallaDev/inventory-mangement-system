<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LoginUserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'email'=>['required','email','min:5','max:60','exists:users,email'],
            'password' => ['required','min:8','max:120'],
        ];
    }
    public function messages(): array
    {
        return [
            'email.required' => 'حقل البريد الإلكتروني مطلوب.',
            'email.exists' => 'هذا الاميل غير مسجل  يرجي التسجيل اولا ',
            'email.email' => 'يرجى إدخال عنوان بريد إلكتروني صالح.',
            'email.min' => 'يجب أن يكون طول البريد الإلكتروني على الأقل 5 أحرف.',
            'email.max' => 'يجب ألا يتجاوز طول البريد الإلكتروني 60 حرفًا.',

            'password.required' => 'حقل كلمة المرور مطلوب.',
            'password.min' => 'يجب أن تحتوي كلمة المرور على الأقل 8 أحرف.',
            'password.max' => 'يجب ألا تتجاوز كلمة المرور 120 حرفًا.',
        ];
    }
}
