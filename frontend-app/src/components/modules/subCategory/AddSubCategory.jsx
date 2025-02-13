import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";

const AddSubCategory = () => {
  const navigate = useNavigate();

  const [input, setInput] = useState({ status: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [categories, setCategories] = useState([]);

  const getCategoryList = () => {
    axios.get("get-category-list").then((res) => {
      setCategories(res.data);
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
  const handleSubCategoryCreate = () => {
    setIsLoading(true);
    axios
      .post(`/sub-category`, input)
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
  }, []);

  return (
    <>
      <BreadCrumb title="Add Sub Category" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Add Sub Category"
              link="/sub-category"
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
                      {categories.map((category, index) => (
                        <option value={category.id}>{category.name}</option>
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
                      onClick={handleSubCategoryCreate}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                          : "Add Sub Category",
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

export default AddSubCategory;
