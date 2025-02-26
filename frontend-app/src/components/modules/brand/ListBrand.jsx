import axios from "axios";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DataNotFound from "../../partials/miniComponent/DataNotFound";
import Loader from "../../partials/miniComponent/Loader";
import Pagination from "react-js-pagination";

const ListBrand = () => {
  const [input, setInput] = useState({
    order_by: "name",
    per_page: 10,
    direction: "asc",
    search: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [brands, setBrands] = useState([]);

  const getBrands = (pageNumber = 1) => {
    setIsLoading(true);
    axios
      .get(
        `brand?page=${pageNumber}&search=${input.search}&order_by=${input.order_by}&per_page=${input.per_page}&direction=${input.direction}`
      )
      .then((res) => {
        setBrands(res.data.data);
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

  const handleDeleteBrand = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Brand will be Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/brand/${id}`).then((res) => {
          getBrands();
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

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <BreadCrumb title="List Category" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Brand List"
              link="/brand/create"
              icon="fa-plus"
              btn_name="Add Brand"
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
                        <option value={"status"}>Status</option>
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
                        onClick={() => getBrands(1)}
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
                <table className="table text-center table-responsive table-bordered align-middle table-hover table-striped">
                  <thead className="table-primary">
                    <tr>
                      <th>SL.</th>
                      <th>Name</th>
                      <th>Slug</th>
                      <th>Logo</th>
                      <th>Created By</th>
                      <th>Date Time</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.keys(brands).length > 0 ? (
                      brands.map((brand, index) => (
                        <tr key={index}>
                          <td>{startFrom + index}</td>
                          <td>{brand.name}</td>
                          <td>{brand.slug}</td>
                          <td>
                            <img
                              src={brand.logo}
                              alt={brand.name}
                              className="img-thumbnail table-image"
                            />
                          </td>
                          <td>
                            <strong>{brand.created_by}</strong>
                          </td>
                          <td>
                            <p>{brand.created_at}</p>
                            <p>{brand.updated_at}</p>
                          </td>
                          <td>
                            <Link
                              className="btn edit-btn btn-sm"
                              to={`/brand/edit/${brand.id}`}
                            >
                              <i class="fa-solid fa-pencil"></i>
                            </Link>
                            <button
                              onClick={() => handleDeleteBrand(brand.id)}
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
              )}
            </div>
            <div className="card-footer">
              <nav className="pagination">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemCount}
                  pageRangeDisplayed={5}
                  onChange={getBrands}
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

export default ListBrand;
