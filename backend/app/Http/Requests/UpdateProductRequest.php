<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateProductRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['nullable', 'string', 'max:256', 'min:2', Rule::unique('products')->ignore($this->name, 'name')],
            'details' => ['nullable', 'string', 'max:256', 'min:1'],
            'price' => ['nullable', 'numeric', 'min:1'],
            'code' => ['nullable', 'max:256', 'min:2', Rule::unique('products')->ignore($this->code, 'code')],
            'total_quantity' => ['nullable', 'numeric', 'max:255', 'min:1'],
            'sizes' => ['nullable','array'],
            'sizes.*.id' => ['nullable', 'numeric', 'exists:sizes,id'],
            'sizes.*.colors' => ['nullable','array'],
            'sizes.*.colors.*.id' => ['nullable', 'numeric', 'exists:colors,id'],
            'sizes.*.colors.*.quantity' => ['nullable', 'numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.string' => 'اسم المنتج لابد عن يكون احرف', 'name.unique' => 'اسم المنتج لا يمكن ان يتكرر ',
            'name.max' => 'الاسم المنتج لا يزيد عن 255 حرف', 'name.min' => 'اسم المنتج لا يقل عن حرفين',

            'price.numeric' => 'السعر لابد عن يكون ارقام', 'price.min' => 'السعر لا يقل عن رقم واحد',

            'code.max' => 'كود المنتج لايقل عن حرفين', 'code.min' => 'كود المنتج لا يزيد عن 255 حرف',
            'code.unique' => 'كود المنتج لا يجب عن يتكرر',

            'total_quantity.numeric' => ' الكمية الكلية لابد عن تكون رقم  ', 'total_quantity.max' => 'الكمية الكلية لا يزيد عن 255 رقم',
            'total_quantity.min' => 'الكمية الكلية لا تقل عن رقم واحد',

            'sizes.*.size.required' => 'المقاس مطلوب ', 'sizes.*.size.numeric' => ' المقاس لابد ان يكون رقما',
            'sizes.*.size.exists' => ' المقاس غير موجود من المقاسات المتاحة لديك',

            'sizes.*.colors.*.color.required' => 'اللون مطلوب ', 'sizes.*.colors.*.color.numeric' => ' اللون لابد ان يكون رقما',
            'sizes.*.colors.*.color.exists' => ' اللون غير موجود من الالون المتاحة ليك',

            'sizes.*.colors.*.qty.required' => 'الكمية مطلوب ', 'sizes.*.colors.*.qty.numeric' => ' الكمية لابد ان يكون رقما',
        ];
    }
}
