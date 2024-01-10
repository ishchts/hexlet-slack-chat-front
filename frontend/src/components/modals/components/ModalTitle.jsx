import React from "react";
import { Modal } from 'react-bootstrap';

export const ModalTitle = ({ children }) => {
    return (
      <Modal.Header closeButton>
        <Modal.Title>{children}</Modal.Title>
      </Modal.Header>
    )
}