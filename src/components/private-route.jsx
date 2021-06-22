import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../utils/hooks.js';

const PrivateRoute = ({ children, ...rest }) => {
  const { isLoggedIn } = useAuth();
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...rest}>
      {isLoggedIn ? children : <Redirect to="/login" />}
    </Route>
  );
};

export default PrivateRoute;
