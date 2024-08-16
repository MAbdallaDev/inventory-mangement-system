<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class invoiceInfo extends Model
{
    use HasFactory;

    protected $fillable = [
        'payment_method', 'due_date', 'invoice_date', 'invoice_id', 'client_id','description','discount',
        'total_quantity', 'total_price'
    ];
    protected $casts = [
        'invoice_date' => 'datetime',
        'due_date' => 'datetime'

    ];
    public function client()
    {
        return $this->belongsTo(Client::class);
    }

    public function invoices()
    {
        return $this->hasMany(Invoice::class);
    }
}
