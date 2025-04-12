import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../components/modules/Dashboard";
import PrivateRoute from "./PrivateRoutes";
import AddCategory from "../components/modules/category/AddCategory";
import ListCategory from "../components/modules/category/ListCategory";
import Login from "../components/modules/auth/Login";
import Register from "../components/modules/auth/Register";
import AddSubCategory from "../components/modules/subCategory/AddSubCategory";
import ListSubCategory from "../components/modules/subCategory/ListSubCategory";
import EditCategory from "../components/modules/category/EditCategory";
import EditSubCategory from "../components/modules/subCategory/EditSubCategory";
import AddBrand from "../components/modules/brand/AddBrand";
import ListBrand from "../components/modules/brand/ListBrand";
import EditBrand from "../components/modules/brand/EditBrand";
import AddSupplier from "../components/modules/supplier/AddSupplier";
import ListSupplier from "../components/modules/supplier/ListSupplier";
import EditSupplier from "../components/modules/supplier/EditSupplier";
import ProductAttribute from "../components/modules/productAttribute/ProductAttribute";
import AddShop from "../components/modules/shop/AddShop";
import ListShop from "../components/modules/shop/ListShop";
import EditShop from "../components/modules/shop/EditShop";
import AddProduct from "../components/modules/product/AddProduct";
import ListProduct from "../components/modules/product/ListProduct";
import AddProductPhoto from "../components/modules/product/product_photo/AddProductPhoto";
import AddSalesManager from "../components/modules/salesManager/AddSalesManager";
import ListSalesManager from "../components/modules/salesManager/ListSalesManager";
import CreateOrder from "../components/modules/order/CreateOrder";
import OrderList from "../components/modules/order/OrderList";
import OrderDetails from "../components/modules/order/OrderDetails";
import BarCode from "../components/modules/bar_code/BarCode";
import Report from "../components/modules/report/Report";
import ProductDetails from "../components/modules/product/ProductDetails";
import AddCustomer from "../components/modules/customer/AddCustomer";
import ListCustomer from "../components/modules/customer/ListCustomer";
import EditCustomer from "../components/modules/customer/EditCustomer";
import EditSalesManager from "../components/modules/salesManager/EditSalesManager";
import EditProduct from "../components/modules/product/EditProduct";
import AddStock from "../components/modules/product_stock/AddStock";
import StockList from "../components/modules/product_stock/StockList";
import EditStock from "../components/modules/product_stock/EditStock";
import InvoicePaper from "../components/partials/modals/InvoicePaper";
// import EditProductPhoto from "../components/modules/product/product_photo/EditProductPhoto";

const PublicRoutes = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Category */}
            <Route path="/category/create" element={<AddCategory />} />
            <Route path="/category" element={<ListCategory />} />
            <Route path="/category/edit/:id" element={<EditCategory />} />
            {/* Sub Category */}
            <Route path="/sub-category/create" element={<AddSubCategory />} />
            <Route path="/sub-category" element={<ListSubCategory />} />
            <Route
              path="/sub-category/edit/:id"
              element={<EditSubCategory />}
            />
            {/* Brand */}
            <Route path="/brand/create" element={<AddBrand />} />
            <Route path="/brand" element={<ListBrand />} />
            <Route path="/brand/edit/:id" element={<EditBrand />} />
            {/* Supplier */}
            <Route path="/supplier/create" element={<AddSupplier />} />
            <Route path="/supplier" element={<ListSupplier />} />
            <Route path="/supplier/edit/:id" element={<EditSupplier />} />
            {/* Customer */}
            <Route path="/customer/create" element={<AddCustomer />} />
            <Route path="/customer" element={<ListCustomer />} />
            <Route path="/customer/edit/:id" element={<EditCustomer />} />
            {/* Shop */}
            <Route path="/shop/create" element={<AddShop />} />
            <Route path="/shop" element={<ListShop />} />
            <Route path="/shop/edit/:id" element={<EditShop />} />
            {/* Product */}
            <Route path="/product/create" element={<AddProduct />} />
            <Route path="/product" element={<ListProduct />} />
            <Route path="/product/photo/:id" element={<AddProductPhoto />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/product/edit/:id" element={<EditProduct />} />
            {/* Product Attribute */}
            <Route path="/product-attribute" element={<ProductAttribute />} />
            {/* Product Stock */}
            <Route path="/stock/create" element={<AddStock />} />
            <Route path="/stock" element={<StockList />} />
            <Route path="/stock/edit/:id" element={<EditStock />} />
            {/* Sales Manager */}
            <Route path="/sales-manager/create" element={<AddSalesManager />} />
            <Route path="/sales-manager" element={<ListSalesManager />} />
            <Route
              path="/sales-manager/edit/:id"
              element={<EditSalesManager />}
            />
            {/* Orders */}
            <Route path="/order/create" element={<CreateOrder />} />
            <Route path="/order" element={<OrderList />} />
            <Route path="/order/:id" element={<OrderDetails />} />
            <Route path="/invoice/:id" element={<InvoicePaper />} />
            {/* BarCode */}
            <Route path="/generate-bar-code" element={<BarCode />} />
            {/* Report */}
            <Route path="/report" element={<Report />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default PublicRoutes;
