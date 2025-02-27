<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Shop extends Model
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

    public const LOGO_UPLOAD_PATH = 'images/uploads/shop/';
    public const LOGO_UPLOAD_PATH_THUMB = 'images/uploads/shop_thumb/';

    public function prepareShopData(array $input, $auth){
        $shop['details'] = $input['details'] ?? '';
        $shop['email'] = $input['email'] ?? '';
        $shop['name'] = $input['name'] ?? '';
        $shop['phone'] = $input['phone'] ?? '';
        $shop['status'] = $input['status'] ?? '';
        $shop['user_id'] = $auth->id();

        return $shop;
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');

    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function getShopList($input){
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

    public function getShopIdAndName(){
        return self::query()->select('id','name')->where('status', self::STATUS_ACTIVE)->get();
    }
    public function getShopsData(){
        return self::query()->select('id as value','name as label')->where('status', self::STATUS_ACTIVE)->get();
    }

    public function getShopDetailsById($id){
        return self::query()->with(
            'address',
            'address.division:id,name',
            'address.district:id,name',
            'address.area:id,name',
        )->findOrFail($id);
    }

    public function getAllShopsData($columns = ['*']){
        $shops = DB::table('shops')->select($columns)->get();
        return collect($shops);
    }

}