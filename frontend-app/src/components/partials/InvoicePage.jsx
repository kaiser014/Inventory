import React from "react";
import GlobalFunction from "../../GlobalFunction";

const InvoicePage = React.forwardRef((props, ref) => {
  console.log(props.orders);
  const order = props.orders;
  return (
    <div ref={ref}>
      <div className="invoice-area">
        <div className="invoice-details-item">
          <div className="invoice-companydetails text-start">
            <div className="company-logo">
              <img
                src={order?.shop?.logo}
                alt="shop logo"
                className="img-thumbnail invoice-logo"
              />
            </div>
            <h4>{order?.shop?.name}</h4>
            <p>
              <i>Phone: {order?.shop?.phone}</i>
            </p>
          </div>
          <div className="invoice-orderdetails text-end">
            <h5>Order Details</h5>
            <p>
              <i>Date: {order?.created_at}</i>
            </p>
            <h5 className="mt-3">Customer Details</h5>
            <h6 className="mt-2">{order?.customer?.name}</h6>
            <p>
              <i>Phone: {order?.customer?.phone}</i>
            </p>
          </div>
        </div>
        <h2>#{order?.order_number}</h2>
        <table className="table table-sm table-hover table-bordered table-striped mt-4">
          <thead>
            <tr>
              <th>SL.</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th className="text-end">Sub Total</th>
            </tr>
          </thead>
          <tbody>
            {order?.order_details.map((product, index) => (
              <tr key={index}>
                <td>{++index}</td>
                <td>
                  <p>
                    <strong>Name: {product?.name}</strong>
                  </p>
                  <p>SKU: {product?.sku}</p>
                </td>
                <td>{product?.quantity}</td>
                <td>
                  <p>{product?.price}</p>
                </td>
                <td className="text-end">
                  <p>
                    {GlobalFunction.formatPrice(
                      product?.selling_price?.price * product?.quantity
                    )}
                  </p>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={4} className="text-end fw-bold">
                Sub Total
              </td>
              <td className="text-end fw-bold">
                {new Intl.NumberFormat().format(order?.sub_total)}৳
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-end fw-bold">
                Discount
              </td>
              <td className="text-end fw-bold">
                {new Intl.NumberFormat().format(order?.discount)}৳
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-end fw-bold">
                Total
              </td>
              <td className="text-end fw-bold">
                {new Intl.NumberFormat().format(order?.total)}৳
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-end fw-bold">
                Paid Amount
              </td>
              <td className="text-end fw-bold">
                {new Intl.NumberFormat().format(order?.paid_amount)}৳
              </td>
            </tr>
            <tr>
              <td colSpan={4} className="text-end fw-bold">
                Due Amount
              </td>
              <td className="text-end fw-bold">
                {new Intl.NumberFormat().format(order?.due_amount)}৳
              </td>
            </tr>
            {order?.transactions.map((transaction, index) => (
              <tr key={index}>
                <td colSpan={4} className="text-end fw-bold">
                  Payment Method
                </td>
                <td className="text-end fw-bold">
                  <p>{transaction?.payment_method_name}</p>
                  {transaction?.account_number ? (
                    <p>Acc/Trx No.{transaction?.account_number}</p>
                  ) : (
                    ""
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <p className="system-message">
            This is System Generated Invoice And Does not required signature
          </p>
        </div>
      </div>
    </div>
  );
});
export default InvoicePage;
