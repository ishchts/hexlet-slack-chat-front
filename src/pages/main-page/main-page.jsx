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
import { getChatData } from '../../store/feature/chat/action.js';
import { setCurrentChannel } from '../../store/feature/chat/chat-slice.js';

import './main-page.scss';

const MainPage = () => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const { data: { channels, currentChannelId, messages } } = chat;

  const handleChangeChannel = (channelId) => (e) => {
    e.preventDefault();
    dispatch(setCurrentChannel(channelId));
  };

  useEffect(() => {
    dispatch(getChatData());
  }, []);

  const currentChannel = channels.find((el) => el.id === currentChannelId);
  const currentMessages = messages.filter((el) => el.channelId === currentChannelId);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ((values) => {
      console.log('values', values);
    }),
  });

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
          <Col className="p-0" xs={10}>
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui, sunt!
              </div>
              <div className="mt-auto px-5 py-3">
                <form className="add-message-form" onSubmit={formik.handleSubmit}>
                  <InputGroup className="mb-3">
                    <FormControl
                      name="body"
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
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MainPage;
