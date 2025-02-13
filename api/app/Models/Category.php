<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'slug', 'status', 'description', 'user_id'];

    public function storeData($category){
        return self::query()->create($category);
    }

    public function getAllCategories(){
        return self::query()->with('user:id,name')->get();
    }

    public function getCategoryIdAndName(){
        return self::query()->select('id','name')->get();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
