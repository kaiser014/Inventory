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

    public function getAllCategories($input){
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

    public function getCategoryIdAndName(){
        return self::query()->select('id','name')->get();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
