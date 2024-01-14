import {
  BrowserRouter, Routes, Route, Navigate,
} from 'react-router-dom';
import { Provider, ErrorBoundary } from '@rollbar/react'; // Provider imports 'rollbar'
import { ToastContainer } from 'react-toastify';

import PrivateRoute from './components/private-route';
import Header from './components/header/header.jsx';
import Login from './pages/login/login.jsx';
import Chat from './pages/chat/chat.jsx';
import SignUp from './pages/sign-up/sign-up.jsx';
import NotFound from './pages/not-found/not-found.jsx';

const rollbarConfig = {
  accessToken: '72e925b427ae45e9ae7b44e45d799596',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

export const App = ({ socket }) => (
  <Provider config={rollbarConfig}>
    <ErrorBoundary>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <Header />
          <Routes>
            <Route
              path="/"
              element={(
                <PrivateRoute>
                  <Chat socket={socket} />
                </PrivateRoute>
                )}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        closeOnClick
      />
    </ErrorBoundary>
  </Provider>
);

export default {};
