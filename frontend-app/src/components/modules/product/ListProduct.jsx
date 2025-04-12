import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Loader from "../../partials/miniComponent/Loader";
import { Link } from "react-router-dom";
import DataNotFound from "../../partials/miniComponent/DataNotFound";
import Pagination from "react-js-pagination";
import GlobalFunction from "../../../GlobalFunction";

const ListProduct = () => {
  const [input, setInput] = useState({
    order_by: "id",
    per_page: 10,
    direction: "desc",
    search: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [productColumns, setProductColumns] = useState([]);

  const getProductColumns = () => {
    setIsLoading(true);
    axios.get(`get-product-columns`).then((res) => {
      setProductColumns(res.data);
      setIsLoading(false);
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

  useEffect(() => {
    getProducts();
    getProductColumns();
  }, []);

  const handleSearchInput = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Product will be Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/product/${id}`).then((res) => {
          getProducts();
          Swal.fire({
            position: "top-end",
            icon: res.data.cls,
            title: res.data.message,
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          });
        });
      }
    });
  };
  return (
    <>
      <div>
        <BreadCrumb title={"Product List"} />
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Product List"
              btn_name="Add Product"
              icon="fa-plus"
              link="/product/create"
              hide={true}
            />
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
                        {productColumns.map((productColumn, index) => (
                          <option key={index} value={productColumn.id}>
                            {productColumn.name}
                          </option>
                        ))}
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
                        onClick={() => getProducts(1)}
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
                  <table className="category-table table-sm product-table table table-hover table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Category</th>
                        <th>Photo</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(products).length > 0 ? (
                        products.map((product, index) => (
                          <tr key={index}>
                            <td>{startFrom + index}</td>
                            <td>
                              <p className="text-theme">
                                Name : {product.name}
                              </p>
                              <p className="text-success">
                                Slug : {product.slug}
                              </p>
                              <p>
                                {product?.attributes !== undefined &&
                                Object.keys(product?.attributes).length > 0
                                  ? product?.attributes.map(
                                      (attribute, index) => (
                                        <p className="text-theme">
                                          <small>
                                            <strong>{attribute.name}:</strong>{" "}
                                            {attribute.value}
                                          </small>
                                        </p>
                                      )
                                    )
                                  : null}
                              </p>
                            </td>
                            <td>
                              <p className="text-theme">
                                <strong>
                                  Sell Price: {product.selling_price.price}
                                  {product.selling_price.symbol} | Discount:{" "}
                                  {product.selling_price.discount}
                                </strong>
                              </p>
                              <p className="text-theme">
                                Price: {product.price}
                              </p>
                              <p className="text-primary">
                                Discount: {product.discount_percent} +{" "}
                                {product.discount_fixed}
                              </p>
                              <p className="text-success">
                                Cost: {product.cost}
                              </p>
                              <p className="text-primary">
                                Discount Start: {product.discount_start}
                              </p>
                              <p className="text-success">
                                Discount End: {product.discount_end}
                              </p>
                            </td>
                            <td>
                              <p className="text-theme">
                                Status: {product.status}
                              </p>
                              <p className="text-primary">SKU: {product.sku}</p>
                              <p className="text-success">
                                Stock: {product.stock}
                              </p>
                            </td>
                            <td>
                              <p className="text-theme">
                                Category: {product.category}
                              </p>
                              <p className="text-primary">
                                Sub Category: {product.sub_category}
                              </p>
                              <p className="text-success">
                                Supplier: {product.supplier}
                              </p>
                              {/* <p className="text-primary">
                                Origin: {product.country}
                              </p> */}
                            </td>
                            <td>
                              <img
                                src={product.primary_photo}
                                alt={product.name}
                                className="img-thumbnail table-image"
                                width="50px"
                              />
                            </td>
                            <td>
                              <p className="text-theme">
                                <small>
                                  <strong>Created Date :</strong>{" "}
                                  {product.created_at}
                                </small>
                              </p>
                              <p className="text-success">
                                <small>
                                  <strong>Updated Date :</strong>{" "}
                                  {product.updated_at}
                                </small>
                              </p>
                              <p className="text-theme">
                                <small>
                                  <strong>Created By:</strong>{" "}
                                  {product.created_by}
                                </small>
                              </p>
                              <p className="text-success">
                                <small>
                                  <strong>Updated By:</strong>{" "}
                                  {product.updated_by}
                                </small>
                              </p>
                            </td>

                            <td>
                              <div className="w-40">
                                <Link
                                  to={`/product/${product.id}`}
                                  className="btn btn-sm btn-info"
                                >
                                  <i class="fa-solid fa-eye"></i>
                                </Link>
                                {GlobalFunction.isAdmin() && (
                                  <>
                                    <Link
                                      className="btn btn-sm btn-warning m-1"
                                      to={`/product/edit/${product.id}`}
                                    >
                                      <i class="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                    <button
                                      className="btn btn-sm btn-danger"
                                      onClick={() =>
                                        handleProductDelete(product.id)
                                      }
                                    >
                                      <i class="fa-solid fa-trash-can"></i>
                                    </button>
                                  </>
                                )}
                              </div>
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
                  onChange={getProducts}
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

export default ListProduct;
