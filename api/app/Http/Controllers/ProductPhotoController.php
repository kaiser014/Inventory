<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Str;
use App\Models\ProductPhoto;
use App\Manager\ImageManager;
use Illuminate\Support\Carbon;
use App\Http\Requests\StoreProductPhotoRequest;
use App\Http\Requests\UpdateProductPhotoRequest;

class ProductPhotoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreProductPhotoRequest $request, int $id)
    {
        if($request->has('photos')){
            $product = (new Product())->getProductById($id);
            if($product){
                foreach($request->photos as $photo){
                    $name = Str::slug($product->slug . '-' . Carbon::now()->toDayDateTimeString().'-'.random_int(10000,99999));
                    $photo_data['product_id'] = $id;
                    $photo_data['is_primary'] = $photo['is_primary'];
                    $photo_data['photo'] = ImageManager::processImageUpload(
                        $photo['photo'],
                        $name,
                        ProductPhoto::PHOTO_WIDTH,
                        ProductPhoto::PHOTO_HEIGHT,

                        ProductPhoto::PHOTO_WIDTH_THUMB,
                        ProductPhoto::PHOTO_HEIGHT_THUMB,

                        ProductPhoto::PHOTO_UPLOAD_PATH,
                        ProductPhoto::PHOTO_UPLOAD_PATH_THUMB,
                    );
                    (new ProductPhoto())->storeProductPhoto($photo_data);
                }
            }
        }
        return response()->json([
            'message' => 'Product Photo Added Successfully',
            'cls' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(ProductPhoto $productPhoto)
    {
        // $productPhoto->load('product_photo');
        // return $productPhoto;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(ProductPhoto $productPhoto)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProductPhotoRequest $request, ProductPhoto $productPhoto, int $id)
    {
        if($request->has('photos')){
            $product = (new Product())->getProductById($id);
            if($product){
                foreach($request->photos as $photo){
                    $name = Str::slug($product->slug . '-' . Carbon::now()->toDayDateTimeString().'-'.random_int(10000,99999));
                    $photo_data['product_id'] = $id;
                    $photo_data['is_primary'] = $photo['is_primary'];
                    $photo_data['photo'] = ImageManager::processImageUpload(
                        $photo['photo'],
                        $name,
                        ProductPhoto::PHOTO_WIDTH,
                        ProductPhoto::PHOTO_HEIGHT,

                        ProductPhoto::PHOTO_WIDTH_THUMB,
                        ProductPhoto::PHOTO_HEIGHT_THUMB,

                        ProductPhoto::PHOTO_UPLOAD_PATH,
                        ProductPhoto::PHOTO_UPLOAD_PATH_THUMB,
                    );
                    $productPhoto = $productPhoto->update($photo_data);
                }
            }
        }
        return response()->json([
            'message' => 'Product Photo Update Successfully',
            'cls' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(ProductPhoto $productPhoto)
    {
        //
    }
}
