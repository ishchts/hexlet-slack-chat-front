import React, { useEffect, useRef } from 'react';
import omit from 'lodash/omit';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import {
  Button, Card, Col, Container, Form, Toast,
} from 'react-bootstrap';
import ApiService from '../../services/api-service.js';

const SignUpSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(3, 'От 3 до 20 символов')
    .max(20, 'От 3 до 20 символов'),
  password: yup
    .string()
    .trim()
    .required('Обязательное поле')
    .min(6, 'Не менее 6 символов'),
  confirmPassword: yup
    .string()
    .required('Обязательное поле')
    .oneOf([yup.ref('password')], 'Пароли должны совпадать'),
});

const SignUp = () => {
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: ((values, { setStatus, setSubmitting }) => {
      ApiService.signUp(omit(values, 'confirmPassword'))
        .then(() => {
          setStatus(null);
          history.push('/login');
        })
        .catch(() => {
          setStatus('Такой пользователь уже существует');
        })
        .finally(() => {
          setSubmitting(false);
        });
    }),
  });

  const usernameRef = useRef(null);

  useEffect(() => {
    usernameRef?.current?.focus();
  }, []);

  return (
    <Container fluid className="container">
      {formik.status && (
      <Toast
        autohide
        delay={3000}
        show={Boolean(formik.status)}
        onClose={() => formik.setStatus(null)}
      >
        <Toast.Header>Ошибка!</Toast.Header>
        <Toast.Body>{formik.status}</Toast.Body>
      </Toast>
      )}
      <Card className="card">
        <Card.Body>
          <Card.Title>Регистрация</Card.Title>
          <form onSubmit={formik.handleSubmit}>
            <Form.Group
              as={Col}
              className="position-relative"
            >
              <Form.Label>Имя пользователя</Form.Label>
              <Form.Control
                type="text"
                name="username"
                size="lg"
                ref={usernameRef}
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.username && Boolean(formik.errors.username)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              className="position-relative"
            >
              <Form.Label>Пароль</Form.Label>
              <Form.Control
                type="password"
                name="password"
                size="lg"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && Boolean(formik.errors.password)}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group
              as={Col}
              className="position-relative"
            >
              <Form.Label>Повторите пароль</Form.Label>
              <Form.Control
                type="password"
                name="confirmPassword"
                size="lg"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={
                    formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)
                  }
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              variant="outline-primary"
              size="lg"
              disabled={formik.isSubmitting}
            >
              Зарегистрироваться
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
