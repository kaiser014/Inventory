import axios from "axios";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Loader from "../../partials/miniComponent/Loader";
import { Link } from "react-router-dom";
import GlobalFunction from "../../../GlobalFunction";
import DataNotFound from "../../partials/miniComponent/DataNotFound";

const OrderList = () => {
  const [input, setInput] = useState({
    order_by: "order_number",
    per_page: 10,
    direction: "asc",
    search: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [orders, setOrders] = useState([]);

  const [order, setOrder] = useState("");

  const getOrders = (pageNumber = 1) => {
    setIsLoading(true);
    axios
      .get(
        `/order?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
      )
      .then((res) => {
        setOrders(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalItemCount(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div>
        <BreadCrumb title={"Order List"} />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            {/* <CardHeader
              title="Order List"
              btn_name="Add Order"
              icon="fa-plus"
              link="/order/create"
            /> */}
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h5>Order List</h5>
                {GlobalFunction.isAdmin() && (
                  <p className="text-danger fw-bold">
                    Admin Cannot Create Order
                  </p>
                )}
                {GlobalFunction.isAdmin() || (
                  <Link className="btn main-btn" to="/order/create">
                    <i className={`fa-solid fa-plus`}></i>Add Order
                  </Link>
                )}
              </div>
            </div>
            <div className="card-body page-card-body">
              <div className="search-area mb-4">
                <div className="row">
                  <div className="col-md-4">
                    <label className="w-100">
                      <p>Search</p>
                      <input
                        className="form-control form-control-sm mt-1"
                        name={"search"}
                        type={"search"}
                        value={input.search}
                        placeholder={"Search..."}
                        onChange={handleSearchInput}
                      />
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label className="w-100">
                      <p>Order By</p>
                      <select
                        className="form-select form-select-sm"
                        name="order_by"
                        value={input.order_by}
                        onChange={handleSearchInput}
                      >
                        <option value={"order_number"}>Order Number</option>
                        <option value={"created_at"}>Created at</option>
                        <option value={"updated_at"}>Updated at</option>
                        {/* <option value={"serial"}>Serial</option>
                        <option value={"status"}>Status</option> */}
                      </select>
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label className="w-100">
                      <p>Order Direction</p>
                      <select
                        className="form-select form-select-sm"
                        name="direction"
                        value={input.direction}
                        onChange={handleSearchInput}
                      >
                        <option value={"asc"}>ASC</option>
                        <option value={"desc"}>DESC</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-md-2">
                    <label className="w-100">
                      <p>Per Page</p>
                      <select
                        className="form-select form-select-sm"
                        name="per_page"
                        value={input.per_page}
                        onChange={handleSearchInput}
                      >
                        <option value={"10"}>10</option>
                        <option value={"25"}>25</option>
                        <option value={"50"}>50</option>
                        <option value={"100"}>100</option>
                      </select>
                    </label>
                  </div>
                  <div className="col-md-2">
                    <div className="d-grid mt-4">
                      <button
                        className="btn btn-success"
                        onClick={() => getOrders(1)}
                      >
                        <i class="fa-solid fa-magnifying-glass"></i> Search
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {isLoading ? (
                <Loader />
              ) : (
                <div className="table-responsive soft-landing">
                  <table className="category-table align-middle table table-hover table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Order Details</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Sales</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(orders).length > 0 ? (
                        orders.map((order, index) => (
                          <tr key={index}>
                            <td className="theme-text">
                              <strong>{startFrom + index}</strong>
                            </td>
                            <td>
                              <small>
                                <p className="theme-text">
                                  Order No:{" "}
                                  <strong>{order.order_number}</strong>
                                </p>
                                <p className="theme-text-second">
                                  Order Status:{" "}
                                  <strong>{order.order_status_string}</strong>
                                </p>
                                <p className="theme-text">
                                  Payment Status:{" "}
                                  <strong>{order.payment_status}</strong>
                                </p>
                              </small>
                            </td>
                            <td>
                              <p className="theme-text">
                                Name:{order.customer_name}
                              </p>
                              <p className="theme-text-second">
                                Phone:{order.customer_phone}
                              </p>
                            </td>
                            {/* <td>{orders.slug}</td> */}
                            <td>
                              <p className="theme-text">
                                Quantity: {order.quantity}
                              </p>
                              <p className="theme-text-second">
                                Sub Total:{" "}
                                {GlobalFunction.formatPrice(order.sub_total)}
                              </p>
                              <p className="theme-text">
                                Discount:{" "}
                                {GlobalFunction.formatPrice(order.discount)}
                              </p>
                              <p className="theme-text-second">
                                Total: {GlobalFunction.formatPrice(order.total)}
                              </p>
                              <p className="theme-text">
                                Due Amount:{" "}
                                {GlobalFunction.formatPrice(order.due_amount)}
                              </p>
                              <p className="theme-text-second">
                                Paid Amount:{" "}
                                {GlobalFunction.formatPrice(order.paid_amount)}
                              </p>
                            </td>
                            <td>
                              <p className="theme-text">Shop: {order.shop}</p>
                              <p className="theme-text-second">
                                Sales Mngr: {order.sales_manager}
                              </p>
                              <p className="theme-text">
                                Created Mngr: {order.sales_manager}
                              </p>
                            </td>
                            <td>
                              <p className="theme-text">{order.created_at}</p>
                              <p className="theme-text-second">
                                {order.updated_at}
                              </p>
                            </td>
                            <td>
                              <Link
                                className="btn info-btn"
                                to={`/order/${order.id}`}
                              >
                                <i class="fa-solid fa-eye"></i>
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <DataNotFound />
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
            <div className="card-footer">
              <nav className="pagination">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemCount}
                  pageRangeDisplayed={5}
                  onChange={getOrders}
                  nextPageText={"Next"}
                  firstPageText={"First"}
                  prevPageText={"Previous"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
