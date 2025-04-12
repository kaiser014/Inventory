<?php

namespace App\Models;

use App\Manager\OrderManager;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Facades\DB;

class Order extends Model
{
    use HasFactory;

    protected $guarded = [];

    public const STATUS_PENDING = 1;

    public const STATUS_PROCESSED = 2;

    public const STATUS_COMPLETED = 3;

    public const SHIPMENT_STATUS_COMPLETED = 1;

    public const SHOP_ID = 1;

    public const PAYMENT_STATUS_PAID = 1;

    public const PAYMENT_STATUS_PARTIALLY_PAID = 3;

    public const PAYMENT_STATUS_UNPAID = 2;

    public function placeorder(array $input, $auth){
        $order_data = $this->prepareData($input, $auth);
        if(isset($order_data['error_description'])){
            return $order_data;
        }
        $order = self::query()->create($order_data['order_data']);
        $order_details = (new OrderDetail())->storeOrderDetails($order_data['order_details_data'], $order);
        (new Transaction())->storeTransaction($input, $order, $auth);
        return $order;
    }

    private function prepareData(array $input, $auth){
        $price = OrderManager::handle_order_data($input);
        if(isset($price['error_description'])){
            return $price;
        }else{
            $order_data = [
                'customer_id' => $input['order_summary']['customer_id'],
                'sales_manager_id' => $auth->id,
                'shop_id' =>  self::SHOP_ID,
                'sub_total' => $price['sub_total'],
                'discount' => $price['discount'],
                'total' => $price['total'],
                'quantity' => $price['quantity'],
                'paid_amount' => $input['order_summary']['paid_amount'],
                'due_amount' => $input['order_summary']['due_amount'],
                'order_status' => self::STATUS_COMPLETED,
                'order_number' => OrderManager::generateOrderNumber(self::SHOP_ID),
                'payment_method_id'=> $input['order_summary']['payment_method_id'],
                'payment_status' => OrderManager::decidePaymentStatus($price['total'], $input['order_summary']['paid_amount']),
                'shipment_status' => self::SHIPMENT_STATUS_COMPLETED,
            ];
            return [
                'order_data' => $order_data,
                'order_details_data' => $price['order_details']
            ];
        }
    }
    public function getAllOrders($input, $auth){
        $is_admin = $auth->guard('admin')->check();
        $per_page = $input['per_page'] ?? 10;
        $query = self::query();
        $query->with([
            'customer:id,name,phone',
            'payment_method:id,name',
            'sales_manager:id,name',
            'shop:id,name',
        ]);
        if(!$is_admin){
            $query->where('shop_id', $auth->user()->shop_id);
        };
        if(!empty($input['search'])){
            $query->where('order_number', 'like', '%'.$input['search'].'%');
        };
        if(!empty($input['order_by'])){
            $query->orderBy($input['order_by'], $input['direction'] ?? 'asc');
        };
        return $query->paginate(10);
    }

    public function customer(){
        return $this->belongsTo(Customer::class);
    }

    public function payment_method(){
        return $this->belongsTo(PaymentMethod::class);
    }
    public function sales_manager(){
        return $this->belongsTo(SalesManager::class);
    }
    public function shop(){
        return $this->belongsTo(Shop::class);
    }

    public function order_details(){
        return $this->hasMany(OrderDetail::class);
    }

    public function transactions(){
        return $this->hasMany(Transaction::class);
    }

    public function getAllOrdersForReport($is_admin, $sales_admin_id, $columns = ['*']){
        $query = DB::table('orders')->select($columns);
        if(!$is_admin){
            $query->where('sales_manager_id', $sales_admin_id);
        }
        $orders = $query->get();
        return collect($orders);
    }

    public function getAllOrderData($columns = ['*']){
        $orders = DB::table('orders')->select($columns)->get();
        return collect($orders);
    }

}
