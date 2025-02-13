<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone'];

    public function store($input){
        $customer = $this->prepareData($input);
        return self::query()->create($customer);
    }

    private function prepareData($input){
        return [
            'name' => $input['name'] ?? '',
            'email' => $input['email'] ?? '',
            'phone' => $input['phone'] ?? '',
        ];
    }

    public function getCustomerBySearch($search){
        return self::query()
        ->select('id', 'name', 'phone')
        ->where('name', 'like', '%'.$search['search'].'%')
        ->orWhere('phone', 'like', '%'.$search['search'].'%')
        ->take(10)
        ->get();
    }
}
