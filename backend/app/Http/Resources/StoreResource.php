<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StoreResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'productName' => $this->product->name,
            'sizes'=>SizeStoreResource::collection($this->sizes),
        ];
    }
}
