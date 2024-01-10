import React, { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { getChannelNames } from '../../../store/feature/chat/chat-selectors.js';
import { createUpdateValidationSchema } from '../../../utils/validation.js';
import { ModalTitle } from '../components/ModalTitle';

const AddChannel = memo(({ modalInfo, handleCloseModal, handleSubmitModal }) => {
  const { t } = useTranslation();
  const inputNameRef = useRef(null);
  const channelNames = useSelector(getChannelNames);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: createUpdateValidationSchema(channelNames, t),
    onSubmit: ((values, { resetForm }) => {
      handleSubmitModal(values);
      resetForm();
    }),
  });

  const handleCancel = () => {
    handleCloseModal();
    formik.resetForm();
  };

  useEffect(() => {
    inputNameRef?.current?.focus();
  }, [modalInfo]);

  return (
    <Modal show={Boolean(modalInfo.type)} onHide={handleCancel} centered>
      <ModalTitle>
        {t('modal.addChannel.title')}
      </ModalTitle>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              id="name"
              name="name"
              type="text"
              className="mb-2 form-control"
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputNameRef}
              isInvalid={formik.touched.name && Boolean(formik.errors.name)}
            />
            <Form.Label className="visually-hidden" htmlFor="name">{t('channels.channelName')}</Form.Label>
            <Form.Control.Feedback
              type="invalid"
              >
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button
                className="me-2"
                role="button" type="reset"
                onClick={handleCancel}
                variant="secondary"
              >
                {t('button.cancel')}
              </Button>
              <Button
                role="button"
                type="submit"
                variant="primary"
                disabled={formik.isSubmitting}
              >
                {t('button.send')}
              </Button>
            </div>
          </Form.Group>
        </form>
      </Modal.Body>
    </Modal>
  );
});

export default AddChannel;
