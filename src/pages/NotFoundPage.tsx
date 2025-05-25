import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Layout from '../components/common/Layout';
import { Home } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <div className="bg-gray-50 py-16 min-h-[calc(100vh-64px)] flex items-center">
        <div className="container-custom text-center">
          <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/" className="btn-primary inline-flex items-center">
            <Home size={18} className="mr-2" />
            {t('nav.home')}
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;