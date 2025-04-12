<?php
namespace App\Manager;

use App\Models\Product;

class StockManager{
    public static function handle_stock_data(array $input){
        $product_id = $input['product_id'];
        $updated_stock_amount = 0;
        $product = (new Product())->getProductById($product_id);
        if($input['stock'] != null){
            $product_data['stock'] = $product->stock + $input['stock'];
            $product->update($product_data);

            $updated_stock_amount = $product->stock;
        }else{
            info('PRODUCT_STOCK_FAILED', ['data' => $input['stock']]);
            return [
                'error_description' => $product->name.' Product Stock Not Updated'
            ];
        }
        return [
            'updated_stock_amount' => $updated_stock_amount
        ];
    }
    public static function handle_update_stock_data($product_id, $update_stock){
        $product = (new Product())->getProductById($product_id);
        if($update_stock != null){
            $product_data['stock'] = $update_stock;
            $product->update($product_data);

            $updated_stock_amount = $product->stock;
        }else{
            info('PRODUCT_STOCK_FAILED', ['data' => $update_stock]);
            return [
                'error_description' => $product->name.' Product Stock Not Updated'
            ];
        }
        return [
            'updated_stock_amount' => $updated_stock_amount
        ];
    }

}