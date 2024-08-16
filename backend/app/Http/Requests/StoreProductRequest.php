<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:256', 'min:2', 'unique:products,name'],
            'price' => ['required', 'numeric', 'min:1'],
            'details' => ['nullable', 'string', 'max:256', 'min:1'],
            'code' => ['required', 'max:256', 'min:2', 'unique:products,code'],
            'total_quantity' => ['required', 'numeric', 'max:255', 'min:1'],
            'sizes' => ['array', 'required'],
            'sizes.*.size' => ['required', 'numeric', 'exists:sizes,id'],
            'sizes.*.colors' => ['array', 'required'],
            'sizes.*.colors.*.color' => ['required', 'numeric', 'exists:colors,id'],
            'sizes.*.colors.*.quantity' => ['required', 'numeric'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'اسم المنتج مطلوب', 'name.string' => 'اسم المنتج لابد عن يكون احرف',
            'name.unique' => 'اسم المنتج لا يمكن ان يتكرر ', 'name.max' => 'الاسم المنتج لا يزيد عن 255 حرف',
            'name.min' => 'اسم المنتج لا يقل عن حرفين',

            'price.required' => 'سعر المنتج مطلوب', 'price.numeric' => 'السعر لابد عن يكون ارقام',
            'price.min' => 'السعر لا يقل عن رقم واحد',

            'code.required' => 'كود المنتج مطلوب', 'code.max' => 'كود المنتج لايقل عن حرفين',
            'code.min' => 'كود المنتج لا يزيد عن 255 حرف', 'code.unique' => 'كود المنتج لا يجب عن يتكرر',

            'total_quantity.required' => 'الكمية الكلية للمنتج مطلوب', 'total_quantity.numeric' => ' الكمية الكلية لابد عن تكون رقم  ',
            'total_quantity.max' => 'الكمية الكلية لا يزيد عن 255 رقم', 'total_quantity.min' => 'الكمية الكلية لا تقل عن رقم واحد',

            'sizes.*.size.required' => 'المقاس مطلوب ', 'sizes.*.size.numeric' => ' المقاس لابد ان يكون رقما',
            'sizes.*.size.exists' => ' المقاس غير موجود من المقاسات المتاحة لديك',

            'sizes.*.colors.*.color.required' => 'اللون مطلوب ', 'sizes.*.colors.*.color.numeric' => ' اللون لابد ان يكون رقما',
            'sizes.*.colors.*.color.exists' => ' اللون غير موجود من الالون المتاحة ليك',

            'sizes.*.colors.*.qty.required' => 'الكمية مطلوب ', 'sizes.*.colors.*.qty.numeric' => ' الكمية لابد ان يكون رقما',
        ];
    }
}
