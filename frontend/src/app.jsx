import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from './components/private-route';
import Header from './components/header/header.jsx';
import Login from './pages/login/login.jsx';
import MainPage from './pages/main-page/main-page.jsx';
import SignUp from './pages/sign-up/sign-up.jsx';
import NotFound from './pages/not-found/not-found.jsx';

export const App = ({ socket }) => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <div>root</div>
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<div>signup</div>} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}