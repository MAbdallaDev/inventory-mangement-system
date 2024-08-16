<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['code', 'total_quantity', 'name', 'price','details'];

    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'size_pivot')->withPivot('id', 'product_id');
    }
}
