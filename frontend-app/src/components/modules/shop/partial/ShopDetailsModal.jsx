import React from "react";
import Modal from "react-bootstrap/Modal";

const ShopDetailsModal = (props) => {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="shop_details_modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="shop_details_modal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <table className="category-table table text-center table-hover table-striped table-bordered">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{props.shop.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{props.shop.name}</td>
            </tr>
            {/* {props.category.category_name !== undefined ? (
              <tr>
                <th>Category Name</th>
                <td>{props.category.category_name}</td>
              </tr>
            ) : null} */}
            <tr>
              <th>Details</th>
              <td>{props.shop.details}</td>
            </tr>
            <tr>
              <th>Status</th>
              <td>{props.shop.status}</td>
            </tr>
            <tr>
              <th>Created By</th>
              <td>{props.shop.created_by}</td>
            </tr>
            <tr>
              <th>Created At</th>
              <td>{props.shop.created_at}</td>
            </tr>
            <tr>
              <th>Updated At</th>
              <td>{props.shop.updated_at}</td>
            </tr>
            <tr>
              <th>Photo</th>
              <td>
                <img
                  src={props.shop.logo}
                  className="img-thumbnail"
                  alt="shop-logo"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default ShopDetailsModal;
