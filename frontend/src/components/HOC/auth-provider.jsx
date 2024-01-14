import React, { useState, useCallback, useMemo } from 'react';
import { authContext } from '../../context';

const AuthProvider = ({ children }) => {
  const userToken = localStorage.getItem('token');

  const [isLoggedIn, setLoggedIn] = useState(!!userToken);

  const logIn = useCallback((token, username) => {
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
    setLoggedIn(true);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedIn(false);
  }, []);

  const values = useMemo(() => ({ isLoggedIn, logIn, logOut }), [isLoggedIn]);

  return (
    <authContext.Provider value={values}>
      {children}
    </authContext.Provider>
  );
};

export default AuthProvider;
