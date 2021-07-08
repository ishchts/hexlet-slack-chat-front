import React, { memo, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, Form, Modal } from 'react-bootstrap';
import { getChannelNames } from '../../../store/feature/chat/chat-selectors.js';

const createChannelSchema = (channelNames) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов')
    .required('Обязательное поле')
    .test({
      name: 'name',
      message: 'Должно быть уникальным',
      test: (value) => {
        if (!value) {
          return false;
        }

        return !channelNames.includes(value);
      },
    }),
});

const AddChannel = memo(({ modalInfo, handleCloseModal, handleSubmitModal }) => {
  const inputNameRef = useRef(null);
  const channelNames = useSelector(getChannelNames);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: createChannelSchema(channelNames),
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
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
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
});

export default AddChannel;
