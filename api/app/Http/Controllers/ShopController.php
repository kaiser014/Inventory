<?php

namespace App\Http\Controllers;

use App\Models\Shop;
use App\Models\Address;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Manager\ImageManager;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreShopRequest;
use App\Http\Requests\UpdateShopRequest;
use App\Http\Resources\ShopEditResource;
use App\Http\Resources\ShopListResource;

class ShopController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $shop = (new Shop())->getShopList($request->all());
        return ShopListResource::collection($shop);
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
    public function store(StoreShopRequest $request)
    {
        $shop = (new Shop())->prepareShopData($request->all(), auth());
        $address = (new Address())->prepareAddressData($request->all());
        if($request->has('logo')){
            $name = Str::slug($shop['name'].now());
            $shop['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Shop::LOGO_WIDTH,
                Shop::LOGO_HEIGHT,

                Shop::LOGO_WIDTH_THUMB,
                Shop::LOGO_HEIGHT_THUMB,

                Shop::LOGO_UPLOAD_PATH,
                Shop::LOGO_UPLOAD_PATH_THUMB,
            );
        }
        try {
            DB::beginTransaction();
            $shop = Shop::create($shop);
            $shop->address()->create($address);
            DB::commit();
            return response()->json([
                'message' => 'Shop Added Successfully',
                'cls' => 'success',
            ]);
        } catch (\Throwable $th) {
            if(isset($shop['logo'])){
                ImageManager::deletePhoto(Shop::LOGO_UPLOAD_PATH, $shop['logo']);
                ImageManager::deletePhoto(Shop::LOGO_UPLOAD_PATH_THUMB, $shop['logo']);
            }
            info('SHOP_STORED_FAILED', ['shop' => $shop, 'address' => $address, 'exception'=>$th]);
            DB::rollBack();
            return response()->json([
                'message' => 'Something is going wrong',
                'cls' => 'warning',
                'flag' => true,
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Shop $shop)
    {
        $shop->load('address');
        return new ShopEditResource($shop);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Shop $shop)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateShopRequest $request, Shop $shop)
    {
        $shop_data = (new Shop())->prepareShopData($request->all(), auth());
        $address_data = (new Address())->prepareAddressData($request->all());
        if($request->has('logo')){
            $name = Str::slug($shop_data['name'].now());
            $shop_data['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Shop::LOGO_WIDTH,
                Shop::LOGO_HEIGHT,

                Shop::LOGO_WIDTH_THUMB,
                Shop::LOGO_HEIGHT_THUMB,

                Shop::LOGO_UPLOAD_PATH,
                Shop::LOGO_UPLOAD_PATH_THUMB,
                $shop->logo,
            );
        }
        try {
            DB::beginTransaction();
            $shop_data = $shop->update($shop_data);
            $shop->address()->update($address_data);
            DB::commit();
            return response()->json([
                'message' => 'Shop Updated Successfully',
                'cls' => 'success',
            ]);
        } catch (\Throwable $th) {
            info('SUPPLIER_STORED_FAILED', ['supplier' => $shop_data, 'address' => $address_data, 'exception'=>$th]);
            DB::rollBack();
            return response()->json([
                'message' => 'Something is going wrong',
                'cls' => 'warning',
                'flag' => true,
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Shop $shop)
    {
        if(!empty($shop->logo)){
            ImageManager::deletePhoto(Shop::LOGO_UPLOAD_PATH, $shop['logo']);
            ImageManager::deletePhoto(Shop::LOGO_UPLOAD_PATH_THUMB, $shop['logo']);
        }
        (new Address())->DeleteAddressBySupplierId($shop);
        $shop->delete();
        return response()->json([
            'message' => 'Shop Deleted Successfully',
            'cls' => 'warning',
        ]);
    }

    public function getShopDataList(){
        $shop = (new Shop())->getShopIdAndName();
        return response()->json($shop);
    }

}
