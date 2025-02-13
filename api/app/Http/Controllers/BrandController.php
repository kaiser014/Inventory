<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use Illuminate\Support\Str;
use App\Manager\ImageManager;
use App\Http\Requests\StoreBrandRequest;
use App\Http\Requests\UpdateBrandRequest;
use App\Http\Resources\BrandEditResource;
use App\Http\Resources\BrandListResource;
use Illuminate\Http\Request;

class BrandController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $brands = (new Brand())->getBrandList($request->all());
        return BrandListResource::collection($brands);
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
    public function store(StoreBrandRequest $request)
    {
        $brand = $request->except('logo');
        $brand['slug'] = Str::slug($request->input('slug'));
        $brand['user_id'] = auth()->id();
        if($request->has('logo')){
            $name = Str::slug($brand['name'].now());
            $brand['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Brand::LOGO_WIDTH,
                Brand::LOGO_HEIGHT,

                Brand::LOGO_WIDTH_THUMB,
                Brand::LOGO_HEIGHT_THUMB,

                Brand::LOGO_UPLOAD_PATH,
                Brand::LOGO_UPLOAD_PATH_THUMB,
            );
        }
        (new Brand())->storeBrandData($brand);
        return response()->json([
            'message' => 'Brand Added Successfully',
            'cls' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Brand $brand)
    {
        return new BrandEditResource($brand);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Brand $brand)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBrandRequest $request, Brand $brand)
    {
        $brand_data = $request->except('logo');
        $brand_data['slug'] = Str::slug($request->input('slug'));
        if($request->has('logo')){
            $name = Str::slug($brand_data['name'].now());
            $brand_data['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Brand::LOGO_WIDTH,
                Brand::LOGO_HEIGHT,

                Brand::LOGO_WIDTH_THUMB,
                Brand::LOGO_HEIGHT_THUMB,

                Brand::LOGO_UPLOAD_PATH,
                Brand::LOGO_UPLOAD_PATH_THUMB,
                $brand->logo,
            );
        }
        $brand->update($brand_data);
        return response()->json([
            'message' => 'Brand Updated Successfully',
            'cls' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Brand $brand)
    {
        if(!empty($brand->logo)){
            ImageManager::deletePhoto(Brand::LOGO_UPLOAD_PATH, $brand->logo);
            ImageManager::deletePhoto(Brand::LOGO_UPLOAD_PATH_THUMB, $brand->logo);
        }
        $brand->delete();
        return response()->json([
            'message' => 'Brand Deleted Successfully',
            'cls' => 'warning'
        ]);
    }

    public function getBrandDataList(){
        $brands = (new Brand())->getBrandName();
        return response()->json($brands);
    }
}
