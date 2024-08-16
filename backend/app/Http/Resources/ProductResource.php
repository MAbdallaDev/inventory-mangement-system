<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
class ProductResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'price' => $this->price,
            'code' => $this->code,
            'total_quantity' => $this->total_quantity,
            'details' => $this->details,
            'created_at' => $this->created_at->translatedFormat('l j F Y H:i:s'),
            'sizes' => SizeProductResource::collection($this->sizes),
        ];
    }
}
