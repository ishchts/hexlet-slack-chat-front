import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import { Button, Form, Modal } from 'react-bootstrap';
import * as yup from 'yup';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getChannelNames } from '../../../store/feature/chat/chat-selectors';

const createRenameValidationSchema = (channelNames, t) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, t('field.name.min'))
    .max(20, t('field.name.max'))
    .required(t('field.mixed.required'))
    .test({
      name: 'name',
      message: t('field.name.uniq'),
      test: (value) => {
        if (!value) {
          return false;
        }

        return !channelNames.includes(value);
      },
    }),
});

const RenameChannel = ({ modalInfo, handleCloseModal, handleSubmitModal }) => {
  const { t } = useTranslation();
  const inputNameRef = useRef(null);
  const channelNames = useSelector(getChannelNames);

  const formik = useFormik({
    initialValues: {
      id: modalInfo.item.id,
      name: modalInfo.item.name,
    },
    validationSchema: createRenameValidationSchema(channelNames, t),
    onSubmit: (values) => handleSubmitModal(values),
  });

  const handleCancel = () => {
    handleCloseModal();
    formik.resetForm();
  };

  useEffect(() => {
    inputNameRef?.current?.select();
  }, [modalInfo]);

  return (
    <Modal show={Boolean(modalInfo.type)} onHide={handleCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              name="name"
              type="text"
              data-testid="add-channel"
              className="mb-2 form-control"
              value={formik.values.name}
              onChange={formik.handleChange}
              ref={inputNameRef}
              isInvalid={formik.touched.name && Boolean(formik.errors.name)}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button type="reset" onClick={handleCancel} variant="secondary mr-2">Отменить</Button>
              <Button type="submit" variant="primary" disabled={formik.isSubmitting}>Отправить</Button>
            </div>
          </Form.Group>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default RenameChannel;
