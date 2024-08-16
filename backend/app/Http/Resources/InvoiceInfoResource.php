<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Carbon\Carbon;
class InvoiceInfoResource extends JsonResource
{

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'client' => new ClientResource($this->client),
            'invoice_code' => $this->invoice_id,
            'invoice_date' => $this->invoice_date,
            'due_date' => $this->due_date,
            'invoice_date_display' => $this->invoice_date->translatedFormat('l j F Y H:i:s'),
            'due_date_display' => $this->due_date->translatedFormat('l j F Y H:i:s'),
           'invoices' => InvoicesResource::collection($this->invoices),
            'payment_method' => $this->payment_method,
            'description' => $this->description,
            'discount' => $this->discount,
            'total_quantity' => $this->total_quantity,
            'total_price' => $this->total_price,
        ];
    }
}
