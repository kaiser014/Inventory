import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ListCategory = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    axios.get(`category`).then((res) => {
      setCategories(res.data.data);
    });
  };

  const handleDeleteCategory = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Category will be Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/category/${id}`).then((res) => {
          getCategories();
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
    getCategories();
  }, []);

  return (
    <>
      <BreadCrumb title="List Category" />
      <div className="row">
        <div className="col-md-12">
          <div className="card page-card">
            <CardHeader
              title="Category List"
              link="/category/create"
              btn_name="Add Category"
            />
            <div className="card-body">
              <table className="table text-center table-responsive table-bordered align-middle table-hover table-striped">
                <thead className="table-primary">
                  <tr>
                    <th>SL.</th>
                    <th>Name</th>
                    <th>Slug</th>
                    <th>Created By</th>
                    <th>Date Time</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(categories).length > 0 ? (
                    categories.map((category, index) => (
                      <tr key={index}>
                        <td>{++index}</td>
                        <td>{category.name}</td>
                        <td>{category.slug}</td>
                        <td>
                          <strong>{category.created_by}</strong>
                        </td>
                        <td>
                          <p>{category.created_at}</p>
                          <p>{category.updated_at}</p>
                        </td>
                        <td>
                          <Link
                            className="btn edit-btn btn-sm"
                            to={`/category/edit/${category.id}`}
                          >
                            <i class="fa-solid fa-pencil"></i>
                          </Link>
                          <button
                            onClick={() => handleDeleteCategory(category.id)}
                            className="btn delete-btn btn-sm"
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <>No Data</>
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

export default ListCategory;
