import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Loader from "../../partials/miniComponent/Loader";
import { Link } from "react-router-dom";
import DataNotFound from "../../partials/miniComponent/DataNotFound";
import Pagination from "react-js-pagination";
import ShopPhotoModal from "./partial/ShopPhotoModal";
import ShopDetailsModal from "./partial/ShopDetailsModal";

const ListShop = () => {
  const [input, setInput] = useState({
    order_by: "created_at",
    per_page: 10,
    direction: "desc",
    search: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [modalShow, setModalShow] = useState(false);
  const [modalPhotoShow, setModalPhotoShow] = useState(false);
  const [modalPhoto, setModalPhoto] = useState("");
  const [shops, setShops] = useState([]);

  const [shop, setShop] = useState("");

  const getShops = (pageNumber = 1) => {
    setIsLoading(true);
    axios
      .get(
        `/shop?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
      )
      .then((res) => {
        setShops(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalItemCount(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getShops();
  }, []);

  const handlePhotoModal = (logo) => {
    setModalPhoto(logo);
    setModalPhotoShow(true);
  };

  const handleDetailsModal = (shop) => {
    setShop(shop);
    setModalShow(true);
  };

  const handleSearchInput = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShopDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Shop will be Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/shop/${id}`).then((res) => {
          getShops();
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
      <BreadCrumb title={"Shop List"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card mb-3">
            <CardHeader
              title="Shop List"
              btn_name="Add Shop"
              link="/shop/create"
            />
            <div className="card-body">
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
                        <option value={"name"}>Name</option>
                        <option value={"created_at"}>Created at</option>
                        <option value={"updated_at"}>Updated at</option>
                        <option value={"phone"}>Phone</option>
                        <option value={"email"}>Email</option>
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
                        onClick={() => getShops(1)}
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
                  <table className="table text-center table-responsive table-bordered align-middle table-hover table-striped">
                    <thead>
                      <tr>
                        <th>SL.</th>
                        <th>Shop Name</th>
                        <th>Phone / Email</th>
                        <th>Status</th>
                        <th>Logo</th>
                        <th>Created By</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(shops).length > 0 ? (
                        shops.map((shop, index) => (
                          <tr key={index}>
                            <td>{startFrom + index}</td>
                            <td>
                              <strong>{shop.name}</strong>
                            </td>
                            <td>
                              <p className="text-success">
                                Phone: {shop.phone}
                              </p>
                              <p className="text-primary">
                                Email: {shop.email}
                              </p>
                            </td>
                            <td>{shop.status}</td>
                            <td>
                              <img
                                src={shop.logo}
                                alt={shop.name}
                                className="img-thumbnail table-image"
                                width="50px"
                                onClick={() => handlePhotoModal(shop.logo_full)}
                              />
                            </td>
                            <td>{shop.created_by}</td>
                            <td>
                              <p className="text-theme">
                                <small>
                                  <strong>Created Date :</strong>{" "}
                                  {shop.created_at}
                                </small>
                              </p>
                              <p className="text-success">
                                <small>
                                  <strong>Updated Date :</strong>{" "}
                                  {shop.updated_at}
                                </small>
                              </p>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-info my-1"
                                onClick={() => handleDetailsModal(shop)}
                              >
                                <i class="fa-solid fa-eye"></i>
                              </button>
                              <Link
                                className="btn btn-sm btn-warning my-1 mx-1"
                                to={`/shop/edit/${shop.id}`}
                              >
                                <i class="fa-solid fa-pen-to-square"></i>
                              </Link>
                              <button
                                className="btn btn-sm btn-danger my-1"
                                onClick={() => handleShopDelete(shop.id)}
                              >
                                <i class="fa-solid fa-trash-can"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <DataNotFound />
                      )}
                    </tbody>
                  </table>
                  <ShopPhotoModal
                    show={modalPhotoShow}
                    onHide={() => setModalPhotoShow(false)}
                    title="Shop Logo"
                    size={"md"}
                    photo={modalPhoto}
                  />
                  <ShopDetailsModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title="Shop Details"
                    size={"md"}
                    shop={shop}
                  />
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
                  onChange={getShops}
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

export default ListShop;
