import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { ModalTitle } from '../components/ModalTitle';

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
      <ModalTitle>
        {t('modal.removeChannel.title')}
      </ModalTitle>
      <Modal.Body>
        <p className="lead">{t('modal.removeChannel.caption')}</p>
        <div className="d-flex justify-content-end">
          <Button
            className="me-2"
            role="button"
            onClick={handleCancel}
            variant="secondary"
          >
            {t('button.cancel')}
          </Button>
          <Button
            role="button"
            onClick={handleRemove}
            variant="danger"
          >
            {t('button.remove')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
