<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SubCategory extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'category_id', 'slug', 'status', 'description', 'user_id'];

    public function storeSubCategory($input){
        return self::query()->create($input);
    }

    public function getAllSubCategories($input){
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();

        if(!empty($input['search'])){
            $query->where('name', 'like', '%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->with('user:id,name')->paginate($per_page);
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

    public function getAllSubCategoriesData($columns = ['*']){
        $sub_categories = DB::table('sub_categories')->select($columns)->get();
        return collect($sub_categories);
    }
}
