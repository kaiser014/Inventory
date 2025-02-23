import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import BreadCrumb from "../../partials/BreadCrumb";
import CardHeader from "../../partials/miniComponent/CardHeader";
import Swal from "sweetalert2";

const EditCustomer = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [input, setInput] = useState({ status: 1 });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const getCustomer = () => {
    axios.get(`customer/${params.id}`).then((res) => {
      setInput(res.data.data);
    });
  };

  const handleInput = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleCustomerUpdate = () => {
    setIsLoading(true);
    axios
      .put(`/customer/${params.id}`, input)
      .then((res) => {
        setIsLoading(false);
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/customer");
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  useEffect(() => {
    getCustomer();
  }, []);
  return (
    <>
      <BreadCrumb title="Edit Customer" />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <CardHeader
              title="Edit Customer"
              link="/customer"
              icon="fa-list"
              btn_name="Customer List"
            />
            <div className="card-body">
              <div className="row">
                {/* Name */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Customer Name</p>
                    </div>
                    <input
                      className="form-control"
                      name="name"
                      value={input.name}
                      onChange={handleInput}
                      placeholder="Enter Customer Name"
                    />
                    <p className="error-message">
                      <small>
                        {errors.name !== undefined ? errors.name[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Phone */}
                <div className="col-md-6">
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
                      placeholder="Phone Number"
                    />
                    <p className="error-message">
                      <small>
                        {errors.phone !== undefined ? errors.phone[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                {/* Email Address */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Email Address</p>
                    </div>
                    <input
                      className="form-control"
                      name="email"
                      type="email"
                      value={input.email}
                      onChange={handleInput}
                      placeholder="Email Address"
                    />
                    <p className="error-message">
                      <small>
                        {errors.email !== undefined ? errors.email[0] : null}
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
                {/* Address */}
                <div className="col-md-6">
                  <label className="inputField w-100">
                    <div className="inputField-title mb-2">
                      <p>Address</p>
                    </div>
                    <textarea
                      className="form-control"
                      name="address"
                      value={input.address}
                      onChange={handleInput}
                      placeholder="Enter Address"
                    ></textarea>
                    <p className="error-message">
                      <small>
                        {errors.address !== undefined
                          ? errors.address[0]
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
                      onClick={handleCustomerUpdate}
                      dangerouslySetInnerHTML={{
                        __html: isLoading
                          ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                          : "Update Customer",
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

export default EditCustomer;
