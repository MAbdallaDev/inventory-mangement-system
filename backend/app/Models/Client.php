<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable=['name','phone','address'];
/*    protected $casts = [
        'updated_at' => 'timestamp',
        'created_at' => 'timestamp'
    ];*/
    public function invoiceInfo()
    {
        return $this->hasMany(invoiceInfo::class);
    }
}
