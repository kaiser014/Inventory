import React from "react";
import Modal from "react-bootstrap/Modal";

const ShopPhotoModal = (props) => {
  return (
    <Modal
      {...props}
      size={props.size}
      aria-labelledby="shop-photo-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="shop-photo-modal">{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <img src={props.photo} className="img-thumbnail" alt="shop-pic" />
      </Modal.Body>
    </Modal>
  );
};

export default ShopPhotoModal;
