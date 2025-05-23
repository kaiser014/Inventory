import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";

const AddBrand = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

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

  const handleLogo = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setInput((prevState) => ({
        ...prevState,
        logo: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleBrandCreate = () => {
    setIsLoading(true);
    axios
      .post(`brand`, input)
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/brand");
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  return (
    <>
      <BreadCrumb title="Add Brand" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Add Brand"
              link="/brand"
              icon="fa-list"
              btn_name="Brand List"
            />
            <div className="card-body">
              <div className="row">
                {/* Name */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Brand Name</p>
                    </div>
                    <input
                      className="form-control"
                      name="name"
                      value={input.name}
                      onChange={handleInput}
                      placeholder="Enter Brand Name"
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
                      placeholder="Enter Brand Slug"
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
                      placeholder="Enter Brand Description"
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
                {/* Logo */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Logo</p>
                    </div>
                    <input
                      className="form-control"
                      name="logo"
                      type="file"
                      onChange={handleLogo}
                    />
                    <p className="error-message">
                      <small>
                        {errors.logo !== undefined ? errors.logo[0] : null}
                      </small>
                    </p>
                  </label>
                  {input.photo !== undefined ? (
                    <div className="row">
                      <div className="col-md-3">
                        <div className="photo-preview mt-2">
                          <img
                            src={input.logo}
                            alt={"Img preview"}
                            className="img-thumbnail aspect-one"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
                {/* Button */}
                <div className="col-md-12 mt-3">
                  <div className="text-center">
                    <button
                      className="btn main-btn"
                      onClick={handleBrandCreate}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                          : "Add Brand",
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

export default AddBrand;
