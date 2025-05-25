import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative bg-gradient-to-r from-primary-900 to-secondary-900 text-white">
      <div className="absolute inset-0 bg-black opacity-30"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1600)', 
          backgroundBlendMode: 'overlay',
          filter: 'brightness(0.7)'
        }}
      ></div>
      
      <div className="container-custom mx-auto relative z-10 py-20 md:py-28 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white leading-tight animate-fade-in">
            {t('home.hero.title')}
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            {t('home.hero.subtitle')}
          </p>
          
          <div className="bg-white rounded-lg shadow-lg p-2 flex animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex-grow">
              <div className="flex items-center pl-4">
                <Search size={20} className="text-gray-500" />
                <input
                  type="text"
                  placeholder={t('fields.search')}
                  className="w-full p-2 focus:outline-none text-gray-800 placeholder-gray-500"
                />
              </div>
            </div>
            <Link to="/fields" className="btn-primary">
              {t('home.hero.cta')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;