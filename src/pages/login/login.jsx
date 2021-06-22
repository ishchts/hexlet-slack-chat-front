import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button, Card, Container, Col, Form,
} from 'react-bootstrap';

import './login.scss';

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required(),
});

export default () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: (values) => console.log('values', values),
  });

  return (
    <Container fluid className="container">
      <Card className="card">
        <Card.Body>
          <Card.Title>Войти</Card.Title>
          <form onSubmit={formik.handleSubmit}>
            <Form.Group
              as={Col}
              className="position-relative"
            >
              <Form.Label>Ваш ник</Form.Label>
              <Form.Control
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
              <Form.Label>Ваш пароль</Form.Label>
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
            <Button type="submit" variant="outline-primary" size="lg">Войти</Button>
          </form>
        </Card.Body>
        <Card.Footer>
          <div className="text-center">
            Нет аккаунта? Регистрация
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};
