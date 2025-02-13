import React from "react";
import GlobalFunction from "../../../GlobalFunction";
import Barcode from "react-barcode";

const BarCodePage = React.forwardRef((props, ref) => {
  return (
    <div
      className="print-area"
      ref={ref}
      style={{
        width: props.paperSize.a4.width,
        height: props.paperSize.a4.height,
      }}
    >
      {props.products.map((product, index) => (
        <div className="bar-code-items" key={index}>
          <p>
            <strong>{product?.name}</strong>
          </p>
          <p>
            {/* Original Price */}
            Price:{" "}
            {product?.selling_price?.discount != 0
              ? GlobalFunction.formatPrice(product?.selling_price?.price)
              : ""}{" "}
            <span
              className={product?.selling_price?.discount != 0 ? "deleted" : ""}
            >
              {product?.price}
            </span>
          </p>
          <div className="barcode">
            <Barcode value={product.sku} width={1} height={30} fontSize={10} />
          </div>
        </div>
      ))}
    </div>
  );
});

export default BarCodePage;
