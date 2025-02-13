import React, { useEffect, useState } from "react";
import BreadCrumb from "../../partials/BreadCrumb";
import axios from "axios";
import Swal from "sweetalert2";
import Loader from "../../partials/miniComponent/Loader";
import DataNotFound from "../../partials/miniComponent/DataNotFound";
import Pagination from "react-js-pagination";
import { Modal } from "react-bootstrap";

const ProductAttribute = () => {
  const [modalShow, setModalShow] = useState(false);
  const [input, setInput] = useState({ status: 1 });
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [attributes, setAttributes] = useState([]);

  const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
  const [totalItemCount, setTotalItemCount] = useState(0);
  const [startFrom, setStartFrom] = useState(1);
  const [activePage, setActivePage] = useState(1);

  const [modalTitle, setModalTitle] = useState("Add");
  const [isEditMode, setIsEditMode] = useState(false);

  const [valueModalShow, setValueModalShow] = useState(false);
  const [valueModalTitle, setValueModalTitle] = useState("Add");
  const [valueModalHeading, setValueModalHeading] = useState("Add");

  const [modalValue, setModalValue] = useState([]);
  const [modalValueShow, setModalValueShow] = useState(false);
  const [valueAttributeName, setValueAttributeName] = useState(false);

  const handleInput = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const getAttribute = () => {
    setIsLoading(true);
    axios.get(`/attribute`).then((res) => {
      setAttributes(res.data.data);
      setItemsCountPerPage(res.data.meta.per_page);
      setStartFrom(res.data.meta.from);
      setTotalItemCount(res.data.meta.total);
      setActivePage(res.data.meta.current_page);
      setIsLoading(false);
    });
  };

  const handleAttributeCreate = () => {
    console.log(input);
    setIsLoading(true);
    axios
      .post(`/attribute`, input)
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
        setErrors([]);
        setModalShow(false);
        getAttribute();
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  const handleAttributeUpdate = (id) => {
    setIsLoading(true);
    axios
      .put(`/attribute/${id}`, input)
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
        setErrors([]);
        setModalShow(false);
        setInput({ status: 1 });
        getAttribute();
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  const handleAttributeModal = (attribute = null) => {
    setInput({ status: 1 });
    if (attribute != null) {
      setModalTitle("Update");
      setIsEditMode(true);
      setInput({
        status: attribute.original_status,
        name: attribute.name,
        id: attribute.id,
      });
    } else {
      setModalTitle("Add");
      setIsEditMode(false);
    }
    setErrors([]);
    setModalShow(true);
  };

  const handleAttributeDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Attribute will be Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/attribute/${id}`).then((res) => {
          getAttribute();
          Swal.fire({
            position: "top-end",
            icon: res.data.cls,
            title: res.data.message,
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          });
        });
      }
    });
  };

  const handleAttributeValueCreate = () => {
    setIsLoading(true);
    axios
      .post(`/value`, input)
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
        setErrors([]);
        setInput({ status: 1 });
        setValueModalShow(false);
        getAttribute();
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  const handleValueDetailsModal = (value, name) => {
    setModalValue(value);
    setValueAttributeName(name);
    setModalValueShow(true);
  };

  const handleValueDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Attribute Value will be Deleted",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Delete it",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/value/${id}`).then((res) => {
          getAttribute();
          Swal.fire({
            position: "top-end",
            icon: res.data.cls,
            title: res.data.message,
            showConfirmButton: false,
            toast: true,
            timer: 1500,
          });
        });
      }
    });
  };

  const handleValueCreateModal = (id, name) => {
    setValueModalShow(true);
    setIsEditMode(false);
    setValueModalTitle("Add");
    setValueModalHeading(name);
    setInput({ status: 1, attribute_id: id });
  };

  const handleValueUpdateModal = (value, name) => {
    setIsEditMode(true);
    setValueModalShow(true);
    setValueModalTitle("Update");
    setValueModalHeading(name);
    setInput({
      status: value.status_original,
      name: value.name,
      id: value.id,
    });
  };

  const handleValueEdit = () => {
    setIsLoading(true);
    axios
      .put(`/value/${input.id}`, input)
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
        setErrors([]);
        setInput({ status: 1 });
        setValueModalShow(false);
        getAttribute();
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status === 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  useEffect(() => {
    getAttribute();
  }, []);

  return (
    <>
      <BreadCrumb title={"Product Attribute"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h3 className="text-theme">Product Attribute</h3>
                <button
                  onClick={() => handleAttributeModal()}
                  className="btn main-btn"
                >
                  <i class="fa-solid fa-plus"></i> Add
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                {isLoading ? (
                  <Loader />
                ) : (
                  <div className="table-responsive soft-landing">
                    <table className="table text-center table-responsive table-bordered align-middle table-hover table-striped">
                      <thead>
                        <tr>
                          <th>SL</th>
                          <th>Name</th>
                          <th>value</th>
                          <th>Status</th>
                          <th>Created By</th>
                          <th>Date Time</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Object.keys(attributes).length > 0 ? (
                          attributes.map((attribute, index) => (
                            <tr key={index}>
                              <td>{startFrom + index}</td>
                              <td>{attribute.name}</td>
                              <td>
                                <div className="value-container-parent">
                                  {attribute.value !== undefined
                                    ? attribute.value.map((value, valIndex) => (
                                        <div className="value-container">
                                          {value.name}
                                          <div className="value-buttons">
                                            <button
                                              onClick={() =>
                                                handleValueDetailsModal(
                                                  value,
                                                  attribute.name
                                                )
                                              }
                                              className="btn btn-primary"
                                            >
                                              <i class="fa-solid fa-eye"></i>
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleValueUpdateModal(
                                                  value,
                                                  attribute.name
                                                )
                                              }
                                              className="btn btn-warning"
                                            >
                                              <i class="fa-solid fa-pen-to-square"></i>
                                            </button>
                                            <button
                                              onClick={() =>
                                                handleValueDelete(value.id)
                                              }
                                              className="btn btn-danger"
                                            >
                                              <i class="fa-solid fa-trash-can"></i>
                                            </button>
                                          </div>
                                        </div>
                                      ))
                                    : null}
                                  <button
                                    onClick={() =>
                                      handleValueCreateModal(
                                        attribute.id,
                                        attribute.name
                                      )
                                    }
                                    className="btn small-button"
                                  >
                                    <i class="fa-solid fa-plus"></i>
                                  </button>
                                </div>
                              </td>
                              <td>{attribute.status}</td>
                              <td>{attribute.created_by}</td>
                              <td>
                                <p className="text-theme">
                                  <small>
                                    <strong>Created Date :</strong>{" "}
                                    {attribute.created_at}
                                  </small>
                                </p>
                                <p className="text-success">
                                  <small>
                                    <strong>Updated Date :</strong>{" "}
                                    {attribute.updated_at}
                                  </small>
                                </p>
                              </td>
                              <td>
                                <button
                                  className="btn btn-sm btn-warning mx-1 my-1"
                                  onClick={() =>
                                    handleAttributeModal(attribute)
                                  }
                                >
                                  <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-danger my-1"
                                  onClick={() =>
                                    handleAttributeDelete(attribute.id)
                                  }
                                >
                                  <i class="fa-solid fa-trash-can"></i>
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <DataNotFound />
                        )}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
            <div className="card-footer">
              <nav className="pagination">
                <Pagination
                  activePage={activePage}
                  itemsCountPerPage={itemsCountPerPage}
                  totalItemsCount={totalItemCount}
                  pageRangeDisplayed={5}
                  onChange={getAttribute}
                  nextPageText={"Next"}
                  firstPageText={"First"}
                  prevPageText={"Previous"}
                  lastPageText={"Last"}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </nav>
            </div>
          </div>
        </div>
      </div>
      <Modal centered show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {modalTitle} Product Attribute
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="w-100">
            <p>Attribute Name</p>
            <input
              className={
                errors.name !== undefined
                  ? "form-control mt-2 is-invalid"
                  : "form-control mt-2"
              }
              name={"name"}
              type={"text"}
              value={input.name}
              placeholder={"Enter attribute name"}
              onChange={handleInput}
            />
            <p className="login-error-msg">
              <small>{errors.name !== undefined ? errors.name[0] : null}</small>
            </p>
          </label>
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
                {errors.status !== undefined ? errors.status[0] : null}
              </small>
            </p>
          </label>
          <button
            className="btn main-btn mt-3"
            onClick={
              isEditMode
                ? () => handleAttributeUpdate(input.id)
                : handleAttributeCreate
            }
            dangerouslySetInnerHTML={{
              __html: isLoading
                ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                : `${modalTitle} Attribute`,
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={valueModalShow}
        onHide={() => setValueModalShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {valueModalTitle} Attribute Value
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label className="w-100">
            <h5 className="mb-3 py-2 px-3 rounded-1 bg-theme text-white">
              Attribute Name - {valueModalHeading}
            </h5>
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
              placeholder={"Enter attribute name"}
              onChange={handleInput}
            />
            <p className="login-error-msg">
              <small>{errors.name !== undefined ? errors.name[0] : null}</small>
            </p>
          </label>
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
                {errors.status !== undefined ? errors.status[0] : null}
              </small>
            </p>
          </label>
          <button
            className="btn main-btn mt-3"
            onClick={
              isEditMode
                ? () => handleValueEdit(input.id)
                : () => handleAttributeValueCreate()
            }
            dangerouslySetInnerHTML={{
              __html: isLoading
                ? '<span class="spinner-grow spinner-grow-sm" aria-hidden="true"></span> Loading...'
                : `${valueModalTitle} Value`,
            }}
          />
        </Modal.Body>
      </Modal>

      <Modal
        centered
        show={modalValueShow}
        onHide={() => setModalValueShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Value Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="bg-theme p-2 mb-3">
            Attribute Name - {valueAttributeName}
          </h5>
          <table className="table table-bordered table-hover table-striped">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{modalValue.id}</td>
              </tr>
              <tr>
                <th>Name</th>
                <td>{modalValue.name}</td>
              </tr>
              <tr>
                <th>Status</th>
                <td>{modalValue.status}</td>
              </tr>
              <tr>
                <th>Created By</th>
                <td>{modalValue.created_by}</td>
              </tr>
              <tr>
                <th>Date Time</th>
                <td>
                  <p>Created Date: {modalValue.created_at}</p>
                  <p>Updated Date: {modalValue.updated_at}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ProductAttribute;
