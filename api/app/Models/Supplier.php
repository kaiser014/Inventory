<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Supplier extends Model
{
    use HasFactory;

    protected $fillable = ['details', 'email', 'logo', 'name', 'phone', 'status', 'user_id'];

    public const STATUS_ACTIVE = 1;
    public const STATUS_ACTIVE_TEXT = "Active";
    public const STATUS_INACTIVE = 0;
    public const STATUS_INACTIVE_TEXT = "Inactive";

    public const LOGO_WIDTH = 800;
    public const LOGO_HEIGHT = 800;

    public const LOGO_WIDTH_THUMB = 200;
    public const LOGO_HEIGHT_THUMB = 200;

    public const LOGO_UPLOAD_PATH = 'images/uploads/supplier/';
    public const LOGO_UPLOAD_PATH_THUMB = 'images/uploads/supplier_thumb/';

    public function prepareSupplierData($input, $auth){
        $supplier['details'] = $input['details'] ?? '';
        $supplier['email'] = $input['email'] ?? '';
        $supplier['name'] = $input['name'] ?? '';
        $supplier['phone'] = $input['phone'] ?? '';
        $supplier['status'] = $input['status'] ?? '';
        $supplier['user_id'] = $auth->id();

        return $supplier;
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function getSupplierList($input){
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with(
            'address',
            'address.division:id,name',
            'address.district:id,name',
            'address.area:id,name',
            'user:id,name',
        );
        if(!empty($input['search'])){
            $query->where('name', 'like', '%'.$input['search'].'%')
            ->orWhere('phone', 'like', '%'.$input['search'].'%')
            ->orWhere('email', 'like', '%'.$input['search'].'%');
        };
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->paginate($per_page);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getSupplierIdAndName(){
        return self::query()->select('id','name', 'phone')->where('status', self::STATUS_ACTIVE)->get();
    }

    public function getAllSuppliersData($columns = ['*']){
        $suppliers = DB::table('suppliers')->select($columns)->get();
        return collect($suppliers);
    }
}
