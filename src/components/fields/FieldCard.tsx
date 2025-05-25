import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Star, MapPin, Clock } from 'lucide-react';
import { Field } from '../../types';

interface FieldCardProps {
  field: Field;
}

const FieldCard: React.FC<FieldCardProps> = ({ field }) => {
  const { t, i18n } = useTranslation();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={field.images[0]}
          alt={field.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-0 right-0 bg-primary-600 text-white px-3 py-1 rounded-bl-lg font-medium text-sm">
          {field.type === 'indoor' ? t('fields.type') + ': Indoor' : t('fields.type') + ': Outdoor'}
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{field.name}</h3>
          <div className="flex items-center text-sm">
            <Star size={16} className="fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-medium">{field.rating}</span>
          </div>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin size={16} className="mr-1 text-gray-500" />
          <span>{field.address}, {field.city}</span>
        </div>
        
        <div className="flex items-center text-gray-600 text-sm mb-4">
          <Clock size={16} className="mr-1 text-gray-500" />
          <span>{field.openingTime} - {field.closingTime}</span>
        </div>
        
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {field.facilities.slice(0, 3).map((facility, index) => (
              <span 
                key={index} 
                className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-800"
              >
                {facility}
              </span>
            ))}
            {field.facilities.length > 3 && (
              <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-xs font-medium text-gray-800">
                +{field.facilities.length - 3}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-lg font-semibold text-gray-900">
            {formatPrice(field.pricePerHour)}
            <span className="text-sm font-normal text-gray-600 ml-1">{t('fields.perHour')}</span>
          </div>
          <div className="flex space-x-2">
            <Link 
              to={`/fields/${field.id}`} 
              className="text-primary-600 hover:text-primary-700 font-medium text-sm"
            >
              {t('fields.viewDetails')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FieldCard;