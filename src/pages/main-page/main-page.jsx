import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
  Dropdown,
  ButtonGroup,
} from 'react-bootstrap';
import { PlusSquare, ArrowRightSquare } from 'react-bootstrap-icons';
import { getChatData } from '../../store/feature/chat/action.js';
import {
  setCurrentChannel, addMessage, addChannel, renameChannel, removeChannel,
} from '../../store/feature/chat/chat-slice.js';
import { getChat } from '../../store/feature/chat/chat-selectors';
import { getModal, MODAL_NAMES } from '../../components/modals';

import './main-page.scss';

const MainPage = ({ socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const chat = useSelector(getChat);
  const { data: { channels, currentChannelId, messages } } = chat;
  const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const ModalComponent = getModal(modalInfo.type ?? MODAL_NAMES.adding);
  const handleCloseModal = () => setModalInfo({ type: null, item: null });
  const handleShowModal = (type, item = null) => () => setModalInfo({ type, item });
  const handleSubmitModal = (values) => {
    if (modalInfo.type === MODAL_NAMES.adding) {
      socket.emit('newChannel', values, (response) => {
        if (response.status !== 'ok') {
          return;
        }
        dispatch(addChannel(response.data));
        dispatch(setCurrentChannel(response.data.id));
      });
    }

    if (modalInfo.type === MODAL_NAMES.renaming) {
      socket.emit('renameChannel', values, (response) => {
        if (response.status !== 'ok') {
          return;
        }
        dispatch(renameChannel(values));
      });
    }

    if (modalInfo.type === MODAL_NAMES.removing) {
      socket.emit('removeChannel', values, () => {
        dispatch(removeChannel({ channelId: values.id }));
      });
    }

    handleCloseModal();
  };

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
      socket.emit('newMessage', newMessage, () => {
        /*
        if (response.status === 'ok') {
          console.log('newMessage ok');
        }
        */
      });

      resetForm();
    }),
  });

  useEffect(() => {
    dispatch(getChatData());
    socket.on('newMessage', (newMessage) => {
      dispatch(addMessage(newMessage));
    });
  }, [dispatch, socket]);

  useEffect(() => {
    document.querySelector('.chat-messages').scroll({
      top: 999999,
    });
  }, [messages]);

  return (
    <>
      <div className="main-page rounded shadow">
        <Container fluid>
          <Row>
            <Col className="main-page__sidebar border-end bg-light pt-5" xs={2}>
              <div className="d-flex justify-content-between align-items-center">
                {t('channels')}
                <Button
                  role="button"
                  onClick={handleShowModal(MODAL_NAMES.adding)}
                  className="main-page__add-channel-button"
                  size="sm"
                >
                  <PlusSquare color="#007bff" size="18" />
                  +
                </Button>
              </div>
              <ul className="channelList">
                {channels.map((el) => (
                  <li key={el.id}>
                    <Dropdown className="w-100" as={ButtonGroup}>
                      <Button
                        role="button"
                        className="w-100 rounded-0 text-start text-truncate"
                        variant={el.id === currentChannelId ? 'secondary' : null}
                        onClick={handleChangeChannel(el.id)}
                      >
                        {el.name}
                      </Button>

                      { el.removable && (
                      <Dropdown.Toggle
                        className="flex-grow-0"
                        split
                        variant={el.id === currentChannelId ? 'secondary' : null}
                      />
                      )}
                      { el.removable && (
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={handleShowModal(MODAL_NAMES.removing, el)}>
                          {t('remove')}
                        </Dropdown.Item>
                        <Dropdown.Item onClick={handleShowModal(MODAL_NAMES.renaming, el)}>
                          {t('rename')}
                        </Dropdown.Item>
                      </Dropdown.Menu>
                      )}
                    </Dropdown>
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
                  {t('messages', { count: currentMessages.length })}
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
                      size="lg"
                      data-testid="new-message"
                    />
                    <InputGroup.Append>
                      <Button
                        type="submit"
                        disabled={formik.isSubmitting}
                      >
                        <ArrowRightSquare size="20" />
                        <span className="invisible d-none">
                          {t('button.send')}
                        </span>
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                </form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <ModalComponent
        modalInfo={modalInfo}
        handleCloseModal={handleCloseModal}
        handleSubmitModal={handleSubmitModal}
      />
    </>
  );
};

export default MainPage;
