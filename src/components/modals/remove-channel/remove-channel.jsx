import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

const RemoveChannel = ({ modalInfo, handleCloseModal, handleSubmitModal }) => {
  const { t } = useTranslation();
  const handleCancel = () => {
    handleCloseModal();
  };

  const handleRemove = () => {
    handleSubmitModal(modalInfo.item);
  };

  return (
    <Modal show={Boolean(modalInfo.type)} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.removeChannel.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('modal.removeChannel.caption')}</p>
        <div className="d-flex justify-content-end">
          <Button onClick={handleCancel} className="mr-2" variant="secondary">{t('button.cancel')}</Button>
          <Button onClick={handleRemove} variant="danger">{t('button.remove')}</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
