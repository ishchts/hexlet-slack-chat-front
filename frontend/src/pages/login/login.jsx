import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button, Card, Container, Col, Form,
} from 'react-bootstrap';
import { toast } from 'react-toastify';

import ApiService from '../../services/api-service.js';
import { useAuth } from '../../hooks';

import './login.scss';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  const { t } = useTranslation();
  const { isLoggedIn, logIn } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      try {
        const res = await ApiService.login(values);

        logIn(res.data.token, res.data.username);
        navigate('/');
      } catch (e) {
        toast.error(t('toast.login.error'));
      }
    },
  });

  const formRef = useRef(null);

  useEffect(() => {
    formRef.current?.querySelector('input').focus();
  }, []);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <Container fluid className="container">
      <Card className="card">
        <Card.Body>
          <Card.Title>{t('logIn')}</Card.Title>
          <form ref={formRef} onSubmit={formik.handleSubmit}>
            <Form.Group
              as={Col}
              className="position-relative"
            >
              <Form.Label htmlFor="username">{t('field.username.label')}</Form.Label>
              <Form.Control
                id="username"
                type="text"
                name="username"
                placeholder={t('field.username.label')}
                value={formik.values.username}
                onChange={formik.handleChange}
                isValid={formik.touched.username && !formik.errors.username}
                isInvalid={formik.touched.username && !!formik.errors.username}
                size="lg"
              />
            </Form.Group>
            <Form.Group
              as={Col}
              className="position-relative"
            >
              <Form.Label htmlFor="password">{t('field.password.label')}</Form.Label>
              <Form.Control
                id="password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                isValid={formik.touched.password && !formik.errors.password}
                isInvalid={formik.touched.password && !!formik.errors.password}
                size="lg"
              />
            </Form.Group>
            <Button
              className="mt-3"
              type="submit"
              role="button"
              variant="outline-primary"
              size="lg"
              disabled={formik.isSubmitting}
            >
              {t('button.login')}
            </Button>
          </form>
        </Card.Body>
        <Card.Footer>
          <div className="text-center">
            {t('noAccount')}
            {' '}
            <Link to="/signup">{t('registration')}</Link>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default Login;
