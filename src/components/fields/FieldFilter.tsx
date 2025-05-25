import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Filter, X } from 'lucide-react';

interface FilterOptions {
  city: string;
  priceRange: [number, number];
  type: string;
  facilities: string[];
}

interface FieldFilterProps {
  onFilter: (filters: FilterOptions) => void;
}

const FieldFilter: React.FC<FieldFilterProps> = ({ onFilter }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  
  const [filters, setFilters] = useState<FilterOptions>({
    city: '',
    priceRange: [0, 300000],
    type: '',
    facilities: [],
  });

  const cities = ['Jakarta', 'Bandung', 'Surabaya', 'Bali'];
  const types = ['indoor', 'outdoor'];
  const facilityOptions = ['Parking', 'Shower', 'Locker', 'WiFi', 'Cafeteria', 'Air Conditioning'];

  const handleCityChange = (city: string) => {
    setFilters(prev => ({ ...prev, city }));
  };

  const handleTypeChange = (type: string) => {
    setFilters(prev => ({ ...prev, type }));
  };

  const handleFacilityChange = (facility: string) => {
    setFilters(prev => {
      const updatedFacilities = prev.facilities.includes(facility)
        ? prev.facilities.filter(f => f !== facility)
        : [...prev.facilities, facility];
      
      return { ...prev, facilities: updatedFacilities };
    });
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setFilters(prev => ({ ...prev, priceRange: [0, value] }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
    setIsOpen(false);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      city: '',
      priceRange: [0, 300000],
      type: '',
      facilities: [],
    };
    setFilters(resetFilters);
    onFilter(resetFilters);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-outline flex items-center"
      >
        <Filter size={16} className="mr-2" />
        {t('fields.filter')}
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-2 w-72 bg-white rounded-lg shadow-lg p-4 right-0 sm:right-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-gray-900">{t('fields.filter')}</h3>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          </div>

          <div className="space-y-4">
            {/* City Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('fields.location')}</h4>
              <div className="space-y-1">
                {cities.map(city => (
                  <div key={city} className="flex items-center">
                    <input
                      type="radio"
                      id={`city-${city}`}
                      name="city"
                      checked={filters.city === city}
                      onChange={() => handleCityChange(city)}
                      className="mr-2"
                    />
                    <label htmlFor={`city-${city}`} className="text-sm text-gray-700">
                      {city}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('fields.price')}</h4>
              <input
                type="range"
                min="50000"
                max="300000"
                step="10000"
                value={filters.priceRange[1]}
                onChange={handlePriceChange}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Rp 50.000</span>
                <span>Rp {filters.priceRange[1].toLocaleString()}</span>
              </div>
            </div>

            {/* Field Type Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('fields.type')}</h4>
              <div className="space-y-1">
                {types.map(type => (
                  <div key={type} className="flex items-center">
                    <input
                      type="radio"
                      id={`type-${type}`}
                      name="type"
                      checked={filters.type === type}
                      onChange={() => handleTypeChange(type)}
                      className="mr-2"
                    />
                    <label htmlFor={`type-${type}`} className="text-sm text-gray-700 capitalize">
                      {type}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Facilities Filter */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">{t('fields.facilities')}</h4>
              <div className="space-y-1">
                {facilityOptions.map(facility => (
                  <div key={facility} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`facility-${facility}`}
                      checked={filters.facilities.includes(facility)}
                      onChange={() => handleFacilityChange(facility)}
                      className="mr-2"
                    />
                    <label htmlFor={`facility-${facility}`} className="text-sm text-gray-700">
                      {facility}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={handleResetFilters}
                className="btn-outline flex-1 py-2"
              >
                {t('cancel')}
              </button>
              <button
                onClick={handleApplyFilters}
                className="btn-primary flex-1 py-2"
              >
                {t('save')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FieldFilter;