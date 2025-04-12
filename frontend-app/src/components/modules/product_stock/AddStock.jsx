import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import axios from "axios";
import Swal from "sweetalert2";

const AddStock = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [products, setProducts] = useState([]);

  const getProducts = () => {
    setIsLoading(true);
    axios
      .get(`all-products`)
      .then((res) => {
        setIsLoading(false);
        setProducts(res.data.data);
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleStockAdd = () => {
    setIsLoading(true);
    // console.log(input);
    axios
      .post(`stock`, input)
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/stock");
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <BreadCrumb title="Add Stock" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Add Product Stock"
              link="/stock"
              icon="fa-list"
              btn_name="Stock List"
            />
            <div className="card-body">
              <div className="row">
                {/* Select Product */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Select Product</p>
                    </div>
                    <select
                      className="form-select"
                      name="product_id"
                      value={input.product_id}
                      onChange={handleInput}
                    >
                      <option>Select Product</option>
                      {products.map((product, index) => (
                        <>
                          <option key={index} value={product.id}>
                            {product.name} - {product.sub_category} -{" "}
                            {product.category}
                          </option>
                        </>
                      ))}
                    </select>
                    <p className="error-message">
                      <small>
                        {errors.product_id !== undefined
                          ? errors.product_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Product Add Stock Amount */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Add Product Stock</p>
                    </div>
                    <input
                      className="form-control"
                      name="stock"
                      type="number"
                      min={1}
                      value={input.stock}
                      onChange={handleInput}
                      placeholder="Enter Add Stock Amount"
                    />
                    <p className="error-message">
                      <small>
                        {errors.stock !== undefined ? errors.stock[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Button */}
                <div className="col-md-12 mt-3">
                  <div className="text-center">
                    <button
                      className="btn main-btn"
                      onClick={handleStockAdd}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                          : "Add Stock",
                      }}
                    />
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

export default AddStock;
