import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";

const AddShop = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
      setInput((prevState) => ({ ...prevState, logo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleShopCreate = () => {
    setIsLoading(true);
    axios
      .post(`/shop`, input)
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.message,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
        if (res.data.flag === undefined) {
          navigate("/shop");
        }
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
      <BreadCrumb title={"Add Shop"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader title="Add Shop" btn_name="Shop List" link="/shop" />
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  {/* Shop Information */}
                  <div className="card">
                    <div className="card-header card-heading">
                      <h5>Shop Details</h5>
                    </div>
                    <div className="card-body">
                      {/* Shop Name */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Shop Name</p>
                          </div>
                          <input
                            className={
                              errors.name !== undefined
                                ? "form-control mt-2 is-invalid"
                                : "form-control mt-2"
                            }
                            name={"name"}
                            type={"text"}
                            value={input.name}
                            placeholder={"Enter shop name"}
                            onChange={handleInput}
                          />
                          <p className="login-error-msg">
                            <small>
                              {errors.name !== undefined
                                ? errors.name[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Shop Status */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Status</p>
                          </div>
                          <select
                            className={
                              errors.status !== undefined
                                ? "form-select mt-2 is-invalid"
                                : "form-select mt-2"
                            }
                            name={"status"}
                            value={input.status}
                            onChange={handleInput}
                          >
                            <option value={1}>Active</option>
                            <option value={0}>Inactive</option>
                          </select>
                          <p className="login-error-msg">
                            <small>
                              {errors.status !== undefined
                                ? errors.status[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Shop Details */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Details</p>
                          </div>
                          <textarea
                            className={
                              errors.details !== undefined
                                ? "form-control mt-2 is-invalid"
                                : "form-control mt-2"
                            }
                            name={"details"}
                            value={input.details}
                            placeholder={"Write shop details..."}
                            onChange={handleInput}
                          />
                          <p className="login-error-msg">
                            <small>
                              {errors.details !== undefined
                                ? errors.details[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Shop Logo */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Logo</p>
                          </div>
                          <input
                            className={
                              errors.logo !== undefined
                                ? "form-control mt-2 is-invalid"
                                : "form-control mt-2"
                            }
                            type={"file"}
                            name={"logo"}
                            onChange={handleLogo}
                          />
                          <p className="login-error-msg">
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
                      {/* Shop Phone Number */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Phone Number</p>
                          </div>
                          <input
                            className={
                              errors.phone !== undefined
                                ? "form-control mt-2 is-invalid"
                                : "form-control mt-2"
                            }
                            name={"phone"}
                            type={"numeric"}
                            value={input.phone}
                            placeholder={"Enter phone number"}
                            onChange={handleInput}
                          />
                          <p className="login-error-msg">
                            <small>
                              {errors.phone !== undefined
                                ? errors.phone[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                      {/* Shop Email Address */}
                      <div>
                        <label className="inputField w-100">
                          <div className="inputField-title mb-2">
                            <p>Email Address</p>
                          </div>
                          <input
                            className={
                              errors.email !== undefined
                                ? "form-control mt-2 is-invalid"
                                : "form-control mt-2"
                            }
                            name={"email"}
                            type={"email"}
                            value={input.email}
                            placeholder={"Enter email Address"}
                            onChange={handleInput}
                          />
                          <p className="login-error-msg">
                            <small>
                              {errors.email !== undefined
                                ? errors.email[0]
                                : null}
                            </small>
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  {/* Shop Address */}
                  <div className="card">
                    <div className="card-header card-heading">
                      <h5>Shop Address</h5>
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
                            className={
                              errors.address !== undefined
                                ? "form-control mt-2 is-invalid"
                                : "form-control mt-2"
                            }
                            name={"address"}
                            type={"text"}
                            value={input.address}
                            placeholder={"Enter your Address"}
                            onChange={handleInput}
                          />
                          <p className="login-error-msg">
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
                            className={
                              errors.division_id !== undefined
                                ? "form-select mt-2 is-invalid"
                                : "form-select mt-2"
                            }
                            name={"division_id"}
                            value={input.division_id}
                            onChange={handleInput}
                          >
                            <option>Select Devisions</option>
                            {divisions.map((division, index) => (
                              <option key={index} value={division.id}>
                                {division.name}
                              </option>
                            ))}
                          </select>
                          <p className="login-error-msg">
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
                            className={
                              errors.district_id !== undefined
                                ? "form-select mt-2 is-invalid"
                                : "form-select mt-2"
                            }
                            name={"district_id"}
                            value={input.district_id}
                            onChange={handleInput}
                            disabled={Object.keys(districts).length < 1}
                          >
                            <option>Select District</option>
                            {districts.map((district, index) => (
                              <option key={index} value={district.id}>
                                {district.name}
                              </option>
                            ))}
                          </select>
                          <p className="login-error-msg">
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
                            className={
                              errors.area_id !== undefined
                                ? "form-select mt-2 is-invalid"
                                : "form-select mt-2"
                            }
                            name={"area_id"}
                            value={input.area_id}
                            onChange={handleInput}
                            disabled={Object.keys(areas).length < 1}
                          >
                            <option>Select Areas</option>
                            {areas.map((area, index) => (
                              <option key={index} value={area.id}>
                                {area.name}
                              </option>
                            ))}
                          </select>
                          <p className="login-error-msg">
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
                            <p>Landmark</p>
                          </div>
                          <input
                            className={
                              errors.landmark !== undefined
                                ? "form-control mt-2 is-invalid"
                                : "form-control mt-2"
                            }
                            name={"landmark"}
                            type={"text"}
                            value={input.landmark}
                            placeholder={"Enter your landmark"}
                            onChange={handleInput}
                          />
                          <p className="login-error-msg">
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
                      onClick={handleShopCreate}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                          : "Add Shop",
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

export default AddShop;
