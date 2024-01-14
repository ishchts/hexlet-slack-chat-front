import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="d-flex h-100 align-items-center justify-content-center">
      <div className="text-center">
        <h1 className="h4 text-muted">
          {t('notFound.header')}
        </h1>
        <p className="text-muted">
          {t('notFound.message')}
          <a href="/">{t('notFound.linkText')}</a>
        </p>
      </div>
    </div>
  );
};

export default NotFound;
