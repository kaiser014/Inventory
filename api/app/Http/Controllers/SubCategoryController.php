<?php

namespace App\Http\Controllers;

use App\Models\SubCategory;
use Illuminate\Support\Str;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use App\Http\Resources\SubCategoryEditResource;
use App\Http\Resources\SubCategoryListResource;
use Illuminate\Http\Request;

class SubCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $sub_categories = (new SubCategory())->getAllSubCategories($request->all());
        return SubCategoryListResource::collection($sub_categories);
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
    public function store(StoreSubCategoryRequest $request)
    {
        // return $request->all();
        $sub_categories = $request->all();
        $sub_categories['slug'] = Str::slug($request->input('slug'));
        $sub_categories['user_id'] = auth()->id();
        (new SubCategory())->storeSubCategory($sub_categories);
        return response()->json([
            'message' => 'Sub Category Added Successfully',
            'cls' => 'success',
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(SubCategory $subCategory)
    {
        return new SubCategoryEditResource($subCategory);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(SubCategory $subCategory)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubCategoryRequest $request, SubCategory $subCategory)
    {
        $sub_category_data = $request->all();
        $sub_category_data['slug'] = Str::slug($request->input('slug'));
        $subCategory->update($sub_category_data);
        return response()->json([
        'message' => 'Sub Category Updated Successfully',
        'cls' => 'success',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SubCategory $subCategory)
    {
        $subCategory->delete();
        return response()->json([
            'message' => 'Sub Category Deleted Successfully',
            'cls' => 'warning'
        ]);
    }

    public function getSubCategoryList($category_id){
        $sub_categories = (new SubCategory())->getSubCategoryIdAndName($category_id);
        return response()->json($sub_categories);
    }
}
