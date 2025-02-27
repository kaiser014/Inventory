<?php

namespace App\Manager;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Customer;
use App\Models\Order;
use App\Models\Product;
use App\Models\SalesManager;
use App\Models\Shop;
use App\Models\SubCategory;
use App\Models\Supplier;
use Carbon\Carbon;
use Illuminate\Support\Collection;

class DashboardManager{

    public int $total_categories = 0;

    public int $total_sub_categories = 0;

    public int $total_brands = 0;

    public int $total_suppliers = 0;

    public int $total_customers = 0;

    public int $total_shops = 0;

    public int $total_sales_managers = 0;

    public int $total_products = 0;

    public int $total_orders = 0;

    // private bool $is_admin = false;
    // private int $sales_admin_id;

    private Collection $categories;
    private Collection $sub_categories;
    private Collection $brands;
    private Collection $suppliers;
    private Collection $customers;
    private Collection $shops;
    private Collection $sales_managers;
    private Collection $products;
    private Collection $orders;

    // function __construct($auth)
    function __construct()
    {
        // if($auth->guard('admin')->check()){
        //     $this->is_admin = true;
        // }
        // $this->sales_admin_id = $auth->user()->id;
        $this->getCategories();
        $this->setTotalCategory();
        $this->getSubCategories();
        $this->setTotalSubCategory();
        $this->getBrands();
        $this->setTotalBrand();
        $this->getSuppliers();
        $this->setTotalSupplier();
        $this->getCustomers();
        $this->setTotalCustomer();
        $this->getShops();
        $this->setTotalShop();
        $this->getSalesManagers();
        $this->setTotalSalesManager();
        $this->getProducts();
        $this->setTotalProduct();
        $this->getOrders();
        $this->setTotalOrder();
    }

    public function getCategories(){
        $this->categories = (new Category())->getAllCategoriesData();
    }

    private function setTotalCategory(){
        $this->total_categories = count($this->categories);
    }

    public function getSubCategories(){
        $this->sub_categories = (new SubCategory())->getAllSubCategoriesData();
    }

    private function setTotalSubCategory(){
        $this->total_sub_categories = count($this->sub_categories);
    }

    public function getBrands(){
        $this->brands = (new Brand())->getAllBrandsData();
    }

    private function setTotalBrand(){
        $this->total_brands = count($this->brands);
    }

    public function getSuppliers(){
        $this->suppliers = (new Supplier())->getAllSuppliersData();
    }

    private function setTotalSupplier(){
        $this->total_suppliers = count($this->suppliers);
    }

    public function getCustomers(){
        $this->customers = (new Customer())->getAllCustomersData();
    }

    private function setTotalCustomer(){
        $this->total_customers = count($this->customers);
    }

    public function getShops(){
        $this->shops = (new Shop())->getAllShopsData();
    }

    private function setTotalShop(){
        $this->total_shops = count($this->shops);
    }

    public function getSalesManagers(){
        $this->sales_managers = (new SalesManager())->getAllSalesManagersData();
    }

    private function setTotalSalesManager(){
        $this->total_sales_managers = count($this->sales_managers);
    }

    public function getProducts(){
        $this->products = (new Product())->getAllProduct();
    }

    private function setTotalProduct(){
        $this->total_products = count($this->products);
    }

    public function getOrders(){
        $this->orders = (new Order())->getAllOrderData();
    }

    private function setTotalOrder(){
        $this->total_orders = count($this->orders);
    }

    // private function getOrders(){
    //     $this->orders = (new Order())->getAllOrdersForReport($this->is_admin, $this->sales_admin_id);
    // }

}