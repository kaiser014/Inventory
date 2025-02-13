import React from "react";
import Modal from "react-bootstrap/Modal";
import Moment from "react-moment";

const ShowOrderConfirmation = (props) => {
  return (
    <>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Order Details Confirmation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="order-details-confirmation">
            <div className="row px-2">
              <div className="col-md-6">
                <h4>LOGO</h4>
                <p>
                  <strong>Rampura Branch</strong>
                </p>
                <address>Rampura Dhaka-1219, Phone-01745206790</address>
              </div>
              <div className="col-md-6 text-end">
                <h4>Order Details</h4>
                <div className="invoice-date">
                  <p>
                    <strong>
                      <Moment format="DD MMM, YYYY"></Moment>
                    </strong>
                  </p>
                </div>
                <div className="customer-details">
                  <h5>Customer Details</h5>
                  <p>
                    Name:
                    <span>{props.order_Summary.customer.split("-")[0]}</span>
                  </p>
                  <p>
                    Phone:
                    <span>{props.order_Summary.customer.split("-")[1]}</span>
                  </p>
                </div>
              </div>
              <div className="col-md-12">
                <table className="table table-sm table-hover table-bordered table-striped mt-4">
                  <thead>
                    <tr>
                      <th>SL.</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Unit Price</th>
                      <th>Sub Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(props.carts_data).map((key, index) => (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{props.carts_data[key].name}</td>
                        <td>{props.carts_data[key].quantity}</td>
                        <td>{props.carts_data[key].price}</td>
                        <td className="text-end">
                          {new Intl.NumberFormat().format(
                            props.carts_data[key].original_price *
                              props.carts_data[key].quantity
                          )}
                          ৳
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={4} className="text-end">
                        Sub Total
                      </td>
                      <td className="text-end">
                        {new Intl.NumberFormat().format(
                          props.order_Summary.amount
                        )}
                        ৳
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={4} className="text-end">
                        Discount
                      </td>
                      <td className="text-end">
                        -
                        {new Intl.NumberFormat().format(
                          props.order_Summary.discount
                        )}
                        ৳
                      </td>
                    </tr>
                    <tr>
                      <th colSpan={4} className="text-end align-middle">
                        Total
                      </th>
                      <th className="text-end align-middle">
                        {new Intl.NumberFormat().format(
                          props.order_Summary.payable_amount
                        )}
                        ৳
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={4} className="text-end align-middle">
                        Paid Amount
                      </th>
                      <th className="text-end text-theme align-middle">
                        <div className="input-group">
                          <input
                            className="form-control text-end form-control-sm"
                            type="number"
                            name="paid_amount"
                            value={props.order_Summary.paid_amount}
                            placeholder="Amount"
                            onChange={props.handle_OrderSummaryInput}
                            style={{ width: "35px" }}
                          />
                          <div className="input-group-text">৳</div>
                        </div>
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={4} className="text-end align-middle">
                        Due Amount
                      </th>
                      <th className="text-end align-middle">
                        {new Intl.NumberFormat().format(
                          props.order_Summary.due_amount
                        )}
                        ৳
                      </th>
                    </tr>
                    <tr>
                      <th colSpan={4} className="text-end align-middle">
                        Select Payment Methods
                      </th>
                      <th className="text-end align-middle">
                        <select
                          className="form-select text-end form-select-sm"
                          name="payment_method_id"
                          value={props.order_Summary.payment_method_id}
                          onChange={props.handle_OrderSummaryInput}
                        >
                          {props.payment_Methods.map(
                            (payment_method, index) => (
                              <option key={index} value={payment_method.id}>
                                {payment_method.name}
                              </option>
                            )
                          )}
                        </select>
                      </th>
                    </tr>
                    {props.order_Summary.payment_method_id != 1 ? (
                      <tr>
                        <th colSpan={4} className="text-end align-middle">
                          Transaction Id
                        </th>
                        <th className="align-middle">
                          <input
                            className="form-control text-end form-control-sm"
                            type="text"
                            name="trx_id"
                            value={props.order_Summary.trx_id}
                            placeholder="Transaction Id"
                            onChange={props.handle_OrderSummaryInput}
                          />
                        </th>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="px-2">
            <button className="btn btn-danger" onClick={props.onHide}>
              Close
            </button>
            <button
              className="btn main-btn ms-2"
              onClick={props.handle_OrderPlace}
              dangerouslySetInnerHTML={{
                __html: props.is_Loading
                  ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                  : "Confirm Order",
              }}
            />
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ShowOrderConfirmation;
