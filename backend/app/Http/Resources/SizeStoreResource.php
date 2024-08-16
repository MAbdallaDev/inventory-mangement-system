<?php

namespace App\Http\Resources;

use App\Http\Requests\StoreColorSizeRequest;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SizeStoreResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'size' => $this->name,
            'colors' => ColorStoreResource::collection($this->colorsStore()->wherePivot('product_id', $this->pivot->product_id)->
            wherePivot('store_id', $this->pivot->store_id)->get()),
        ];
    }
}
