import React from "react";
import { Modal } from "react-bootstrap";

const SupplierDetailModal = (props) => {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="supplier_details_modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="supplier_details_modal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <table className="category-table table text-center table-hover table-striped table-bordered">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{props.supplier.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{props.supplier.name}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{props.supplier.phone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{props.supplier.email}</td>
            </tr>
            <tr>
              <th>Description</th>
              <td>
                {props.supplier.details !== undefined
                  ? props.supplier.details
                  : props.supplier.bio}
              </td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{props.supplier.status}</td>
            </tr>
            <tr>
              <th>Created By</th>
              <td>{props.supplier.created_by}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{props.supplier.created_at}</td>
            </tr>
            <tr>
              <th>Updated At</th>
              <td>{props.supplier.updated_at}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>
                {props.supplier.address?.address}, (
                {props.supplier.address?.landmark}){" "}
                {props.supplier.address?.area},{" "}
                {props.supplier.address?.district},{" "}
                {props.supplier.address?.division},{" "}
              </td>
            </tr>
            <tr>
              <th>Photo</th>
              <td>
                <img
                  src={
                    props.supplier.logo !== undefined
                      ? props.supplier.logo
                      : props.supplier.photo
                  }
                  className="img-thumbnail"
                  alt="category-pic"
                />
              </td>
            </tr>
            {props.supplier.nid_photo !== undefined ? (
              <tr>
                <th>Nid Photo</th>
                <td>
                  <img
                    src={props.supplier.nid_photo}
                    className="img-thumbnail"
                    alt="category-pic"
                  />
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default SupplierDetailModal;
