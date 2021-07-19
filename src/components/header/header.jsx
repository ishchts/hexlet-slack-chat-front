import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';
import { useAuth } from '../../utils/hooks';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const handleLogout = () => {
    auth.logOut();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container"><a className="navbar-brand" href="/">{t('logoTitle')}</a></div>
      {auth.isLoggedIn && (
        <Button onClick={handleLogout} variant="primary">{t('button.exit')}</Button>
      )}
    </nav>
  );
};

export default Header;
