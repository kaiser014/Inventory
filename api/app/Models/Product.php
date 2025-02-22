<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class Product extends Model
{
    use HasFactory;


    protected $fillable = [
        'category_id',
        'brand_id',
        'sub_category_id',
        'supplier_id',
        'created_by_id',
        'updated_by_id',
        'cost',
        'description',
        'discount_end',
        'discount_fixed',
        'discount_percent',
        'discount_start',
        'name',
        'price',
        'sku',
        'slug',
        'status',
        'stock',
    ];


    public const STATUS_ACTIVE = 1;
    public const STATUS_INACTIVE = 0;

    public function storeProduct($input, $auth_id){

        return self::create($this->prepareData($input, $auth_id));
    }

    private function prepareData(array $input, int $auth_id){
        return [
            'brand_id' => $input['brand_id'] ?? 0,
            'category_id' => $input['category_id'] ?? 0,
            'sub_category_id' => $input['sub_category_id'] ?? 0,
            'supplier_id' => $input['supplier_id'] ?? 0,
            'created_by_id' => $auth_id,
            'updated_by_id' => $auth_id,
            'cost' => $input['cost'] ?? 0,
            'description' => $input['description'] ?? '',
            'discount_end' => $input['discount_end'] ?? null,
            'discount_fixed' => $input['discount_fixed'] ?? 0,
            'discount_percent' => $input['discount_percent'] ?? 0,
            'discount_start' => $input['discount_start'] ?? null,
            'name' => $input['name'] ?? '',
            'price' => $input['price'] ?? 0,
            'sku' => $input['sku'] ?? '',
            'slug' => $input['slug'] ? Str::slug($input['slug']) : '',
            'status' => $input['status'] ?? 0,
            'stock' => $input['stock'] ?? 0,
        ];
    }

    public function getProductById(int $id){
        return self::query()->with('primary_photo')->findOrFail($id);
    }

    public function getProductList($input){
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with(
            [
                'category:id,name',
                'sub_category:id,name',
                // 'country:id,name',
                'supplier:id,name,phone',
                'created_by:id,name',
                'updated_by:id,name',
                'primary_photo',
                'product_attributes',
                'product_attributes.attributes',
                'product_attributes.attribute_value',
            ]
        );
        if(!empty($input['search'])){
            $query->where('name', 'like', '%'.$input['search'].'%')
            ->orWhere('sku', 'like', '%'.$input['search'].'%');
            // ->orWhere('email', 'like', '%'.$input['search'].'%');
        };
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->paginate($per_page);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }
    public function sub_category(){
        return $this->belongsTo(SubCategory::class, 'sub_category_id');
    }
    public function brand(){
        return $this->belongsTo(Brand::class);
    }
    // public function country(){
    //     return $this->belongsTo(Country::class, 'country_id');
    // }
    public function supplier(){
        return $this->belongsTo(Supplier::class, 'supplier_id');
    }
    public function created_by(){
        return $this->belongsTo(User::class, 'created_by_id');
    }
    public function updated_by(){
        return $this->belongsTo(User::class, 'updated_by_id');
    }
    public function primary_photo(){
        return $this->hasOne(ProductPhoto::class)->where('is_primary', 1);
    }
    public function product_attributes(){
        return $this->hasMany(ProductAttribute::class);
    }

    public function getProductForBarCode($input){
        $query = self::query()->select('id', 'name', 'sku', 'price', 'discount_end', 'discount_fixed', 'discount_percent', 'discount_start');
        if(!empty($input['name'])){
            $query->where('name', 'like', '%'.$input['name'].'%');
        }
        if(!empty($input['category_id'])){
            $query->where('category_id', $input['category_id']);
        }
        if(!empty($input['sub_category_id'])){
            $query->where('sub_category_id', $input['sub_category_id']);
        }
        return $query->get();
    }

    public function getAllProduct($columns = ['*']){
        $products = DB::table('products')->select($columns)->get();
        return collect($products);
    }

    public function photos(){
        return $this->hasMany(ProductPhoto::class)->where('is_primary', 0);
    }
}
