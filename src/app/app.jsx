import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthProvider from '../components/HOC/auth-provider.jsx';
import PrivateRoute from '../components/private-route.jsx';
import Header from '../components/header/header.jsx';
import Login from '../pages/login/login.jsx';
import MainPage from '../pages/main-page/main-page.jsx';
import SignUp from '../pages/sign-up/sign-up.jsx';
import NotFound from '../pages/not-found/not-found.jsx';

const App = ({ socket }) => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Header />
      <Switch>
        <PrivateRoute exact path="/">
          <MainPage socket={socket} />
        </PrivateRoute>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={SignUp} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    </div>
  </AuthProvider>
);

export default App;
