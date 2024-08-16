<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreColorSizeRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'sizes' => ['array', 'required'],
            'sizes.*.size' => ['required', 'numeric', 'exists:sizes,id'],
            'sizes.*.colors' => ['array', 'required'],
            'sizes.*.colors.*.color' => ['required', 'numeric', 'exists:colors,id'],
            'sizes.*.colors.*.qty' => ['required', 'numeric'],
        ];
    }
/*    public function messages(): array
    {
        return [
            'sizes.*.size.required' => ' المقاس مطلوب  ',
            'sizes.*.size.numeric' => ' لابد عن ترسل ال رقم المقاس    ',
            'sizes.*.size.exists' => ' المقاس مطلوب  ',

            'name.string' => 'يجب ان يكون اسم المقاس عبارة عن احرف',
            'name.min' => 'يجب عن لا يقل عن حرف واحد',
            'name.max' =>'يجب ان لا يزيد عن 150 حرف ',
            'name.unique' =>'الاسم المقاس موجود بالفعل و يجب عدم التكرار ',
        ];
    }*/
}
