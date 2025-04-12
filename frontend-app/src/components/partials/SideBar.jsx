import React from "react";
import { Link } from "react-router-dom";
import GlobalFunction from "../../GlobalFunction";

const SideBar = () => {
  return (
    <div id="layoutSidenav_nav">
      <nav
        className="side_navbar sb-sidenav accordion sidebar"
        id="sidenavAccordion"
      >
        <div className="sb-sidenav-menu">
          <div className="nav">
            <div className="sb-sidenav-menu-heading">Core</div>
            <Link className="nav-link" to={"/dashboard"}>
              <div className="sb-nav-link-icon">
                <i className="fas fa-tachometer-alt"></i>
              </div>
              Dashboard
            </Link>
            {GlobalFunction.isAdmin() && (
              <>
                {/* Management Like Category, Sub Category, Brand, Supplier */}
                <div className="sb-sidenav-menu-heading">Management</div>
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts-category"
                  aria-expanded="false"
                  aria-controls="collapseLayouts-category"
                >
                  <div className="sb-nav-link-icon">
                    <i className="fas fa-columns"></i>
                  </div>
                  Category
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down text-white"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseLayouts-category"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to={"/category/create"}>
                      Add Category
                    </Link>
                    <Link className="nav-link" to={"/category"}>
                      List Category
                    </Link>
                  </nav>
                </div>
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts-subcategory"
                  aria-expanded="false"
                  aria-controls="collapseLayouts-subcategory"
                >
                  <div className="sb-nav-link-icon">
                    <i class="fa-solid fa-table"></i>
                  </div>
                  Sub Category
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down text-white"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseLayouts-subcategory"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to={"/sub-category/create"}>
                      Add Sub Category
                    </Link>
                    <Link className="nav-link" to={"/sub-category"}>
                      List Sub Category
                    </Link>
                  </nav>
                </div>
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts-brand"
                  aria-expanded="false"
                  aria-controls="collapseLayouts-brand"
                >
                  <div className="sb-nav-link-icon">
                    <i class="fa-solid fa-ring"></i>
                  </div>
                  Brand
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down text-white"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseLayouts-brand"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to={"/brand/create"}>
                      Add Brand
                    </Link>
                    <Link className="nav-link" to={"/brand"}>
                      List Brand
                    </Link>
                  </nav>
                </div>
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts-supplier"
                  aria-expanded="false"
                  aria-controls="collapseLayouts-supplier"
                >
                  <div className="sb-nav-link-icon">
                    <i class="fa-solid fa-parachute-box"></i>
                  </div>
                  Supplier
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down text-white"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseLayouts-supplier"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to={"/supplier/create"}>
                      Add Supplier
                    </Link>
                    <Link className="nav-link" to={"/supplier"}>
                      List Supplier
                    </Link>
                  </nav>
                </div>
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts-customer"
                  aria-expanded="false"
                  aria-controls="collapseLayouts-customer"
                >
                  <div className="sb-nav-link-icon">
                    <i class="fa-solid fa-user-tie"></i>
                  </div>
                  Customer
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down text-white"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseLayouts-customer"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to={"/customer/create"}>
                      Add Customer
                    </Link>
                    <Link className="nav-link" to={"/customer"}>
                      List Customer
                    </Link>
                  </nav>
                </div>
                {/* Shop & Sales Manager */}
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts-shop"
                  aria-expanded="false"
                  aria-controls="collapseLayouts-shop"
                >
                  <div className="sb-nav-link-icon">
                    <i class="fa-solid fa-shop"></i>
                  </div>
                  Shops
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down text-white"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseLayouts-shop"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to={"/shop/create"}>
                      Add Shop
                    </Link>
                    <Link className="nav-link" to={"/shop"}>
                      List Shop
                    </Link>
                  </nav>
                </div>
                <Link
                  className="nav-link collapsed"
                  href="#"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseLayouts-sales-manager"
                  aria-expanded="false"
                  aria-controls="collapseLayouts-sales-manager"
                >
                  <div className="sb-nav-link-icon">
                    <i class="fa-solid fa-universal-access"></i>
                  </div>
                  Sales Manager
                  <div className="sb-sidenav-collapse-arrow">
                    <i className="fas fa-angle-down text-white"></i>
                  </div>
                </Link>
                <div
                  className="collapse"
                  id="collapseLayouts-sales-manager"
                  aria-labelledby="headingOne"
                  data-bs-parent="#sidenavAccordion"
                >
                  <nav className="sb-sidenav-menu-nested nav">
                    <Link className="nav-link" to={"/sales-manager/create"}>
                      Add Sales Manager
                    </Link>
                    <Link className="nav-link" to={"/sales-manager"}>
                      List Sales Manager
                    </Link>
                  </nav>
                </div>
              </>
            )}
            {/* Product & Attribute Tab */}
            <div className="sb-sidenav-menu-heading">Product & Attribute</div>
            <Link
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts-product"
              aria-expanded="false"
              aria-controls="collapseLayouts-product"
            >
              <div className="sb-nav-link-icon">
                <i class="fa-solid fa-box"></i>
              </div>
              Product
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down text-white"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapseLayouts-product"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                {GlobalFunction.isAdmin() && (
                  <>
                    <Link className="nav-link" to={"/product/create"}>
                      Add Product
                    </Link>
                  </>
                )}
                <Link className="nav-link" to={"/product"}>
                  List Product
                </Link>
              </nav>
            </div>
            <Link
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts-stock"
              aria-expanded="false"
              aria-controls="collapseLayouts-stock"
            >
              <div className="sb-nav-link-icon">
                <i class="fa-solid fa-box"></i>
              </div>
              Stock
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down text-white"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapseLayouts-stock"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                <Link className="nav-link" to={"/stock/create"}>
                  Add Stock
                </Link>
                <Link className="nav-link" to={"/stock"}>
                  List Stock
                </Link>
              </nav>
            </div>
            {GlobalFunction.isAdmin() && (
              <>
                <Link className="nav-link" to={"/product-attribute"}>
                  <div className="sb-nav-link-icon">
                    <i class="fa-solid fa-boxes-stacked"></i>
                  </div>
                  Product Attribute
                </Link>
              </>
            )}
            <div className="sb-sidenav-menu-heading">Order</div>
            <Link
              className="nav-link collapsed"
              href="#"
              data-bs-toggle="collapse"
              data-bs-target="#collapseLayouts-order"
              aria-expanded="false"
              aria-controls="collapseLayouts-order"
            >
              <div className="sb-nav-link-icon">
                <i class="fa-solid fa-cart-shopping"></i>
              </div>
              Orders
              <div className="sb-sidenav-collapse-arrow">
                <i className="fas fa-angle-down text-white"></i>
              </div>
            </Link>
            <div
              className="collapse"
              id="collapseLayouts-order"
              aria-labelledby="headingOne"
              data-bs-parent="#sidenavAccordion"
            >
              <nav className="sb-sidenav-menu-nested nav">
                {GlobalFunction.isAdmin() || (
                  <Link className="nav-link" to={"/order/create"}>
                    Create Order
                  </Link>
                )}
                <Link className="nav-link" to={"/order"}>
                  Order List
                </Link>
              </nav>
            </div>
            {/* Accessories Like Bar Code */}
            <div className="sb-sidenav-menu-heading">Accessories</div>
            <Link className="nav-link" to={"/generate-bar-code"}>
              <div className="sb-nav-link-icon">
                <i class="fa-solid fa-barcode"></i>
              </div>
              Bar Code
            </Link>
            <div className="sb-sidenav-menu-heading">Reports</div>
            <Link className="nav-link" to={"/report"}>
              <div className="sb-nav-link-icon">
                <i class="fa-solid fa-flag"></i>
              </div>
              Report
            </Link>
          </div>
        </div>
        <div className="sb-sidenav-footer">
          <div className="small">Logged in as:</div>
          Kaiser
        </div>
      </nav>
    </div>
  );
};

export default SideBar;
