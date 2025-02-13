import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Register = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = () => {
    setIsLoading(true);
    axios
      .post(`register`, input)
      .then((res) => {
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
        setIsLoading(false);
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
      });
  };
  return (
    <>
      <div className="loginPage">
        <div className="loginPage-container">
          <div className="card login-card">
            <div className="card-header">
              <div className="d-flex align-items-center justify-content-between">
                <h3>Register</h3>
                <Link to={"/login"} className="btn login-btn">
                  Login
                </Link>
              </div>
            </div>
            <div className="card-body">
              <div>
                <label className="w-100 mb-4">
                  <h5 className="mb-2">Full Name</h5>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    value={input.name}
                    onChange={handleInput}
                    placeholder="Enter Your Name"
                  />
                  <p className="error-message">
                    <small>
                      {errors.name !== undefined ? errors.name[0] : null}
                    </small>
                  </p>
                </label>
              </div>
              <div>
                <label className="w-100 mb-4">
                  <h5 className="mb-2">Phone</h5>
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
              <div>
                <label className="w-100 mb-4">
                  <h5 className="mb-2">Email Address</h5>
                  <input
                    className="form-control"
                    name="email"
                    type="email"
                    value={input.email}
                    onChange={handleInput}
                    placeholder="Enter Your Email Address"
                  />
                  <p className="error-message">
                    <small>
                      {errors.email !== undefined ? errors.email[0] : null}
                    </small>
                  </p>
                </label>
              </div>
              <div>
                <label className="w-100 mb-4">
                  <h5 className="mb-2">Password</h5>
                  <input
                    className="form-control"
                    name="password"
                    type="password"
                    value={input.password}
                    onChange={handleInput}
                    placeholder="Enter Your Password"
                  />
                  <p className="error-message">
                    <small>
                      {errors.password !== undefined
                        ? errors.password[0]
                        : null}
                    </small>
                  </p>
                </label>
              </div>
              <div>
                <label className="w-100 mb-4">
                  <h5 className="mb-2">Confirm Password</h5>
                  <input
                    className="form-control"
                    name="confirmed_password"
                    type="password"
                    value={input.confirmed_password}
                    onChange={handleInput}
                    placeholder="Confirmed Password"
                  />
                  <p className="error-message">
                    <small>
                      {errors.confirmed_password !== undefined
                        ? errors.confirmed_password[0]
                        : null}
                    </small>
                  </p>
                </label>
              </div>
              <div className="text-center">
                <button
                  className="btn login-btn"
                  onClick={handleLogin}
                  dangerouslySetInnerHTML={{
                    __html: isLoading
                      ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                      : "Register",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
