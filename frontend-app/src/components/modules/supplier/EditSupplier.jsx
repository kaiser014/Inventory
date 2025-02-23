import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";

const EditSupplier = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [divisions, setDivisions] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [areas, setAreas] = useState([]);
  //   const [supplier, setSupplier] = useState([]);

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

  const getSupplier = () => {
    axios.get(`supplier/${params.id}`).then((res) => {
      setInput(res.data.data);
      getDistricts(res.data.data.division_id);
      getAreas(res.data.data.district_id);
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

  const handleSupplierUpdate = () => {
    setIsLoading(true);
    axios
      .put(`/supplier/${params.id}`, input)
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
          navigate("/supplier");
        }
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
    navigate("/supplier");
  };

  useEffect(() => {
    getDivisions();
    getSupplier();
  }, []);
  return (
    <>
      <BreadCrumb title={"Edit Supplier"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Edit Supplier"
              btn_name="Supplier List"
              icon="fa-list"
              link="/supplier"
            />
            <div className="card-body">
              <div className="row">
                <div className="col-md-6">
                  <div className="supplier-details my-3">
                    <h4>Supplier Details</h4>

                    {/* Supplier Name */}
                    <label className="w-100 mt-3">
                      <p>Company Name</p>
                      <input
                        className={
                          errors.name !== undefined
                            ? "form-control mt-2 is-invalid"
                            : "form-control mt-2"
                        }
                        name={"name"}
                        type={"text"}
                        value={input.name}
                        placeholder={"Enter supplier company name"}
                        onChange={handleInput}
                      />
                      <p className="login-error-msg">
                        <small>
                          {errors.name !== undefined ? errors.name[0] : null}
                        </small>
                      </p>
                    </label>
                    {/* Supplier Status */}
                    <label className="w-100 mt-3">
                      <p>Status</p>
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
                    {/* Supplier Details */}
                    <label className="w-100 mt-3">
                      <p>Details</p>
                      <textarea
                        className={
                          errors.details !== undefined
                            ? "form-control mt-2 is-invalid"
                            : "form-control mt-2"
                        }
                        name={"details"}
                        value={input.details}
                        placeholder={"Write your details..."}
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
                    {/* Supplier Phone Number */}
                    <label className="w-100 mt-3">
                      <p>Phone Number</p>
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
                          {errors.phone !== undefined ? errors.phone[0] : null}
                        </small>
                      </p>
                    </label>
                    {/* Supplier Email Address */}
                    <label className="w-100 mt-3">
                      <p>Email Address</p>
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
                          {errors.email !== undefined ? errors.email[0] : null}
                        </small>
                      </p>
                    </label>

                    {/* Supplier Logo */}

                    <label className="w-100 mt-3">
                      <p>Logo</p>
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
                          {errors.logo !== undefined ? errors.logo[0] : null}
                        </small>
                      </p>
                    </label>
                    {input.logo !== undefined ||
                    input.display_logo !== undefined ? (
                      <div className="row">
                        <div className="col-md-3">
                          <div className="photo-preview mt-2">
                            <img
                              src={
                                input.logo === undefined
                                  ? input.display_logo
                                  : input.logo
                              }
                              alt={"Img preview"}
                              className="img-thumbnail aspect-one"
                            />
                          </div>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="supplier-address my-3">
                    <h4>Supplier Address</h4>
                    <label className="w-100 mt-3">
                      <p>
                        Address <small>(House/Road/Village)</small>
                      </p>
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
                    <label className="w-100 mt-3">
                      <p>Select Division</p>
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
                    <label className="w-100 mt-3">
                      <p>Select City</p>
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
                    <label className="w-100 mt-3">
                      <p>Select Area</p>
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
                    <label className="w-100 mt-3">
                      <p>Landmark</p>
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
                <div className="col-md-12 mt-3">
                  <div className="text-center">
                    <button
                      className="btn main-btn"
                      onClick={handleSupplierUpdate}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                          : "Update Supplier",
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

export default EditSupplier;
