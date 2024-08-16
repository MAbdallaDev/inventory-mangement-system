<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PropertyRresource extends JsonResource
{
    public function toArray(Request $request): array
    {
        /*
 {
            "by_user": "Ahmed",
            "status": "created",
            "properties": {
                "attributes": {
                    "id": 121,
                    "name": "retضrettr9rt",
                    "price": "20.00",
                    "code": "rrrdreett9trerr",
                    "total_quantity": "10"
                }
            }
        },
        */
        return parent::toArray($request);
/*                    return [
                    'attributes'=>$this->properties ?? null,
                        'attribute'=>$this->properties['attributes']?? null,

                        // 'old'=>$this->old??null,
                ];*/
    }
}
