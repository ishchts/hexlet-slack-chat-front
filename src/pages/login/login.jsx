import React, { useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Button, Card, Container, Col, Form, Toast,
} from 'react-bootstrap';
import ApiService from '../../services/api-service.js';
import { useAuth } from '../../utils/hooks.js';

import './login.scss';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default ({ history }) => {
  const { t } = useTranslation();
  const auth = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      setSubmitting(true);
      try {
        const resp = await ApiService.login(values);

        auth.logIn(resp.data.token, resp.data.username);
        setStatus(null);
        history.push('/');
      } catch (e) {
        setStatus('Неверные имя пользователя или пароль');
      } finally {
        setSubmitting(false);
      }
    },
  });

  const formRef = useRef(null);

  useEffect(() => {
    formRef.current.querySelector('input').focus();
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
              type="submit"
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
