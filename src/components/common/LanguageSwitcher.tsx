import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="relative inline-block text-left">
      <div className="flex items-center space-x-1 text-sm font-medium text-gray-700 cursor-pointer hover:text-primary-600">
        <Globe size={16} />
        <select
          value={currentLanguage}
          onChange={(e) => changeLanguage(e.target.value)}
          className="bg-transparent appearance-none cursor-pointer pr-8 focus:outline-none"
        >
          <option value="en">{t('language.en')}</option>
          <option value="id">{t('language.id')}</option>
        </select>
      </div>
    </div>
  );
};

export default LanguageSwitcher;