import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import omit from 'lodash/omit';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import {
  Button, Card, Col, Container, Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import ApiService from '../../services/api-service.js';
import { useAuth } from '../../hooks';
import { createSignUpSchema } from '../../utils/validation';

const SignUp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const auth = useAuth();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: createSignUpSchema(t),
    onSubmit: ((values, { setStatus, setSubmitting }) => {
      ApiService.signUp(omit(values, 'confirmPassword'))
        .then((res) => {
          setStatus(null);
          auth.logIn(res.data.token, res.data.username);
          navigate('/');
        })
        .catch(() => {
          toast.error(t('toast.thisUserAlreadyExists'));
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
                id="username"
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
                id="password"
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
                id="confirmPassword"
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
              className="mt-3"
              type="submit"
              role="button"
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
