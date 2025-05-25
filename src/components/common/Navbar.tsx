import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, User, Calendar, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import LanguageSwitcher from './LanguageSwitcher';

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
      <div className="container-custom mx-auto">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">F</span>
            </div>
            <span className="font-bold text-lg text-gray-900">{t('app.name')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium ${isActive('/') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors`}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/fields" 
              className={`text-sm font-medium ${isActive('/fields') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors`}
            >
              {t('nav.fields')}
            </Link>
            {isAuthenticated && (
              <Link 
                to="/bookings" 
                className={`text-sm font-medium ${isActive('/bookings') ? 'text-primary-600' : 'text-gray-700 hover:text-primary-600'} transition-colors`}
              >
                {t('nav.bookings')}
              </Link>
            )}
          </div>

          {/* Right Section - Auth & Language */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <User size={16} className="text-primary-600" />
                    </div>
                  )}
                  <span>{user?.name}</span>
                  <ChevronDown size={16} />
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <User size={16} />
                        <span>{t('nav.profile')}</span>
                      </div>
                    </Link>
                    <Link
                      to="/bookings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <div className="flex items-center space-x-2">
                        <Calendar size={16} />
                        <span>{t('nav.bookings')}</span>
                      </div>
                    </Link>
                    {user?.role === 'admin' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <span>{t('nav.admin')}</span>
                      </Link>
                    )}
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                    >
                      <div className="flex items-center space-x-2">
                        <LogOut size={16} />
                        <span>{t('logout')}</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="btn-outline">
                  {t('login')}
                </Link>
                <Link to="/signup" className="btn-primary">
                  {t('signup')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={24} />
              ) : (
                <Menu size={24} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 animate-fade-in">
          <div className="flex flex-col space-y-4 pt-2 pb-3 border-t border-gray-200">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-md text-base font-medium ${isActive('/') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
              onClick={closeMenu}
            >
              {t('nav.home')}
            </Link>
            <Link 
              to="/fields" 
              className={`px-3 py-2 rounded-md text-base font-medium ${isActive('/fields') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
              onClick={closeMenu}
            >
              {t('nav.fields')}
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/bookings" 
                  className={`px-3 py-2 rounded-md text-base font-medium ${isActive('/bookings') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  {t('nav.bookings')}
                </Link>
                <Link 
                  to="/profile" 
                  className={`px-3 py-2 rounded-md text-base font-medium ${isActive('/profile') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
                  onClick={closeMenu}
                >
                  {t('nav.profile')}
                </Link>
                {user?.role === 'admin' && (
                  <Link 
                    to="/admin" 
                    className={`px-3 py-2 rounded-md text-base font-medium ${isActive('/admin') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'}`}
                    onClick={closeMenu}
                  >
                    {t('nav.admin')}
                  </Link>
                )}
                <button
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={() => {
                    logout();
                    closeMenu();
                  }}
                >
                  <LogOut size={18} className="mr-2" />
                  {t('logout')}
                </button>
              </>
            )}
            {!isAuthenticated && (
              <div className="flex flex-col space-y-2">
                <Link 
                  to="/login" 
                  className="btn-outline w-full"
                  onClick={closeMenu}
                >
                  {t('login')}
                </Link>
                <Link 
                  to="/signup" 
                  className="btn-primary w-full"
                  onClick={closeMenu}
                >
                  {t('signup')}
                </Link>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200">
              <div className="flex items-center px-3 py-2">
                <Globe size={18} className="text-gray-500 mr-2" />
                <span className="text-sm font-medium text-gray-700">{t('language')}</span>
              </div>
              <div className="pl-8 pr-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;