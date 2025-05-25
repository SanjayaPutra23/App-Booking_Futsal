import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container-custom mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">F</span>
              </div>
              <span className="font-bold text-lg text-white">{t('app.name')}</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('app.tagline')}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.about')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.about')}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white transition-colors">
                  {t('footer.help')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Fields */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('nav.fields')}</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/fields?city=Jakarta" className="text-gray-400 hover:text-white transition-colors">
                  Jakarta
                </Link>
              </li>
              <li>
                <Link to="/fields?city=Bandung" className="text-gray-400 hover:text-white transition-colors">
                  Bandung
                </Link>
              </li>
              <li>
                <Link to="/fields?city=Surabaya" className="text-gray-400 hover:text-white transition-colors">
                  Surabaya
                </Link>
              </li>
              <li>
                <Link to="/fields?city=Bali" className="text-gray-400 hover:text-white transition-colors">
                  Bali
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{t('footer.contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Mail size={18} className="text-primary-500 mt-1 mr-2" />
                <span className="text-gray-400">sanjaya023@futsalhub.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="text-primary-500 mt-1 mr-2" />
                <span className="text-gray-400">+62 857 934 8302</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} FutsalSANFIK. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;