import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import omit from 'lodash/omit';
import { useFormik } from 'formik';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import {
  Button, Card, Col, Container, Form, Toast,
} from 'react-bootstrap';
import ApiService from '../../services/api-service.js';

const createSignUpSchema = (t) => yup.object().shape({
  username: yup
    .string()
    .trim()
    .required(t('field.mixed.required'))
    .min(3, t('field.name.min'))
    .max(20, t('field.name.max')),
  password: yup
    .string()
    .trim()
    .required(t('field.mixed.required'))
    .min(6, t('field.password.min')),
  confirmPassword: yup
    .string()
    .required(t('field.mixed.required'))
    .oneOf([yup.ref('password')], t('field.confirmPassword.repeat')),
});

const SignUp = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: createSignUpSchema(t),
    onSubmit: ((values, { setStatus, setSubmitting }) => {
      ApiService.signUp(omit(values, 'confirmPassword'))
        .then(() => {
          setStatus(null);
          history.push('/login');
        })
        .catch(() => {
          setStatus(t('thisUserAlreadyExists'));
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
        <Toast.Header>{t('mistake')}</Toast.Header>
        <Toast.Body>{formik.status}</Toast.Body>
      </Toast>
      )}
      <Card className="card">
        <Card.Body>
          <Card.Title>{t('registration')}</Card.Title>
          <form onSubmit={formik.handleSubmit}>
            <Form.Group
              as={Col}
              className="position-relative"
            >
              <Form.Label htmlFor="username">{t('username')}</Form.Label>
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
              <Form.Label htmlFor="password">{t('password')}</Form.Label>
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
              <Form.Label htmlFor="confirmPassword">{t('repeatPassword')}</Form.Label>
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
              {t('register')}
            </Button>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
