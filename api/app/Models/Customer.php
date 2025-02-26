<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'phone', 'email', 'status', 'address', 'user_id'];

    public function storeData($input, $auth){
        $customer = $this->prepareData($input, $auth);
        return self::query()->create($customer);
    }

    private function prepareData($input, $auth){
        return [
            'name' => $input['name'] ?? '',
            'phone' => $input['phone'] ?? '',
            'email' => $input['email'] ?? '',
            'status' => $input['status'] ?? 0,
            'address' => $input['address'] ?? '',
            'user_id' => $auth->id(),
        ];
    }

    public function getAllCustomer($input){
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();

        if(!empty($input['search'])){
            $query->where('name', 'like', '%'.$input['search'].'%');
        }
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        }
        return $query->with('user:id,name')->paginate($per_page);
    }

    public function getCustomerBySearch($search){
        return self::query()
        ->select('id', 'name', 'phone')
        ->where('name', 'like', '%'.$search['search'].'%')
        ->orWhere('phone', 'like', '%'.$search['search'].'%')
        ->take(10)
        ->get();
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
