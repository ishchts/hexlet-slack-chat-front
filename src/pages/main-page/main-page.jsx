import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { PlusSquare, ArrowRightSquare } from 'react-bootstrap-icons';
import { io } from 'socket.io-client';
import { getChatData } from '../../store/feature/chat/action.js';
import { setCurrentChannel, addMessage } from '../../store/feature/chat/chat-slice.js';

import './main-page.scss';

const socket = io();

socket.on('connect', () => {
  console.log(socket.connected); // true
});

const MainPage = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const { data: { channels, currentChannelId, messages } } = chat;

  const handleChangeChannel = (channelId) => (e) => {
    e.preventDefault();
    dispatch(setCurrentChannel(channelId));
  };

  const currentChannel = channels.find((el) => el.id === currentChannelId);
  const currentMessages = messages.filter((el) => el.channelId === currentChannelId);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ((values, { resetForm }) => {
      const username = localStorage.getItem('username');
      const newMessage = {
        ...values,
        channelId: currentChannelId,
        username,
      };

      socket.emit('newMessage', newMessage, (response) => {
        if (response.status === 'ok') {
          dispatch(addMessage(newMessage));
        }
      });

      resetForm();
    }),
  });

  useEffect(() => {
    dispatch(getChatData());
  }, []);

  return (
    <div className="main-page rounded shadow">
      <Container fluid>
        <Row>
          <Col className="main-page__sidebar border-end bg-light pt-5" xs={2}>
            <div className="d-flex justify-content-between align-items-center">
              Каналы
              <Button className="main-page__add-channel-button" size="sm">
                <PlusSquare color="#007bff" size="18" />
              </Button>
            </div>
            <ul className="channelList">
              {channels.map((el) => (
                <li key={el.id}>
                  <Button
                    disabled={el.id === currentChannelId}
                    variant="dark"
                    onClick={handleChangeChannel(el.id)}
                  >
                    #
                    {el.name}
                  </Button>
                </li>
              ))}
            </ul>
          </Col>
          <Col className="col p-0 d-flex main-page__content" xs={10}>
            <div className="bg-light mb-4 p-3 shadow-sm small main-page__content-header">
              <p className="m-0">
                <b>
                  #
                  {currentChannel?.name}
                </b>
              </p>
              <span className="text-muted">
                {currentMessages.length}
                {' '}
                сообщений
              </span>
            </div>
            <div className="chat-messages overflow-auto px-5 ">
              {currentMessages.map((el) => (
                <div key={el.id} className="text-break mb-2">
                  <b>{el.username}</b>
                  :
                  {' '}
                  {el.body}
                </div>
              ))}
            </div>
            <div className="mt-auto px-5 py-3 main-page__content-footer">
              <form className="add-message-form" onSubmit={formik.handleSubmit}>
                <InputGroup className="mb-3">
                  <FormControl
                    name="body"
                    value={formik.values.body}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Введите сообщение..."
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    size="lg"
                    data-testid="new-message"
                  />
                  <InputGroup.Append>
                    <button
                      type="submit"
                      aria-label="add-message"
                      disabled={formik.values.body.length === 0}
                    >
                      <ArrowRightSquare size="20" />
                    </button>
                  </InputGroup.Append>
                </InputGroup>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainPage;
