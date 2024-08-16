<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'phone' => $this->phone,
            'address' => $this->address,
            'created_at' => $this->created_at->translatedFormat('l j F Y H:i:s'),
            'updated_at' => $this->updated_at->translatedFormat('l j F Y H:i:s'),

        ];
    }
}
