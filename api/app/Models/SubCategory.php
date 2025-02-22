<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'category_id', 'slug', 'status', 'description', 'user_id'];

    public function storeSubCategory($input){
        return self::query()->create($input);
    }

    public function getAllSubCategories(){
        return self::query()->with('user:id,name')->get();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function getSubCategoryIdAndName(){
        return self::query()->select('id', 'name', 'category_id')->get();
    }
}
