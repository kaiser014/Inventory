<?php

namespace App\Http\Controllers;

use App\Manager\DashboardManager;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(){
        $dashboardManager = new DashboardManager();
        // dd($reportManager->total_purchase);
        $dashboard = [
            'total_categories' => $dashboardManager->total_categories,
            'total_sub_categories' => $dashboardManager->total_sub_categories,
            'total_brands' => $dashboardManager->total_brands,
            'total_suppliers' => $dashboardManager->total_suppliers,
            'total_customers' => $dashboardManager->total_customers,
            'total_shops' => $dashboardManager->total_shops,
            'total_sales_managers' => $dashboardManager->total_sales_managers,
            'total_products' => $dashboardManager->total_products,
            'total_orders' => $dashboardManager->total_orders,
        ];
        return response()->json($dashboard);
      }
}
