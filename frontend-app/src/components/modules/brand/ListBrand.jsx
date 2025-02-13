import axios from "axios";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import DataNotFound from "../../partials/miniComponent/DataNotFound";

const ListBrand = () => {
  const [brands, setBrands] = useState([]);

  const getBrands = () => {
    axios.get(`brand`).then((res) => {
      setBrands(res.data.data);
    });
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
          <div className="card page-card">
            <CardHeader
              title="Brand List"
              link="/brand/create"
              btn_name="Add Brand"
            />
            <div className="card-body">
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
                        <td>{++index}</td>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBrand;
