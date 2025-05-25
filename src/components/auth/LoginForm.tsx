import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const LoginForm: React.FC = () => {
  const { t } = useTranslation();
  const { login, error, isLoading } = useAuth();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    
    if (!email || !password) {
      setValidationError('Please fill in all fields');
      return;
    }
    
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error is handled by the auth context
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-card max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{t('auth.login')}</h1>
      </div>
      
      <form onSubmit={handleSubmit}>
        {(error || validationError) && (
          <div className="mb-4 p-3 bg-error-50 border border-error-200 text-error-700 rounded-md flex items-start">
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <span>{validationError || error}</span>
          </div>
        )}
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            {t('auth.email')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input pl-10"
              placeholder="email@example.com"
            />
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('auth.password')}
            </label>
            <Link to="/forgot-password" className="text-sm text-primary-600 hover:text-primary-700">
              {t('auth.forgotPassword')}
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-400" />
            </div>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input pl-10"
              placeholder="••••••••"
            />
          </div>
        </div>
        
        <button
          type="submit"
          className="btn-primary w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              {t('loading')}
            </div>
          ) : (
            t('login')
          )}
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          {t('auth.noAccount')}{' '}
          <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-medium">
            {t('auth.signupNow')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;