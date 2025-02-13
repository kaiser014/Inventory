<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Supplier;
use Illuminate\Support\Str;
use App\Manager\ImageManager;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\StoreSupplierRequest;
use App\Http\Requests\UpdateSupplierRequest;
use App\Http\Resources\SupplierEditResource;
use App\Http\Resources\SupplierListResource;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $supplier = (new Supplier())->getSupplierList($request->all());
        return SupplierListResource::collection($supplier);
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
    public function store(StoreSupplierRequest $request)
    {
        // return $request->all();
        $supplier = (new Supplier())->prepareSupplierData($request->all(), auth());
        $address = (new Address())->prepareAddressData($request->all());
        if($request->has('logo')){
            $name = Str::slug($supplier['name'].now());
            $supplier['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Supplier::LOGO_WIDTH,
                Supplier::LOGO_HEIGHT,
                Supplier::LOGO_WIDTH_THUMB,
                Supplier::LOGO_HEIGHT_THUMB,
                Supplier::LOGO_UPLOAD_PATH,
                Supplier::LOGO_UPLOAD_PATH_THUMB,
            );
        }
        try {
            DB::beginTransaction();
            $supplier = Supplier::create($supplier);
            $supplier->address()->create($address);
            DB::commit();
            return response()->json([
                'message' => 'Supplier Created Successfully',
                'cls' => 'success'
            ]);
        }catch (\Throwable $th) {
            if(isset($supplier['logo'])){
                ImageManager::deletePhoto(Supplier::LOGO_UPLOAD_PATH, $supplier['logo']);
                ImageManager::deletePhoto(Supplier::LOGO_UPLOAD_PATH_THUMB, $supplier['logo']);
            }
            info('SUPPLIER_STORED_FAILED', ['supplier' => $supplier, 'address' => $address, 'exception'=>$th]);
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
    public function show(Supplier $supplier)
    {
        $supplier->load('address');
        return new SupplierEditResource($supplier);

    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Supplier $supplier)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSupplierRequest $request, Supplier $supplier)
    {
        $supplier_data = (new Supplier())->prepareSupplierData($request->all(), auth());
        $address_data = (new Address())->prepareAddressData($request->all());
        if($request->has('logo')){
            $name = Str::slug($supplier_data['name'].now());
            $supplier_data['logo'] = ImageManager::processImageUpload(
                $request->input('logo'),
                $name,
                Supplier::LOGO_UPLOAD_PATH,
                Supplier::LOGO_HEIGHT,
                Supplier::LOGO_WIDTH,
                Supplier::LOGO_UPLOAD_PATH_THUMB,
                Supplier::LOGO_HEIGHT_THUMB,
                Supplier::LOGO_WIDTH_THUMB,
                $supplier->logo,
            );
        }
        try {
            DB::beginTransaction();
            $supplier_data = $supplier->update($supplier_data);
            $supplier->address()->update($address_data);
            DB::commit();
            return response()->json([
                'message' => 'Supplier Updated Successfully',
                'cls' => 'success',
            ]);
        } catch (\Throwable $th) {
            info('SUPPLIER_STORED_FAILED', ['supplier' => $supplier_data, 'address' => $address_data, 'exception'=>$th]);
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
    public function destroy(Supplier $supplier)
    {
        if(!empty($supplier->logo)){
            ImageManager::deletePhoto(Supplier::LOGO_UPLOAD_PATH, $supplier['logo']);
            ImageManager::deletePhoto(Supplier::LOGO_UPLOAD_PATH_THUMB, $supplier['logo']);
        }
        (new Address())->DeleteAddressBySupplierId($supplier);
        $supplier->delete();
        return response()->json([
            'message' => 'Supplier Deleted Successfully',
            'cls' => 'warning',
        ]);
    }
    public function getSupplierDataList(){
        $suppliers = (new Supplier())->getSupplierIdAndName();
        return response()->json($suppliers);
    }

}
