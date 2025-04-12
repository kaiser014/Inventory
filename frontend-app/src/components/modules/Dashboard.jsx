import React, { useEffect, useState } from "react";
import BreadCrumb from "../partials/BreadCrumb";
import { Link } from "react-router-dom";
import GlobalFunction from "../../GlobalFunction";
import axios from "axios";

const Dashboard = () => {
  const [allCountData, setAllCountData] = useState([]);

  const getAllCountData = () => {
    axios.get(`get-dashboard-data`).then((res) => {
      setAllCountData(res.data);
    });
  };
  useEffect(() => {
    getAllCountData();
  }, []);
  return (
    <>
      <BreadCrumb title={"Dashboard"} />
      <div className="row">
        {/* {GlobalFunction.isAdmin() && (
          <>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-card-transparent mb-4">
                <div className="card-body">
                  <div className="d-flex fw-bold align-items-center justify-content-between">
                    <h6>Total Categories</h6>
                    <div className="dashboard-count-data">
                      <p>{allCountData.total_categories}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                  <Link
                    className="small text-white stretched-link"
                    to={"/category"}
                  >
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-card-transparent mb-4">
                <div className="card-body">
                  <div className="d-flex fw-bold align-items-center justify-content-between">
                    <h6>Total Sub Categories</h6>
                    <div className="dashboard-count-data">
                      <p>{allCountData.total_sub_categories}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                  <Link
                    className="small text-white stretched-link"
                    to={"/sub-category"}
                  >
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-card-transparent mb-4">
                <div className="card-body">
                  <div className="d-flex fw-bold align-items-center justify-content-between">
                    <h6>Total Brands</h6>
                    <div className="dashboard-count-data">
                      <p>{allCountData.total_brands}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                  <Link
                    className="small text-white stretched-link"
                    to={"/brand"}
                  >
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-card-transparent mb-4">
                <div className="card-body">
                  <div className="d-flex fw-bold align-items-center justify-content-between">
                    <h6>Total Suppliers</h6>
                    <div className="dashboard-count-data">
                      <p>{allCountData.total_suppliers}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                  <Link
                    className="small text-white stretched-link"
                    to={"/supplier"}
                  >
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-card-transparent mb-4">
                <div className="card-body">
                  <div className="d-flex fw-bold align-items-center justify-content-between">
                    <h6>Total Customers</h6>
                    <div className="dashboard-count-data">
                      <p>{allCountData.total_customers}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                  <Link
                    className="small text-white stretched-link"
                    to={"/customer"}
                  >
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-card-transparent mb-4">
                <div className="card-body">
                  <div className="d-flex fw-bold align-items-center justify-content-between">
                    <h6>Total Shops</h6>
                    <div className="dashboard-count-data ">
                      <p>{allCountData.total_shops}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                  <Link
                    className="small text-white stretched-link"
                    to={"/shop"}
                  >
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-card-transparent mb-4">
                <div className="card-body">
                  <div className="d-flex fw-bold align-items-center justify-content-between">
                    <h6>Total Products</h6>
                    <div className="dashboard-count-data ">
                      <p>{allCountData.total_products}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                  <Link
                    className="small text-white stretched-link"
                    to={"/product"}
                  >
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-md-6">
              <div className="card bg-card-transparent mb-4">
                <div className="card-body">
                  <div className="d-flex fw-bold align-items-center justify-content-between">
                    <h6>Total Orders</h6>
                    <div className="dashboard-count-data ">
                      <p>{allCountData.total_orders}</p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                  <Link
                    className="small text-white stretched-link"
                    to={"/order"}
                  >
                    View Details
                  </Link>
                  <div className="small text-white">
                    <i className="fas fa-angle-right"></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        )} */}
        <>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-card-transparent mb-4">
              <div className="card-body">
                <div className="d-flex fw-bold align-items-center justify-content-between">
                  <h6>Total Categories</h6>
                  <div className="dashboard-count-data">
                    <p>{allCountData.total_categories}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to={"/category"}
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-card-transparent mb-4">
              <div className="card-body">
                <div className="d-flex fw-bold align-items-center justify-content-between">
                  <h6>Total Sub Categories</h6>
                  <div className="dashboard-count-data">
                    <p>{allCountData.total_sub_categories}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to={"/sub-category"}
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-card-transparent mb-4">
              <div className="card-body">
                <div className="d-flex fw-bold align-items-center justify-content-between">
                  <h6>Total Brands</h6>
                  <div className="dashboard-count-data">
                    <p>{allCountData.total_brands}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link" to={"/brand"}>
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-card-transparent mb-4">
              <div className="card-body">
                <div className="d-flex fw-bold align-items-center justify-content-between">
                  <h6>Total Suppliers</h6>
                  <div className="dashboard-count-data">
                    <p>{allCountData.total_suppliers}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to={"/supplier"}
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-card-transparent mb-4">
              <div className="card-body">
                <div className="d-flex fw-bold align-items-center justify-content-between">
                  <h6>Total Customers</h6>
                  <div className="dashboard-count-data">
                    <p>{allCountData.total_customers}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to={"/customer"}
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-card-transparent mb-4">
              <div className="card-body">
                <div className="d-flex fw-bold align-items-center justify-content-between">
                  <h6>Total Shops</h6>
                  <div className="dashboard-count-data ">
                    <p>{allCountData.total_shops}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link" to={"/shop"}>
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-card-transparent mb-4">
              <div className="card-body">
                <div className="d-flex fw-bold align-items-center justify-content-between">
                  <h6>Total Products</h6>
                  <div className="dashboard-count-data ">
                    <p>{allCountData.total_products}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                <Link
                  className="small text-white stretched-link"
                  to={"/product"}
                >
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-md-6">
            <div className="card bg-card-transparent mb-4">
              <div className="card-body">
                <div className="d-flex fw-bold align-items-center justify-content-between">
                  <h6>Total Orders</h6>
                  <div className="dashboard-count-data ">
                    <p>{allCountData.total_orders}</p>
                  </div>
                </div>
              </div>
              <div className="card-footer bg-card d-flex align-items-center justify-content-between">
                <Link className="small text-white stretched-link" to={"/order"}>
                  View Details
                </Link>
                <div className="small text-white">
                  <i className="fas fa-angle-right"></i>
                </div>
              </div>
            </div>
          </div>
        </>
        <div className="col-xl-3 col-md-6">
          <div className="card bg-card-transparent mb-4">
            <div className="card-body">
              <div className="d-flex fw-bold align-items-center justify-content-between">
                <h6>Total Sales Managers</h6>
                <div className="dashboard-count-data">
                  <p>{allCountData.total_sales_managers}</p>
                </div>
              </div>
            </div>
            <div className="card-footer bg-card d-flex align-items-center justify-content-between">
              <Link
                className="small text-white stretched-link"
                to={"/sales-manager"}
              >
                View Details
              </Link>
              <div className="small text-white">
                <i className="fas fa-angle-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
