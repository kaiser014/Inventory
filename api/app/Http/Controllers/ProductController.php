<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Brand;
use App\Models\Product;
use App\Models\Category;
use App\Models\Supplier;
use App\Models\Attribute;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use App\Manager\ImageManager;
use App\Models\ProductAttribute;
use Illuminate\Support\Facades\DB;
use App\Models\ProductSpecification;
use Illuminate\Support\Facades\Schema;
use App\Http\Requests\StoreProductRequest;
use App\Http\Requests\UpdateProductRequest;
use App\Http\Resources\AllProductListResource;
use App\Http\Resources\ProductDestroyPhotoListResource;
use App\Http\Resources\ProductEditResource;
use App\Http\Resources\ProductListResource;
use App\Http\Resources\ProductDetailsResource;
use App\Http\Resources\ProductListForBarCodeResource;
use App\Models\ProductPhoto;
use Symfony\Component\Console\Output\ConsoleOutput;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products = (new Product())->getProductList($request);
        return ProductListResource::collection($products);
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
    public function store(StoreProductRequest $request)
    {
        try {
            DB::beginTransaction();
            $product = (new Product())->storeProduct($request->all(), auth()->id());

            if($request->has('attributes')){
                (new ProductAttribute())->storeAttributeData($request->input('attributes'), $product);
            }
            if($request->has('specifications')){
                (new ProductSpecification())->storeSpecificationData($request->input('specifications'), $product);
            }
            DB::commit();

            return response()->json([
                'message' => 'Product Saved Successfully',
                'cls' => 'success',
                'product_id' => $product->id,
            ]);

        } catch (\Throwable $th) {
            info('PRODUCT_SAVE_FAILED', ['data' => $request->all(), 'error' => $th->getMessage()]);
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'cls' => 'warning',
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Product $product)
    {
        $product->load([
            'product_attributes',
            'product_attributes.attributes',
            'product_attributes.attribute_value',
            'product_specifications',
    ]);
        return new ProductEditResource($product);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Product $product)
    {
    //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductRequest $request, Product $product)
    {
        // return $request->all();
        try {
            DB::beginTransaction();
            $product_data = (new Product())->updateProduct($request->all(), auth()->id());
            $product_data_id = $request->id;

            // if($request->has('attributes')){
            //     (new ProductAttribute())->storeAttributeData($request->input('attributes'), $product);
            // }
            // if($request->has('specifications')){
            //     (new ProductSpecification())->storeSpecificationData($request->input('specifications'), $product);
            // }
            $product = $product->update($product_data);
            DB::commit();

            return response()->json([
                'message' => 'Product Updated Successfully',
                'cls' => 'success',
                'product_id' => $product_data_id,
            ]);

        } catch (\Throwable $th) {
            info('PRODUCT_SAVE_FAILED', ['data' => $request->all(), 'error' => $th->getMessage()]);
            DB::rollBack();
            return response()->json([
                'message' => $th->getMessage(),
                'cls' => 'warning',
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Product $product)
    {
        $id = $product->id;
        $photos = DB::table('product_photos')->where('product_id', '=', $id)->get();
        foreach($photos as $product_photo){
            if(!empty($product_photo->photo)){
                ImageManager::deletePhoto(ProductPhoto::PHOTO_UPLOAD_PATH, $product_photo->photo);
                ImageManager::deletePhoto(ProductPhoto::PHOTO_UPLOAD_PATH_THUMB, $product_photo->photo);
            }
        }
        $product->delete();
        return response()->json([
            'message' => 'Product Deleted Successfully',
            'cls' => 'warning',
        ]);
    }

    public function productListForBarCode(Request $request){
        $products = (new Product())->getProductForBarCode($request->all());
        return ProductListForBarCodeResource::collection($products);
    }

    public function getProductColumns(){
        $columns = Schema::getColumnListing('products');
        $formatted_column = [];
        foreach($columns as $column){
            $formatted_column[] = [
                'id' => $column,
                'name' => ucfirst(str_replace('_',' ',$column)),
            ];
        }
        return response()->json($formatted_column);
    }

    public function getAddProductData(){
        return response()-> json([
            'categories' =>  (new Category())->getCategoryIdAndName(),
            'brands' => (new Brand())->getBrandName(),
            'suppliers' => (new Supplier())->getSupplierIdAndName(),
            'attributes' => (new Attribute())->getAttributeListWithValue(),
            'sub_categories' => (new SubCategory())->getSubCategoryIdAndName(),
            // 'shops' => (new Shop())->getShopsData(),
        ]);
    }

    public function getProductDetails($id){
        // $product->load([
        //     'category:id,name',
        //     'sub_category:id,name',
        //     'brand:id,name',
        //     'photos:id,photo,product_id',
        //     'supplier:id,name,phone',
        //     'created_by:id,name',
        //     'updated_by:id,name',
        //     'primary_photo',
        //     'product_attributes',
        //     'product_attributes.attributes',
        //     'product_attributes.attribute_value',
        // ]);
        // return new ProductDetailsResource($product);
        $product = (new Product())->getProductDetailsById($id);
        // $product->load('attributes');
        return new ProductDetailsResource($product);
    }
    public function getAllProducts(){
        $products = (new Product())->getProductAllList();
        return AllProductListResource::collection($products);
    }
}
