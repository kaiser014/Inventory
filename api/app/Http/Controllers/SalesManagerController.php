<?php

namespace App\Http\Controllers;

use App\Models\Address;
use Illuminate\Support\Str;
use App\Models\SalesManager;
use Illuminate\Http\Request;
use App\Manager\ImageManager;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreSalesManagerRequest;
use App\Http\Requests\UpdateSalesManagerRequest;
use App\Http\Resources\SalesManagerEditResource;
use App\Http\Resources\SalesManagerListResource;

class SalesManagerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sales_manager = (new SalesManager())->getSalesManagerList($request->all());
        return SalesManagerListResource::collection($sales_manager);
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
    public function store(StoreSalesManagerRequest $request)
    {
        $sales_manager = (new SalesManager())->prepareSalesManagerData($request->all(), auth());
        $address = (new Address())->prepareAddressData($request->all());
        if($request->has('photo')){
            $name = Str::slug($sales_manager['name'].now(). '-photo');
            $sales_manager['photo'] = ImageManager::processImageUpload(
                $request->input('photo'),
                $name,
                SalesManager::IMAGE_WIDTH,
                SalesManager::IMAGE_HEIGHT,

                SalesManager::IMAGE_WIDTH_THUMB,
                SalesManager::IMAGE_HEIGHT_THUMB,

                SalesManager::IMAGE_UPLOAD_PATH,
                SalesManager::IMAGE_UPLOAD_PATH_THUMB
            );
        }
            if($request->has('nid_photo')){
                $name = Str::slug($sales_manager['name'].now(). '-nid_photo');
                $sales_manager['nid_photo'] = ImageManager::processImageUpload(
                $request->input('nid_photo'),
                $name,
                SalesManager::IMAGE_WIDTH,
                SalesManager::IMAGE_HEIGHT,

                SalesManager::IMAGE_WIDTH_THUMB,
                SalesManager::IMAGE_HEIGHT_THUMB,

                SalesManager::IMAGE_UPLOAD_PATH,
                SalesManager::IMAGE_UPLOAD_PATH_THUMB
            );
        }
        try {
            DB::beginTransaction();
            $sales_manager = SalesManager::create($sales_manager);
            $sales_manager->address()->create($address);
            DB::commit();
            return response()->json([
                'message' => 'Sales Manager Added Successfully',
                'cls' => 'success',
            ]);
        } catch (\Throwable $th) {
            if(isset($sales_manager['photo'])){
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH, $sales_manager['photo']);
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH_THUMB, $sales_manager['photo']);
            }
            if(isset($sales_manager['nid_photo'])){
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH, $sales_manager['nid_photo']);
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH_THUMB, $sales_manager['nid_photo']);
            }
            info('SALES_MANAGER_STORED_FAILED', ['sales_manager' => $sales_manager, 'address' => $address, 'exception'=>$th]);
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
    public function show(SalesManager $salesManager)
    {
        $salesManager->load('address');
        return new SalesManagerEditResource($salesManager);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SalesManager $salesManager)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSalesManagerRequest $request, SalesManager $salesManager)
    {
        //
        $sales_manager_data = (new SalesManager())->prepareSalesManagerUpdateData($request->all(), auth());
        $address_data = (new Address())->prepareAddressData($request->all());
        if($request->has('photo')){
            $name = Str::slug($sales_manager_data['name'].now(). '-photo');
            $sales_manager_data['photo'] = ImageManager::processImageUpload(
                $request->input('photo'),
                $name,
                SalesManager::IMAGE_WIDTH,
                SalesManager::IMAGE_HEIGHT,

                SalesManager::IMAGE_WIDTH_THUMB,
                SalesManager::IMAGE_HEIGHT_THUMB,

                SalesManager::IMAGE_UPLOAD_PATH,
                SalesManager::IMAGE_UPLOAD_PATH_THUMB
            );
        }
            if($request->has('nid_photo')){
                $name = Str::slug($sales_manager_data['name'].now(). '-nid_photo');
                $sales_manager_data['nid_photo'] = ImageManager::processImageUpload(
                $request->input('nid_photo'),
                $name,
                SalesManager::IMAGE_WIDTH,
                SalesManager::IMAGE_HEIGHT,

                SalesManager::IMAGE_WIDTH_THUMB,
                SalesManager::IMAGE_HEIGHT_THUMB,

                SalesManager::IMAGE_UPLOAD_PATH,
                SalesManager::IMAGE_UPLOAD_PATH_THUMB
            );
        }
        try {
            DB::beginTransaction();
            $sales_manager_data = $salesManager->update($sales_manager_data);
            $salesManager->address()->update($address_data);
            DB::commit();
            return response()->json([
                'message' => 'Sales Manager Update Successfully',
                'cls' => 'success',
            ]);
        } catch (\Throwable $th) {
            if(isset($sales_manager['photo'])){
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH, $sales_manager_data['photo']);
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH_THUMB, $sales_manager_data['photo']);
            }
            if(isset($sales_manager['nid_photo'])){
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH, $sales_manager_data['nid_photo']);
                ImageManager::deletePhoto(SalesManager::IMAGE_UPLOAD_PATH_THUMB, $sales_manager_data['nid_photo']);
            }
            info('SALES_MANAGER_STORED_FAILED', ['sales_manager' => $sales_manager_data, 'address' => $address_data, 'exception'=>$th]);
            DB::rollBack();
            return response()->json([
                'message' => 'Something is going wrong',
                'cls' => 'warning',
                'flag' => true,
            ]);
        }







        // $shop_data = (new Shop())->prepareShopData($request->all(), auth());
        // $address_data = (new Address())->prepareAddressData($request->all());
        // if($request->has('logo')){
        //     $name = Str::slug($shop_data['name'].now());
        //     $shop_data['logo'] = ImageManager::processImageUpload(
        //         $request->input('logo'),
        //         $name,
        //         Shop::LOGO_WIDTH,
        //         Shop::LOGO_HEIGHT,

        //         Shop::LOGO_WIDTH_THUMB,
        //         Shop::LOGO_HEIGHT_THUMB,

        //         Shop::LOGO_UPLOAD_PATH,
        //         Shop::LOGO_UPLOAD_PATH_THUMB,
        //         $shop->logo,
        //     );
        // }
        // try {
        //     DB::beginTransaction();
        //     $shop_data = $shop->update($shop_data);
        //     $shop->address()->update($address_data);
        //     DB::commit();
        //     return response()->json([
        //         'message' => 'Shop Updated Successfully',
        //         'cls' => 'success',
        //     ]);
        // } catch (\Throwable $th) {
        //     info('SUPPLIER_STORED_FAILED', ['supplier' => $shop_data, 'address' => $address_data, 'exception'=>$th]);
        //     DB::rollBack();
        //     return response()->json([
        //         'message' => 'Something is going wrong',
        //         'cls' => 'warning',
        //         'flag' => true,
        //     ]);
        // }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SalesManager $salesManager)
    {
        //
    }
}
// Sales Manager - Akib
// email - mdakemon@gmail.com
// Password Abcd321@