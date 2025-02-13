import React from "react";
import Modal from "react-bootstrap/Modal";

const SalesManagerDetailsModal = (props) => {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="category_details_modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="category_details_modal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <table className="category-table table text-center table-hover table-striped table-bordered">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{props.salesManager.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{props.salesManager.name}</td>
            </tr>
            <tr>
              <th>Phone</th>
              <td>{props.salesManager.phone}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{props.salesManager.email}</td>
            </tr>
            <tr>
              <th>Bio</th>
              <td>{props.salesManager.bio}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{props.salesManager.status}</td>
            </tr>
            <tr>
              <th>Created By</th>
              <td>{props.salesManager.created_by}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{props.salesManager.created_at}</td>
            </tr>
            <tr>
              <th>Updated At</th>
              <td>{props.salesManager.updated_at}</td>
            </tr>
            <tr>
              <th>Address</th>
              <td>
                {props.salesManager.address?.address}, (
                {props.salesManager.address?.landmark}){" "}
                {props.salesManager.address?.area},{" "}
                {props.salesManager.address?.district},{" "}
                {props.salesManager.address?.division},{" "}
              </td>
            </tr>
            <tr>
              <th>Photo</th>
              <td>
                <img
                  src={props.salesManager.photo}
                  className="img-thumbnail"
                  alt="category-pic"
                />
              </td>
            </tr>
            <tr>
              <th>Nid Photo</th>
              <td>
                <img
                  src={props.salesManager.nid_photo}
                  className="img-thumbnail"
                  alt="category-pic"
                />
              </td>
            </tr>
            <tr>
              <th>NID</th>
              <td>{props.salesManager.nid}</td>
            </tr>
            <tr>
              <th>Shop Name</th>
              <td>{props.salesManager.shop}</td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default SalesManagerDetailsModal;
