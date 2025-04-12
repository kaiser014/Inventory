<?php

namespace App\Models;

use App\Manager\StockManager;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Stock extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function storeStockData($input, $product_name, $product_stock, $update_stock, $auth){
        return self::create($this->prepareData($input, $product_name, $product_stock, $update_stock, $auth));
    }

    public function prepareData($input, $product_name, $product_stock, $update_stock, $auth){
        $stock = StockManager::handle_stock_data($input);
        if(isset($stock['error_description'])){
            return $stock;
        }
        else{
            return [
                'product_id' => $input['product_id'] ?? 0,
                'product_name' => $product_name ?? '',
                'existing_stock' => $product_stock ?? 0,
                'new_stock' => $input['stock'] ?? 0,
                'updated_stock' => $update_stock ?? 0,
                'user_id' => $auth->id(),
            ];
        }
    }

    public function getStockList($input){
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();

        if(!empty($input['search'])){
            $query->where('product_name', 'like', '%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->with([
            'user:id,name',
            'product:id,name,sku',
            ])->paginate($per_page);
    }

    public function getProductStockData($id){
        return self::query()->where('id', '=', $id)->first()->existing_stock;
    }

    public function updateStockData($product_id, $update_stock){
        $stock = StockManager::handle_update_stock_data($product_id, $update_stock);
    }
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function product(){
        return $this->belongsTo(Product::class);
    }
}
