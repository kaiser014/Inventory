import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import ShowOrderConfirmation from "../../partials/modals/ShowOrderConfirmation";
import AddCustomer from "../../partials/modals/AddCustomer";
import { Link, useNavigate } from "react-router-dom";
// import useScanDetection from "use-scan-detection";
import InvoicePaper from "../../partials/modals/InvoicePaper";
import GlobalFunction from "../../../GlobalFunction";

const CreateOrder = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({
    order_by: "id",
    per_page: 10,
    direction: "desc",
    search: "",
  });
  const [customerInput, setCustomerInput] = useState("");
  const [customers, setCustomers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [products, setProducts] = useState([]);
  const [carts, setCarts] = useState({});

  // const [modalShow, setModalShow] = useState(false);
  const [orderConfirmationModalShow, setOrderConfirmationModalShow] =
    useState(false);

  const [paymentMethods, setPaymentMethods] = useState([]);

  const [orderSummary, setOrderSummary] = useState({
    total_items: 0,
    amount: 0,
    discount: 0,
    payable_amount: 0,
    customer: "",
    customer_id: 0,
    paid_amount: 0,
    due_amount: 0,
    payment_method_id: 1,
    trx_id: "",
  });

  const [order, setOrder] = useState({});

  // BarCode Scan Machine Code Start

  // const [barCode, setBarCode] = useState("");

  // useScanDetection({
  //   onComplete: setBarCode,
  //   minLength: 2,
  // });

  // useEffect(() => {
  //   console.log(barCode);
  //   setInput((prevState) => ({
  //     ...prevState,
  //     search: barCode,
  //   }));
  // }, [barCode]);

  // useEffect(() => {
  //   getProducts(1);
  // }, [input.search]);

  // BarCode Scan Machine Code End

  const getPaymentMethods = () => {
    axios.get(`/get-payment-methods`).then((res) => {
      setPaymentMethods(res.data);
    });
  };

  const getProducts = (pageNumber = 1) => {
    setIsLoading(true);
    axios
      .get(
        `/product?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
      )
      .then((res) => {
        setProducts(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalItemCount(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      });
  };
  const handleSearchInput = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCustomerSearch = (e) => {
    setCustomerInput(e.target.value);
  };
  const getCustomers = () => {
    setIsLoading(true);
    axios.get(`get-customer-list?&search=${customerInput}`).then((res) => {
      setCustomers(res.data);
      setIsLoading(false);
    });
  };

  // Real Time Search
  // useEffect(() => {
  //   getCustomers();
  // }, [customerInput]);

  const selectCustomer = (customer) => {
    setOrder((prevState) => ({ ...prevState, customer_id: customer.id }));
    setOrderSummary((prevState) => ({
      ...prevState,
      customer: customer.name + " - " + customer.phone,
    }));
    setOrderSummary((prevState) => ({
      ...prevState,
      customer_id: customer.id,
    }));
  };

  const handleCart = (id) => {
    products.map((product, index) => {
      if (product.id === id) {
        if (carts[id] === undefined) {
          setCarts((prevState) => ({ ...prevState, [id]: product }));
          setCarts((prevState) => ({
            ...prevState,
            [id]: {
              ...prevState[id],
              quantity: 1,
            },
          }));
        } else {
          if (carts[id].stock > carts[id].quantity) {
            setCarts((prevState) => ({
              ...prevState,
              [id]: {
                ...prevState[id],
                quantity: carts[id].quantity + 1,
              },
            }));
          }
        }
      }
    });
  };
  const handleCartItemRemove = (id) => {
    setCarts((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });
  };

  const handleDecrease = (id) => {
    if (carts[id].quantity > 1) {
      setCarts((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          quantity: carts[id].quantity - 1,
        },
      }));
    }
  };
  const handleIncrease = (id) => {
    if (carts[id].stock > carts[id].quantity) {
      setCarts((prevState) => ({
        ...prevState,
        [id]: {
          ...prevState[id],
          quantity: carts[id].quantity + 1,
        },
      }));
    }
  };
  const calculateOrderSummary = () => {
    let total_items = 0;
    let amount = 0;
    let discount = 0;
    let payable_amount = 0;
    let paid_amount = 0;

    Object.keys(carts).map((key) => {
      amount += carts[key].original_price * carts[key].quantity;
      discount += carts[key].selling_price.discount * carts[key].quantity;
      payable_amount += carts[key].selling_price.price * carts[key].quantity;
      total_items += carts[key].quantity;
    });

    setOrderSummary((prevState) => ({
      ...prevState,
      total_items: total_items,
      amount: amount,
      discount: discount,
      payable_amount: payable_amount,
      paid_amount: payable_amount,
    }));
  };

  const handleOrderSummaryInput = (e) => {
    if (
      e.target.name === "paid_amount" &&
      orderSummary.payable_amount >= e.target.value
    ) {
      setOrderSummary((prevState) => ({
        ...prevState,
        paid_amount: e.target.value,
        due_amount: orderSummary.payable_amount - e.target.value,
      }));
    } else if (e.target.name === "payment_method_id") {
      setOrderSummary((prevState) => ({
        ...prevState,
        payment_method_id: e.target.value,
      }));
      if (e.target.value === 1) {
        setOrderSummary((prevState) => ({
          ...prevState,
          trx_id: "",
        }));
      }
    } else if (e.target.name === "trx_id") {
      setOrderSummary((prevState) => ({
        ...prevState,
        trx_id: e.target.value,
      }));
    }
  };

  const handleOrderPlace = () => {
    setIsLoading(true);
    axios
      .post(`/order`, { carts: carts, order_summary: orderSummary })
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.message,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
        if (res.data.flag != undefined) {
          setOrderConfirmationModalShow(false);
          navigate(`/order/${res.data.order_id}`);
        }
        setIsLoading(false);
      });
    // navigate("/order");
  };

  useEffect(() => {
    getProducts();
    getPaymentMethods();
  }, []);

  useEffect(() => {
    calculateOrderSummary();
  }, [carts]);

  return (
    <>
      <BreadCrumb title={"Create Order"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Create Order"
              btn_name="Order List"
              icon="fa-list"
              link="/Order"
            />
            <div className="card-body">
              <div className="row">
                <div className="col-md-4">
                  <div className="card my-2">
                    <div className="card-header">
                      <h5>Product List</h5>
                    </div>
                    <div className="card-body">
                      <div className="product-search-area mb-3">
                        <p>Product Search</p>
                        <div className="input-group">
                          <input
                            className="form-control"
                            name={"search"}
                            type={"search"}
                            value={input.search}
                            placeholder={"Search..."}
                            onChange={handleSearchInput}
                          />
                          <button
                            onClick={getProducts}
                            className="input-group-text"
                          >
                            <i class="fa-solid fa-search"></i>
                          </button>
                        </div>
                      </div>
                      {products.map((product, index) => (
                        <div
                          key={index}
                          class="d-flex align-items-center py-1 position-relative"
                        >
                          <div className="details-area">
                            <button className="btn btn-sm ms-1 btn-primary">
                              <i class="fa-solid fa-eye"></i>
                            </button>
                            <button
                              onClick={() => handleCart(product.id)}
                              className="btn btn-sm ms-1 btn-success"
                            >
                              <i class="fa-solid fa-plus"></i>
                            </button>
                          </div>
                          <div class="flex-shrink-0">
                            <img
                              src={product.primary_photo}
                              alt={product.name}
                              className="img-thumbnail oder-product-image"
                            />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <p className="text-theme">
                              <strong>{product.name}</strong>
                            </p>
                            <p className="">
                              <small>Original Price: {product.price}</small>
                            </p>
                            <p className="text-theme">
                              <small>
                                Price: {product.selling_price.price}
                                {product.selling_price.symbol} | Discount:{" "}
                                {product.selling_price.discount}
                              </small>
                            </p>
                            <p className="">
                              <small>
                                SKU: {product.sku} | Stock: {product.stock}
                              </small>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card my-2">
                    <div className="card-header">
                      <h5>Cart</h5>
                    </div>
                    <div className="card-body">
                      <div>
                        <div className="order-summary">
                          <div className="row">
                            <div className="col-12">
                              <h6 className="bg-theme p-3 mb-2 rounded">
                                Customer:{" "}
                                <small>
                                  <strong className="text-white">
                                    {orderSummary.customer}
                                  </strong>
                                </small>
                              </h6>
                            </div>
                            <div className="col-6">
                              <p>Total Item : {orderSummary.total_items}</p>
                            </div>
                            <div className="col-6">
                              <p>Amount : {orderSummary.amount}</p>
                            </div>
                            <div className="col-6">
                              <p>Discount : -{orderSummary.discount}</p>
                            </div>
                            <div className="col-6">
                              <p>Net Payable : {orderSummary.payable_amount}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      {Object.keys(carts).map((key) => (
                        <div
                          key={key}
                          class="d-flex align-items-center py-1 position-relative"
                        >
                          <div className="details-area">
                            <button
                              onClick={() => handleCartItemRemove(key)}
                              className="btn btn-sm ms-1 btn-danger"
                            >
                              <i class="fa-solid fa-trash"></i>
                            </button>
                          </div>
                          <div class="flex-shrink-0">
                            <img
                              src={carts[key].primary_photo}
                              alt={carts[key].name}
                              className="img-thumbnail oder-product-image"
                            />
                          </div>
                          <div class="flex-grow-1 ms-3">
                            <p className="text-theme">
                              <strong>{carts[key].name}</strong>
                            </p>
                            <p className="">
                              <small>Original Price: {carts[key].price}</small>
                            </p>
                            <p className="text-theme">
                              <small>
                                Price: {carts[key].selling_price.price}
                                {carts[key].selling_price.symbol} | Discount:{" "}
                                {carts[key].selling_price.discount}
                              </small>
                            </p>
                            <p className="">
                              <small>SKU: {carts[key].sku}</small>
                            </p>
                            <p>
                              Quantity:
                              <button
                                onClick={() => handleDecrease(carts[key].id)}
                                className="quantity-button"
                                disabled={carts[key].quantity <= 1}
                              >
                                -
                              </button>
                              <span>{carts[key].quantity}</span>
                              <button
                                onClick={() => handleIncrease(carts[key].id)}
                                className="quantity-button"
                                disabled={
                                  carts[key].quantity >= carts[key].stock
                                }
                              >
                                +
                              </button>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card my-2">
                    <div className="card-header">
                      <div className="d-flex align-items-center justify-content-between">
                        <h5>Customer List</h5>
                        {/* <button
                          onClick={() => setModalShow(true)}
                          className="btn btn-sm main-btn ms-1"
                        >
                          <i class="fa-solid fa-plus"></i> Add
                        </button> */}
                        {GlobalFunction.isAdmin() && (
                          <Link
                            className="btn btn-sm main-btn ms-1"
                            to={"/customer/create"}
                          >
                            <i class="fa-solid fa-plus"></i> Add
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="product-search-area mb-3">
                        <p>Customer Search</p>
                        <div className="input-group">
                          <input
                            className="form-control"
                            name={"search"}
                            type={"search"}
                            value={customerInput}
                            placeholder={"Search..."}
                            onChange={handleCustomerSearch}
                          />
                          <button
                            onClick={getCustomers}
                            className="input-group-text"
                          >
                            <i class="fa-solid fa-search"></i>
                          </button>
                        </div>
                      </div>
                      <ul className="customer-list">
                        {customers.map((customer, index) => (
                          <li
                            className={
                              orderSummary.customer_id === customer.id
                                ? "active-color"
                                : ""
                            }
                            onClick={() => selectCustomer(customer)}
                            key={index}
                          >
                            {customer.name} - {customer.phone}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="d-grid">
                    <button
                      onClick={() => setOrderConfirmationModalShow(true)}
                      disabled={
                        orderSummary.items === 0 ||
                        orderSummary.customer_id === 0
                      }
                      className="btn main-btn"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AddCustomer show={modalShow} onHide={() => setModalShow(false)} /> */}
      <ShowOrderConfirmation
        show={orderConfirmationModalShow}
        onHide={() => setOrderConfirmationModalShow(false)}
        order_Summary={orderSummary}
        carts_data={carts}
        is_Loading={isLoading}
        handle_OrderPlace={handleOrderPlace}
        handle_OrderSummaryInput={handleOrderSummaryInput}
        payment_Methods={paymentMethods}
      />
    </>
  );
};

export default CreateOrder;
