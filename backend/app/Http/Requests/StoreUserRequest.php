<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreUserRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }
    public function rules(): array
    {
        return [
            'name' => ['required', 'string','min:3', 'max:120'],
            'email'=>['required','email','unique:users,email','min:5','max:60'],
            'password' => ['required','min:8','max:60', 'confirmed'],
           'role'=>['nullable','string','min:1','max:60',Rule::in(['manger', 'user'])],
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'حقل  الاسم مطلوب.',
            'name.string' => 'حقل الاسم لابد ان يكون احرف .',
            'name.min' => 'حقل الاسم لا يقل عن 3 حرف ',
            'name.max' => 'حقل الاسم لا يزيد عن 100 حرفًا ',

            'email.required' => 'حقل البريد الإلكتروني مطلوب.',
            'email.email' => 'يرجى إدخال عنوان بريد إلكتروني صالح.',
            'email.max' => 'يجب ألا يتجاوز طول البريد الإلكتروني 55 حرفًا.',
            'email.min' => 'يجب أن يكون طول البريد الإلكتروني على الأقل 5 أحرف.',
            'email.unique' => 'لا يمكن تكرار الاميل ',

            'password.required' => 'حقل كلمة المرور مطلوب.',
            'password.confirmed' => 'حقل كلمة المرور لابد عن يكون متطابق.',
            'password.min' => 'يجب أن تحتوي كلمة المرور على الأقل 8 أحرف.',
            'password.max' => 'يجب ألا تتجاوز كلمة المرور 50 حرفًا.',

            'role.required' => 'حالة المستخدم مطلوبة مطلوب.',
            'role.string' => ' حالة المستخدم  لابد ان يكون احرف .',
            'role.min' => ' حالة المستخدم  لا يقل عن  حرف ',
            'role.max' => ' حالة المستخدم  لا يزيد عن 100 حرفًا ',
        ];
    }

}
