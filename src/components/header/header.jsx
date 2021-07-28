import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/hooks';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container"><Link className="navbar-brand" to="/">{t('logoTitle')}</Link></div>
      {auth.isLoggedIn && (
        <Button role="button" onClick={handleLogout} variant="primary">{t('button.exit')}</Button>
      )}
    </nav>
  );
};

export default Header;
