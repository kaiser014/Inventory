<?php

namespace App\Models;

use Laravel\Sanctum\HasApiTokens;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SalesManager extends Model
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'bio',
        'email',
        'photo',
        'name',
        'phone',
        'status',
        'user_id',
        'shop_id',
        'password',
        'nid_photo',
        'nid',
    ];

    public const STATUS_ACTIVE = 1;
    public const STATUS_ACTIVE_TEXT = "Active";
    public const STATUS_INACTIVE = 0;
    public const STATUS_INACTIVE_TEXT = "Inactive";

    public const IMAGE_WIDTH = 800;
    public const IMAGE_HEIGHT = 800;

    public const IMAGE_WIDTH_THUMB = 200;
    public const IMAGE_HEIGHT_THUMB = 200;

    public const IMAGE_UPLOAD_PATH = 'images/uploads/sales_manager/';
    public const IMAGE_UPLOAD_PATH_THUMB = 'images/uploads/sales_manager_thumb/';


    public function prepareSalesManagerData(array $input, $auth){
        $sales_manager['bio'] = $input['bio'] ?? null;
        $sales_manager['email'] = $input['email'] ?? null;
        $sales_manager['name'] = $input['name'] ?? null;
        $sales_manager['phone'] = $input['phone'] ?? null;
        $sales_manager['status'] = $input['status'] ?? 0;
        $sales_manager['user_id'] = $auth->id();
        $sales_manager['shop_id'] = $input['shop_id'] ?? null;
        $sales_manager['nid'] = $input['nid'] ?? null;
        $sales_manager['password'] = Hash::make($input['password']);

        return $sales_manager;
    }
    public function prepareSalesManagerUpdateData(array $input, $auth){
        $sales_manager['bio'] = $input['bio'] ?? null;
        $sales_manager['email'] = $input['email'] ?? null;
        $sales_manager['name'] = $input['name'] ?? null;
        $sales_manager['phone'] = $input['phone'] ?? null;
        $sales_manager['status'] = $input['status'] ?? 0;
        $sales_manager['user_id'] = $auth->id();
        $sales_manager['shop_id'] = $input['shop_id'] ?? null;
        $sales_manager['nid'] = $input['nid'] ?? null;

        return $sales_manager;
    }

    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');

    }
    public function getSalesManagerList($input){
        $per_page = $input['per_page'] ?? 10;
        $query = self::query()->with(
            'address',
            'address.division:id,name',
            'address.district:id,name',
            'address.area:id,name',
            'user:id,name',
            'shop:id,name',
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
    public function shop(){
        return $this->belongsTo(Shop::class);
    }

    public function getUserByEmail($input){
        return self::query()->where('email', '=', $input['email'])->first();
    }

    public function transaction()
    {
        return $this->morphOne(Transaction::class, 'transactionable');

    }

    protected $hidden = [
        'password',
        'remember_token',
    ];
}
