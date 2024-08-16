<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        //return parent::toArray($request);
       return[
            'by_user'=>$this->causer->name,
            'status' => $this->description,
            'properties' =>PropertyRresource::collection($this->properties),

        ];
    }
}
