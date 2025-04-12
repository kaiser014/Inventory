<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStockRequest;
use App\Http\Requests\UpdateStockRequest;
use App\Http\Resources\StockEditResource;
use App\Http\Resources\StockListResource;
use App\Models\Product;
use App\Models\Stock;
use Illuminate\Http\Request;

class StockController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $stocks = (new Stock())->getStockList($request->all());
        return StockListResource::collection($stocks);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStockRequest $request)
    {
        // return $request->all();
        $product_id = $request->product_id;
        $product = (new Product())->getStockData($product_id);
        $product_name = $product->name;
        $product_stock = $product->stock;
        $update_stock = $product_stock + $request->stock;
        (new Stock())->storeStockData($request->all(), $product_name, $product_stock, $update_stock, auth());
        return response()->json([
            'message' => 'Add Product Stock Successfully',
            'cls' => 'success',
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(Stock $stock)
    {
        return new StockEditResource($stock);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Stock $stock)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStockRequest $request, Stock $stock)
    {
        // return $request->all();
        $product_id = $request->product_id;
        $existing_stock = (new Stock())->getProductStockData($request->id);
        $stock_data['new_stock'] = $request->stock;
        $stock_data['existing_stock'] = $existing_stock;
        $stock_data['updated_stock'] = $existing_stock + $request->stock;
        $main_stock = (new Stock())->updateStockData($product_id, $stock_data['updated_stock']);
        $stock->update($stock_data);

        return response()->json([
            'message' => 'Update Product Stock Successfully',
            'cls' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stock $stock)
    {
        //
    }
}
