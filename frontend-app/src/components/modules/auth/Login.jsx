import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const Login = () => {
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
      .post(`login`, input)
      .then((res) => {
        if (res.data.token) {
          navigate("/dashboard");
          localStorage.setItem("email", res.data.email);
          localStorage.setItem("name", res.data.name);
          localStorage.setItem("phone", res.data.phone);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("role", res.data.role);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.data.errors.email) {
          Swal.fire(error.response.data.errors.email[0]);
        }
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
                <h3>Login</h3>
                <Link to={"/register"} className="btn login-btn">
                  Register
                </Link>
              </div>
            </div>
            <div className="card-body">
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
                  <h5 className="mb-2">Login As</h5>
                  <select
                    className="form-select"
                    name="user_type"
                    value={input.user_type}
                    onChange={handleInput}
                  >
                    <option>Select User Role</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Sales Manager</option>
                  </select>
                  <p className="error-message">
                    <small>
                      {errors.user_type !== undefined
                        ? errors.user_type[0]
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
                      : "Login",
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

export default Login;
