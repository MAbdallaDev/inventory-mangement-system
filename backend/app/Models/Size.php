<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Size extends Model
{

    use HasFactory;

    protected $fillable = ['name'];

    public function colorsProduct()
    {
        return $this->belongsToMany(Color::class, 'size_colors_pivot')->withPivot('color_id', 'product_quantity', 'product_id', 'size_id');
    }

}
