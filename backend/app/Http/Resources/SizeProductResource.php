<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SizeProductResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'size' => $this->name,
            'colors' => ColorProductResource::collection($this->colorsProduct()
                ->wherePivot('product_id', $this->pivot->product_id)/*->wherePivot('product_quantity', '!=', 0)*/->get()),
        ];
    }
}
