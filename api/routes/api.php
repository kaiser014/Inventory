<?php

use Illuminate\Http\Request;
use App\Manager\ScriptManager;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AreaController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ShopController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\DivisionController;
use App\Http\Controllers\SupplierController;
use App\Http\Controllers\AttributeController;
use App\Http\Controllers\SubCategoryController;
use App\Http\Controllers\ProductPhotoController;
use App\Http\Controllers\SalesManagerController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\AttributeValueController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\StockController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Test API
// Route::get('addressDataTest', [ScriptManager::class, 'getLocationData']);


Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);

Route::get('divisions', [DivisionController::class, 'index']);
Route::get('districts/{division_id}', [DistrictController::class, 'index']);
Route::get('areas/{district_id}', [AreaController::class, 'index']);

Route::middleware(['auth:sanctum', 'auth:admin'])->group(function (){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::apiResource('category', CategoryController::class);
    Route::apiResource('sub-category', SubCategoryController::class);
    Route::apiResource('brand', BrandController::class);
    Route::get('get-brand-list', [BrandController::class, 'getBrandDataList']);
    Route::apiResource('supplier', SupplierController::class);
    Route::get('get-supplier-list', [SupplierController::class, 'getSupplierDataList']);
    Route::apiResource('attribute', AttributeController::class);
    Route::apiResource('value', AttributeValueController::class);
    Route::get('get-attribute-list', [AttributeController::class, 'getAttributesList']);
    Route::apiResource('shop', ShopController::class);
    Route::get('get-shop-list', [ShopController::class, 'getShopDataList']);
    Route::apiResource('product', ProductController::class);
    Route::post('product-photo-upload/{id}', [ProductPhotoController::class, 'store']);
    Route::apiResource('sales-manager', SalesManagerController::class);
});

Route::middleware(['auth:admin,sales_manager'])->group(function (){
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('get-category-list', [CategoryController::class, 'getCategoryList']);
    Route::get('get-sub-category-list/{category_id}', [SubCategoryController::class, 'getSubCategoryList']);
    Route::apiResource('product', ProductController::class)->only('index');
    Route::get('get-product-columns', [ProductController::class, 'getProductColumns']);
    Route::apiResource('order', OrderController::class);
    Route::apiResource('customer', CustomerController::class);
    Route::get('get-customer-list', [CustomerController::class, 'getCustomerBySearch']);
    Route::get('get-payment-methods', [PaymentMethodController::class, 'index']);
    Route::get('product-list-for-bar-code', [ProductController::class, 'productListForBarCode']);
    Route::get('get-reports', [ReportController::class, 'index']);
    Route::get('get-dashboard-data', [DashboardController::class, 'index']);
    Route::get('get-add-product-data', [ProductController::class, 'getAddProductData']);
    Route::get('product-details/{id}', [ProductController::class, 'getProductDetails']);
    Route::get('all-products', [ProductController::class, 'getAllProducts']);
    Route::apiResource('stock', StockController::class);
});


Route::middleware(['auth:sales_manager'])->group(function (){
    // Route::apiResource('sales-manager', SalesManagerController::class);
});