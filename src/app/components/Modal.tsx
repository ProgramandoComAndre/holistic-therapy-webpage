import React from 'react';
import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

const ModalComponent = ({ show, onHide, title, body, footer }) => {
  const [modalShow, setModalShow] = useState(show);

  const handleClose = () => {
    
    setModalShow(false);
    onHide();
  };

  return (
    <Modal
      show={modalShow}
      onHide={handleClose}
      aria-labelledby="example-modal-title"
      aria-describedby="example-modal-description"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-title">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body id="example-modal-description">
        {body}
      </Modal.Body>
      <Modal.Footer>
        {footer}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;