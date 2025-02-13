import axios from "axios";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import DataNotFound from "../../partials/miniComponent/DataNotFound";
import CardHeader from "../../partials/miniComponent/CardHeader";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ListSubCategory = () => {
  const [subCategories, setSubCategories] = useState([]);

  const getSubCategories = () => {
    axios.get(`sub-category`).then((res) => {
      setSubCategories(res.data.data);
    });
  };
  const handleSubCategoryDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Sub Category will be Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/sub-category/${id}`).then((res) => {
          getSubCategories();
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
    getSubCategories();
  }, []);

  return (
    <>
      <BreadCrumb title="List Sub Category" />
      <div className="row">
        <div className="col-md-12">
          <div className="card page-card">
            <CardHeader
              title="Sub Category List"
              link="/sub-category/create"
              btn_name="Add Sub Category"
            />
            <div className="card-body">
              <table className="table text-center table-responsive table-bordered align-middle table-hover table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>SL.</th>
                    <th>Name</th>
                    <th>Category Name</th>
                    <th>Slug</th>
                    <th>Created By</th>
                    <th>Date Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(subCategories).length > 0 ? (
                    subCategories.map((subCategory, index) => (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{subCategory.name}</td>
                        <td>{subCategory.category_name}</td>
                        <td>{subCategory.slug}</td>
                        <td>
                          <strong>{subCategory.created_by}</strong>
                        </td>
                        <td>
                          <p>{subCategory.created_at}</p>
                          <p>{subCategory.updated_at}</p>
                        </td>
                        <td>
                          <Link
                            className="btn edit-btn btn-sm"
                            to={`edit/${subCategory.id}`}
                          >
                            <i class="fa-solid fa-pencil"></i>
                          </Link>
                          <button
                            onClick={() =>
                              handleSubCategoryDelete(subCategory.id)
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListSubCategory;
