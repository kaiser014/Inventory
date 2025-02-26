import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import DataNotFound from "../../partials/miniComponent/DataNotFound";
import { Link } from "react-router-dom";
import Loader from "../../partials/miniComponent/Loader";
import Pagination from "react-js-pagination";
import SupplierDetailModal from "./supplier_modal/SupplierDetailModal";

const ListSupplier = () => {
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

  const [suppliers, setSuppliers] = useState([]);
  const [supplier, setSupplier] = useState("");

  const [modalShow, setModalShow] = useState(false);

  const getSuppliers = (pageNumber = 1) => {
    setIsLoading(true);
    axios
      .get(
        `supplier?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
      )
      .then((res) => {
        setSuppliers(res.data.data);
        setItemsCountPerPage(res.data.meta.per_page);
        setStartFrom(res.data.meta.from);
        setTotalItemCount(res.data.meta.total);
        setActivePage(res.data.meta.current_page);
        setIsLoading(false);
      });
  };

  const handleDeleteSupplier = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Supplier will be Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/supplier/${id}`).then((res) => {
          getSuppliers();
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

  const handleSearchInput = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDetailsModal = (supplier) => {
    setSupplier(supplier);
    setModalShow(true);
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <>
      <BreadCrumb title="Supplier List" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Supplier List"
              link="/supplier/create"
              icon="fa-plus"
              btn_name="Add Supplier"
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
                        onClick={() => getSuppliers(1)}
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
                <div>
                  <table className="table text-center table-responsive table-bordered align-middle table-hover table-striped">
                    <thead className="table-primary">
                      <tr>
                        <th>SL.</th>
                        <th>Name</th>
                        <th>Phone / Email</th>
                        <th>Status</th>
                        <th>Logo</th>
                        <th>Created By</th>
                        <th>Date Time</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.keys(suppliers).length > 0 ? (
                        suppliers.map((supplier, index) => (
                          <tr key={index}>
                            <td>{startFrom + index}</td>
                            <td>{supplier.name}</td>
                            <td>
                              <p className="theme-text">{supplier.phone}</p>
                              <p className="theme-text-second">
                                {supplier.email}
                              </p>
                            </td>
                            <td>{supplier.status}</td>
                            <td>
                              <img
                                src={supplier.logo}
                                alt={supplier.name}
                                className="img-thumbnail table-image"
                                width={"50px"}
                                onClick={() => handleDetailsModal(supplier)}
                              />
                            </td>
                            <td>
                              <strong>{supplier.created_by}</strong>
                            </td>
                            <td>
                              <p className="theme-text">
                                {supplier.created_at}
                              </p>
                              <p className="theme-text-second">
                                {supplier.updated_at}
                              </p>
                            </td>
                            <td>
                              <button
                                className="btn info-btn btn-sm"
                                onClick={() => handleDetailsModal(supplier)}
                              >
                                <i class="fa-solid fa-eye"></i>
                              </button>

                              <Link
                                className="btn edit-btn btn-sm"
                                to={`/supplier/edit/${supplier.id}`}
                              >
                                <i class="fa-solid fa-pencil"></i>
                              </Link>
                              <button
                                onClick={() =>
                                  handleDeleteSupplier(supplier.id)
                                }
                                className="btn delete-btn btn-sm"
                              >
                                <i class="fa-solid fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <DataNotFound />
                      )}
                    </tbody>
                  </table>
                  <SupplierDetailModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    title="Supplier Details"
                    size={"md"}
                    supplier={supplier}
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
                  onChange={getSuppliers}
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

export default ListSupplier;
