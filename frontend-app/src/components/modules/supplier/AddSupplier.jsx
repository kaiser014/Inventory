import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";

const AddSupplier = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);

  const getDivisions = () => {
    axios.get(`divisions`).then((res) => {
      setDivisions(res.data);
    });
  };
  const getDistricts = (division_id) => {
    axios.get(`districts/${division_id}`).then((res) => {
      setDistricts(res.data);
    });
  };
  const getAreas = (district_id) => {
    axios.get(`areas/${district_id}`).then((res) => {
      setAreas(res.data);
    });
  };

  const handleInput = (e) => {
    if (e.target.name === "division_id") {
      setDistricts([]);
      setAreas([]);
      let division_id = parseInt(e.target.value);
      if (!isNaN(division_id)) {
        getDistricts(division_id);
      }
    } else if (e.target.name === "district_id") {
      setAreas([]);
      let district_id = parseInt(e.target.value);
      if (!isNaN(district_id)) {
        getAreas(district_id);
      }
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

  const handleSupplierCreate = () => {
    setIsLoading(true);
    axios
      .post(`supplier`, input)
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/supplier");
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  useEffect(() => {
    getDivisions();
  }, []);

  return (
    <>
      <BreadCrumb title="Add Supplier" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Add Supplier"
              link="/supplier"
              btn_name="Supplier List"
            />
            <div className="card-body">
              <div className="row">
                {/* Suuplier Information */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="card-header card-heading">
                      <h5>Supplier Information</h5>
                    </div>
                    <div className="card-body">
                      {/* Name */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Supplier Name</p>
                          </div>
                          <input
                            className="form-control"
                            name="name"
                            value={input.name}
                            onChange={handleInput}
                            placeholder="Enter Supplier Name"
                          />
                          <p className="error-message">
                            <small>
                              {errors.name !== undefined
                                ? errors.name[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Phone</p>
                          </div>
                          <input
                            className="form-control"
                            name="phone"
                            type="number"
                            value={input.phone}
                            onChange={handleInput}
                            placeholder="Enter Phone Number"
                          />
                          <p className="error-message">
                            <small>
                              {errors.phone !== undefined
                                ? errors.phone[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Email */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Email Address</p>
                          </div>
                          <input
                            className="form-control"
                            name="email"
                            value={input.email}
                            onChange={handleInput}
                            type="email"
                            placeholder="Enter Email Address"
                          />
                          <p className="error-message">
                            <small>
                              {errors.email !== undefined
                                ? errors.email[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Status */}
                      <div>
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
                              {errors.status !== undefined
                                ? errors.status[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Details */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Details</p>
                          </div>
                          <textarea
                            className="form-control"
                            name="details"
                            value={input.details}
                            onChange={handleInput}
                            placeholder="Enter Supplier Details"
                          ></textarea>
                          <p className="error-message">
                            <small>
                              {errors.details !== undefined
                                ? errors.details[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Logo */}
                      <div>
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
                              {errors.logo !== undefined
                                ? errors.logo[0]
                                : null}
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
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Supplier Address */}
                  <div className="card">
                    <div className="card-header card-heading">
                      <h5>Supplier Address</h5>
                    </div>
                    <div className="card-body">
                      {/* Address */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>
                              Address <small>(House/Road/Village)</small>
                            </p>
                          </div>
                          <input
                            className="form-control"
                            name="address"
                            type="text"
                            value={input.address}
                            onChange={handleInput}
                            placeholder="Enter Your Address"
                          />
                          <p className="error-message">
                            <small>
                              {errors.address !== undefined
                                ? errors.address[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Division */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Select Division</p>
                          </div>
                          <select
                            className="form-select"
                            name="division_id"
                            value={input.division_id}
                            onChange={handleInput}
                          >
                            <option>Select Devision</option>
                            {divisions.map((division, index) => (
                              <option key={index} value={division.id}>
                                {division.name}
                              </option>
                            ))}
                          </select>
                          <p className="error-message">
                            <small>
                              {errors.division_id !== undefined
                                ? errors.division_id[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* City / District */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Select City</p>
                          </div>
                          <select
                            className="form-select"
                            name="district_id"
                            value={input.district_id}
                            onChange={handleInput}
                            disabled={Object.keys(districts).length < 1}
                          >
                            <option>Select City</option>
                            {districts.map((district, index) => (
                              <option key={index} value={district.id}>
                                {district.name}
                              </option>
                            ))}
                          </select>
                          <p className="error-message">
                            <small>
                              {errors.district_id !== undefined
                                ? errors.district_id[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Area */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Select Area</p>
                          </div>
                          <select
                            className="form-select"
                            name="area_id"
                            value={input.area_id}
                            onChange={handleInput}
                            disabled={Object.keys(areas).length < 1}
                          >
                            <option>Select Area</option>
                            {areas.map((area, index) => (
                              <option key={index} value={area.id}>
                                {area.name}
                              </option>
                            ))}
                          </select>
                          <p className="error-message">
                            <small>
                              {errors.area_id !== undefined
                                ? errors.area_id[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Land Mark */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Land Mark</p>
                          </div>
                          <input
                            className="form-control"
                            name="landmark"
                            type="text"
                            value={input.landmark}
                            onChange={handleInput}
                            placeholder="Enter Your Landmark"
                          />
                          <p className="error-message">
                            <small>
                              {errors.landmark !== undefined
                                ? errors.landmark[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <div className="col-md-12 mt-3">
                  <div className="text-center">
                    <button
                      className="btn main-btn"
                      onClick={handleSupplierCreate}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                          : "Add Supplier",
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

export default AddSupplier;
