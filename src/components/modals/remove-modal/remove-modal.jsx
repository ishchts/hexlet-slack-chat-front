import React from 'react';
import { Button, Modal } from 'react-bootstrap';

const RemoveModal = ({ modalInfo, handleCloseModal, handleSubmitModal }) => {
  const handleCancel = () => {
    handleCloseModal();
  };

  const handleRemove = () => {
    handleSubmitModal(modalInfo.item);
  };

  return (
    <Modal show={Boolean(modalInfo.type)} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button onClick={handleCancel} className="mr-2" variant="secondary">Отменить</Button>
          <Button onClick={handleRemove} variant="danger">Удалить</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveModal;
