import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import { useParams } from "react-router-dom";
import axios from "axios";
import GlobalFunction from "../../../GlobalFunction";

const OrderDetails = () => {
  const params = useParams();
  const [order, setOrder] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const getOrderDetails = () => {
    setIsLoading(true);
    axios.get(`order/${params.id}`).then((res) => {
      setOrder(res.data.data);
      setIsLoading(false);
    });
    // axios.get(`order/${params.id}`).then((res) => {
    //   setOrder(res.data.data);
    //   setIsLoading(false);
    // });
  };
  console.log(order);
  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <>
      <div>
        <BreadCrumb title={"Order List"} />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-3">
            <CardHeader
              title="Order Details"
              btn_name="Add Order"
              link="/order/create"
            />
            <div className="card-body">
              <div className="row">
                {/* Customer Details */}
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-header">
                      <h6>Customer Details</h6>
                    </div>
                    <div className="card-body">
                      <table className="table orderdetails-table table-hover mb-0 align-middle table-bordered table-responsive table-striped">
                        <tbody>
                          <tr>
                            <th>Customer Name</th>
                            <td>
                              <p className="theme-text">
                                <strong>{order?.customer?.name}</strong>
                              </p>
                            </td>
                          </tr>
                          <tr>
                            <th>Phone</th>
                            <td>{order?.customer?.phone}</td>
                          </tr>
                          <tr>
                            <th>Email</th>
                            <td>
                              {order?.customer?.email ? (
                                order?.customer?.email
                              ) : (
                                <p>No Email</p>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Shop Details */}
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-header">
                      <h6>Shop & Sales Manager Details</h6>
                    </div>
                    <div className="card-body">
                      <table className="table table-hover orderdetails-table mb-0 table-bordered table-responsive table-striped">
                        <tbody>
                          <tr>
                            <th>Shop Name</th>
                            <td>
                              <img
                                src={order?.shop?.logo}
                                alt="shop logo"
                                className="img-thumbnail details_table-img"
                              />{" "}
                              {order?.shop?.name} - {order?.shop?.phone}
                            </td>
                          </tr>
                          <tr>
                            <th>Sales Manager</th>
                            <td>
                              <img
                                src={order?.sales_manager?.photo}
                                alt="shop logo"
                                className="img-thumbnail details_table-img"
                              />{" "}
                              {order?.sales_manager?.name} -{" "}
                              {order?.sales_manager?.phone
                                ? order?.sales_manager?.phone
                                : "No Number"}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                {/* Customer Details */}
                <div className="col-md-12 mb-3">
                  <div className="card">
                    <div className="card-header">
                      <h6>Order Details</h6>
                    </div>
                    <div className="card-body">
                      <table className="table table-hover orderdetails-table mb-0 align-middle table-bordered table-responsive table-striped">
                        <tbody>
                          <tr>
                            <th>Order Number</th>
                            <td>
                              <p className="theme-text">
                                <strong>{order?.order_number}</strong>
                              </p>
                            </td>
                            <th>Total Item</th>
                            <td>{order?.quantity}</td>
                          </tr>
                          <tr>
                            <th>Order Status</th>
                            <td>{order?.order_status_string}</td>
                            <th>Payment Status</th>
                            <td>{order?.payment_status}</td>
                          </tr>
                          <tr>
                            <th>Payment Method</th>
                            <td>{order?.payment_method?.name}</td>
                            <th>Account Number</th>
                            <td>
                              {order?.payment_status?.account_number
                                ? order?.payment_status?.account_number
                                : "None"}
                            </td>
                          </tr>
                          <tr>
                            <th>Sub Total</th>
                            <td>
                              {GlobalFunction.formatPrice(order?.sub_total)}
                            </td>
                            <th>Discount</th>
                            <td>
                              {GlobalFunction.formatPrice(order?.discount)}
                            </td>
                          </tr>
                          <tr className="text-center bg-primary-subtle">
                            <th colSpan={2}>Total</th>
                            <td colSpan={2}>
                              <strong>
                                {GlobalFunction.formatPrice(order?.total)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <th>Paid Amount</th>
                            <td className="text-success">
                              <strong>
                                {GlobalFunction.formatPrice(order?.paid_amount)}
                              </strong>
                            </td>
                            <th>Due Amount</th>
                            <td className="text-danger">
                              <strong>
                                {GlobalFunction.formatPrice(order?.due_amount)}
                              </strong>
                            </td>
                          </tr>
                          <tr>
                            <th>Order Placed</th>
                            <td>{order?.created_at}</td>
                            <th>Order Updated</th>
                            <td>{order?.updated_at}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Order Item Details */}
              <div className="row mb-3">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h6>Order Item Details</h6>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-sm table-hover orderdetails-table mb-0 table-responsive table-striped">
                        <thead>
                          <tr>
                            <th>SL.</th>
                            <th>Name</th>
                            <th>Info</th>
                            <th>Quantity</th>
                            <th>Photo</th>
                            <th>Amounts</th>
                            <th>Sub Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order?.order_details.map((product, index) => (
                            <tr key={index}>
                              <td>{++index}</td>
                              <td>
                                <p className="theme-text">
                                  <strong>Name: {product?.name}</strong>
                                </p>
                                <p className="theme-text-second">
                                  SKU: {product?.sku}
                                </p>
                                <p>Supplier: {product?.supplier}</p>
                              </td>
                              <td>
                                {product?.brand ? (
                                  <p>Brand: {product?.brand}</p>
                                ) : (
                                  ""
                                )}
                                {/* <p>Brand: {product?.brand}</p> */}
                                <p>Category: {product?.category}</p>
                                <p>Sub Category: {product?.sub_category}</p>
                              </td>
                              <td>{product?.quantity}</td>
                              <td>
                                <img
                                  src={product?.photo}
                                  alt="product img"
                                  className="img-thumbnail details_table-img"
                                />
                              </td>
                              <td>
                                <p>Original Price: {product?.price}</p>
                                <p>
                                  Discount:{" "}
                                  {GlobalFunction.formatPrice(
                                    product?.selling_price?.discount
                                  )}
                                </p>
                                <p>
                                  Sale Price:{" "}
                                  {GlobalFunction.formatPrice(
                                    product?.selling_price?.price
                                  )}
                                </p>
                              </td>
                              <td className="text-end">
                                <p>
                                  {GlobalFunction.formatPrice(
                                    product?.selling_price?.price *
                                      product?.quantity
                                  )}
                                </p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              {/* Transaction Details */}
              <div className="row">
                <div className="col-md-12">
                  <div className="card">
                    <div className="card-header">
                      <h6>Transaction Details</h6>
                    </div>
                    <div className="card-body">
                      <table className="table table-bordered table-sm table-hover orderdetails-table mb-0 table-responsive table-striped">
                        <thead>
                          <tr>
                            <th>SL.</th>
                            <th>Trx ID</th>
                            <th>Paid Amount</th>
                            <th>Customer</th>
                            <th>Payment Method</th>
                            <th>Status</th>
                            <th>Transaction By</th>
                            <th>Created At</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order?.transactions.map((transaction, index) => (
                            <tr key={index}>
                              <td>{++index}</td>
                              <td>
                                <p className="theme-text">
                                  <strong>
                                    {" "}
                                    {transaction?.trx_id
                                      ? transaction?.trx_id
                                      : "Cash Payment No Trx ID"}
                                  </strong>
                                </p>
                              </td>
                              <td>
                                <strong>
                                  <p className="theme-text-second">
                                    {GlobalFunction.formatPrice(
                                      transaction?.amount
                                    )}
                                  </p>
                                </strong>
                              </td>
                              <td>
                                <p className="theme-text">
                                  Name: {transaction?.customer_name}
                                </p>
                                <p className="theme-text-second">
                                  Phone: {transaction?.customer_phone}
                                </p>
                              </td>
                              <td>
                                <p className="theme-text">
                                  Payment: {transaction?.payment_method_name}
                                </p>
                                {transaction?.account_number ? (
                                  <p>Acc No.{transaction?.account_number}</p>
                                ) : (
                                  ""
                                )}
                              </td>
                              <td>
                                <strong>
                                  <p className="theme-text">
                                    Status: {transaction?.status}
                                  </p>
                                </strong>
                                <strong>
                                  <p className="theme-text-second">
                                    Type: {transaction?.transaction_type}
                                  </p>
                                </strong>
                              </td>
                              <td>
                                <p className="theme-text">
                                  {transaction?.transaction_by}
                                </p>
                              </td>
                              <td>
                                <p>{transaction?.created_at}</p>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
