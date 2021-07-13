import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../utils/hooks';

const Header = () => {
  const auth = useAuth();
  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container"><a className="navbar-brand" href="/">Hexlet Chat</a></div>
      {auth.isLoggedIn && (
        <Button onClick={handleLogout} variant="primary">Выйти</Button>
      )}
    </nav>
  );
};

export default Header;
