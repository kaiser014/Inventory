import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";

const EditSubCategory = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [categories, setCategories] = useState([]);

  const getCategoryList = () => {
    axios.get(`get-category-list`).then((res) => {
      setCategories(res.data);
    });
  };

  const getSubCategory = () => {
    axios.get(`sub-category/${params.id}`).then((res) => {
      setInput(res.data.data);
    });
  };

  const handleInput = (e) => {
    if (e.target.name === "name") {
      let slug = e.target.value;
      slug = slug.toLowerCase();
      slug = slug.replaceAll(" ", "-");
      setInput((prevState) => ({
        ...prevState,
        slug: slug,
      }));
    }

    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubCategoryUpdate = () => {
    setIsLoading(true);
    axios
      .put(`/sub-category/${params.id}`, input)
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/sub-category");
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };
  useEffect(() => {
    getCategoryList();
    getSubCategory();
  }, []);

  return (
    <>
      <BreadCrumb title="Edit Sub Category" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Edit Sub Category"
              link="/sub-category"
              icon="fa-list"
              btn_name="Sub Category List"
            />
            <div className="card-body">
              <div className="row">
                {/* Category Select */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Select Category</p>
                    </div>
                    <select
                      className="form-select"
                      name="category_id"
                      value={input.category_id}
                      onChange={handleInput}
                    >
                      <option value={null}>Select Category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <p className="error-message">
                      <small>
                        {errors.category_id !== undefined
                          ? errors.category_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Name */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Sub Category Name</p>
                    </div>
                    <input
                      className="form-control"
                      name="name"
                      value={input.name}
                      onChange={handleInput}
                      placeholder="Enter Sub Category Name"
                    />
                    <p className="error-message">
                      <small>
                        {errors.name !== undefined ? errors.name[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Slug */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Slug</p>
                    </div>
                    <input
                      className="form-control"
                      name="slug"
                      value={input.slug}
                      onChange={handleInput}
                      placeholder="Enter Sub Category Slug"
                    />
                    <p className="error-message">
                      <small>
                        {errors.slug !== undefined ? errors.slug[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Status */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Status</p>
                    </div>
                    <select
                      className="form-select"
                      name="status"
                      value={input.status}
                      onChange={handleInput}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                    <p className="error-message">
                      <small>
                        {errors.status !== undefined ? errors.status[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Description */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Description</p>
                    </div>
                    <textarea
                      className="form-control"
                      name="description"
                      value={input.description}
                      onChange={handleInput}
                      placeholder="Enter Sub Category Description"
                    ></textarea>
                    <p className="error-message">
                      <small>
                        {errors.description !== undefined
                          ? errors.description[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Button */}
                <div className="col-md-12 mt-3">
                  <div className="text-center">
                    <button
                      className="btn main-btn"
                      onClick={handleSubCategoryUpdate}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                          : "Update Sub Category",
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

export default EditSubCategory;
