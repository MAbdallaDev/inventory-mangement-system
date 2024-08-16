<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GetColorRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'size_id' => ['required','exists:sizes,id'],
            'product_name' => ['required', 'exists:products,name'],
        ];
    }
}
