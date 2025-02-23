<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCustomerRequest;
use App\Http\Requests\UpdateCustomerRequest;
use App\Http\Resources\CustomerEditResource;
use App\Http\Resources\CustomerListResource;
use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $customers = (new Customer())->getAllCustomer($request->all());
        return CustomerListResource::collection($customers);
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
    public function store(StoreCustomerRequest $request)
    {
        $customer = (new Customer())->storeData($request->all(), auth());
        return response()->json([
            'message' => 'Customer Added Successfully',
            'cls' => 'success'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Customer $customer)
    {
        return new CustomerEditResource($customer);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Customer $customer)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCustomerRequest $request, Customer $customer)
    {
        $customer_data = $request->all();
        $customer->update($customer_data);
        return response()->json([
        'message' => 'Customer Updated Successfully',
        'cls' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return response()->json([
            'message' => 'Customer Deleted Successfully',
            'cls' => 'warning'
        ]);
    }
    public function getCustomerBySearch(Request $request){
        $customers = (new Customer())->getCustomerBySearch($request->all());
        return response()->json($customers);
    }
}
