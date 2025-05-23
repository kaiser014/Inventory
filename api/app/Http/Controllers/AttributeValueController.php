<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAttributeValueRequest;
use App\Http\Requests\UpdateAttributeValueRequest;
use App\Models\AttributeValue;

class AttributeValueController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
    public function store(StoreAttributeValueRequest $request)
    {
        $value_data = $request->all();
        $value_data['user_id'] = auth()->id();
        AttributeValue::create($value_data);
        return response()->json([
            'message' => 'Value Created Successfully',
            'cls' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(AttributeValue $attributeValue)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(AttributeValue $attributeValue)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateAttributeValueRequest $request, AttributeValue $value)
    {
        $value_data = $request->all();
        $value->update($value_data);
        return response()->json([
            'message' => 'Value Updated Successfully',
            'cls' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(AttributeValue $value)
    {
        $value->delete();
        return response()->json([
            'message' => 'Attribute Value Deleted Successfully',
            'cls' => 'warning'
        ]);

    }
}
