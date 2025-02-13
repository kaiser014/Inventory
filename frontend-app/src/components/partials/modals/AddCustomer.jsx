import axios from "axios";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";

const AddCustomer = (props) => {
  const [input, setInput] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInput = (e) => {
    e.preventDefault();
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleCustomerCreate = () => {
    setIsLoading(true);
    axios
      .post(`/customer`, input)
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
        props.onHide();
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
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add Customer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label className="w-100 mb-3">
              <p>Name</p>
              <input
                className={
                  errors.name !== undefined
                    ? "form-control mt-2 is-invalid"
                    : "form-control mt-2"
                }
                name={"name"}
                type={"text"}
                value={input.name}
                placeholder={"Enter customer name"}
                onChange={handleInput}
              />
              <p className="login-error-msg">
                <small>
                  {errors.name !== undefined ? errors.name[0] : null}
                </small>
              </p>
            </label>
            <label className="w-100 mb-3">
              <p>Phone Number</p>
              <input
                className={
                  errors.phone !== undefined
                    ? "form-control mt-2 is-invalid"
                    : "form-control mt-2"
                }
                name={"phone"}
                type={"number"}
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
            <label className="w-100 mb-3">
              <p>Email</p>
              <input
                className={
                  errors.name !== undefined
                    ? "form-control mt-2 is-invalid"
                    : "form-control mt-2"
                }
                name={"email"}
                type={"eamil"}
                value={input.email}
                placeholder={"Enter email address"}
                onChange={handleInput}
              />
              <p className="login-error-msg">
                <small>
                  {errors.email !== undefined ? errors.email[0] : null}
                </small>
              </p>
            </label>
            <div className="my-2">
              <button
                className="btn main-btn"
                onClick={handleCustomerCreate}
                dangerouslySetInnerHTML={{
                  __html: isLoading
                    ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                    : "Add Customer",
                }}
              />
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddCustomer;
