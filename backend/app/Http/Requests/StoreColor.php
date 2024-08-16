<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreColor extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'=>['required','string','min:1','max:150','unique:colors,name'],
        ];
    }
    public function messages(): array
    {
        return [
            'name.required' => 'الاسم مطلوب ',
            'name.string' => 'يجب ان يكون اسم اللون عبارة عن احرف',
            'name.min' => 'يجب عن لا يقل عن حرف واحد',
            'name.max' =>'يجب ان لا يزيد عن 150 حرف ',
            'name.unique' =>'الاسم اللون موجود بالفعل ',
        ];
    }
}
