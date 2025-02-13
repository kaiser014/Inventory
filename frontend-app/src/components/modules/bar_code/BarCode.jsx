import React, { useEffect, useRef, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import axios from "axios";
// import Swal from "sweetalert2";
import CardHeader from "../../partials/miniComponent/CardHeader";
// import { useNavigate } from "react-router-dom";
import BarCodePage from "./BarCodePage";
import { useReactToPrint } from "react-to-print";

const BarCode = () => {
  //   const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    sub_category_id: "",
    category_id: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [products, setProducts] = useState([]);

  const [paperSize, setPaperSize] = useState({
    a4: {
      width: 595,
      height: 842,
    },
  });

  const handleInput = (e) => {
    if (e.target.name == "category_id") {
      let category_id = parseInt(e.target.value);
      if (!Number.isNaN(category_id)) {
        getSubCategories(e.target.value);
      }
    }
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getCategories = () => {
    axios.get(`/get-category-list`).then((res) => {
      setCategories(res.data);
    });
  };

  const getSubCategories = (category_id) => {
    axios.get(`/get-sub-category-list/${category_id}`).then((res) => {
      setSubCategories(res.data);
    });
  };

  const handleProductSearch = () => {
    axios
      .get(
        `/product-list-for-bar-code?name=${input?.name}&category_id=${input?.category_id}&sub_category_id=${input?.sub_category_id}`
      )
      .then((res) => {
        setProducts(res.data.data);
      });
  };
  const contentRef = useRef();
  const reactToPrintFn = useReactToPrint({ contentRef });

  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <BreadCrumb title="Generate & Print Bar Code" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Add Bar Code"
              link="#"
              btn_name="Bar Code List"
              hide={true}
            />
            <div className="card-body">
              <div className="row align-items-baseline">
                <div className="col-md-3">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Select Category</p>
                    </div>
                    <select
                      className={"form-select"}
                      name={"category_id"}
                      value={input.category_id}
                      onChange={handleInput}
                    >
                      <option>Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="col-md-3">
                  <label className="nputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Select Sub Category</p>
                    </div>
                    <select
                      className={"form-select"}
                      name={"sub_category_id"}
                      value={input.sub_category_id}
                      onChange={handleInput}
                      disabled={input.category_id == undefined}
                    >
                      <option>Select Sub Category</option>
                      {subCategories.map((sub_category, index) => (
                        <option key={index} value={sub_category.id}>
                          {sub_category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div className="col-md-4">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Product Name</p>
                    </div>
                    <input
                      className="form-control"
                      name="name"
                      value={input.name}
                      onChange={handleInput}
                      placeholder="Enter Product Name"
                      type="search"
                    />
                  </label>
                </div>
                <div className="col-md-2">
                  <button
                    className="btn btn-success"
                    onClick={handleProductSearch}
                    dangerouslySetInnerHTML={{
                      __html: isLoading
                        ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                        : "Search",
                    }}
                  />
                </div>
              </div>
              <div
                style={{
                  display: Object.keys(products).length > 0 ? "block" : "none",
                }}
              >
                <div className="text-end mt-3">
                  <button
                    onClick={() => reactToPrintFn()}
                    className="btn print-btn"
                  >
                    Print This Out!
                  </button>
                </div>
                <div className="bar-code-area-wrapper">
                  <BarCodePage
                    products={products}
                    paperSize={paperSize}
                    ref={contentRef}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BarCode;
