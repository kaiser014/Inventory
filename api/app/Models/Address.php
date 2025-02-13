<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    use HasFactory;

    protected $fillable = ['address', 'addressable_id', 'addressable_type', 'area_id', 'district_id', 'division_id', 'status', 'type', 'landmark'];

    public const SUPPLIER_ADDRESS = 1;

    public const CUSTOMER_PERMANANT_ADDRESS = 2;

    public const CUSTOMER_PRESENT_ADDRESS = 3;



    public function prepareAddressData(array $input){
        $address['address'] = $input['address'] ?? '';
        $address['area_id'] = $input['area_id'] ?? '';
        $address['district_id'] = $input['district_id'] ?? '';
        $address['division_id'] = $input['division_id'] ?? '';
        $address['landmark'] = $input['landmark'] ?? '';
        $address['status'] = $input['status'] ?? '';
        $address['type'] = self::SUPPLIER_ADDRESS;

        return $address;
    }
    public function addressable(){
        return $this->morphTo();
    }
    public function division(){
        return $this->belongsTo(Division::class);
    }
    public function district(){
        return $this->belongsTo(District::class);
    }
    public function area(){
        return $this->belongsTo(Area::class);
    }
    public function DeleteAddressBySupplierId($supplier){
        return $supplier->address()->delete();
    }
}
