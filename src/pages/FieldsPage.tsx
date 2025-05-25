import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { Search } from 'lucide-react';
import Layout from '../components/common/Layout';
import FieldCard from '../components/fields/FieldCard';
import FieldFilter from '../components/fields/FieldFilter';
import { fields } from '../data/mockData';
import { Field } from '../types';

const FieldsPage: React.FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFields, setFilteredFields] = useState<Field[]>(fields);
  
  useEffect(() => {
    const city = searchParams.get('city');
    
    if (city) {
      setFilteredFields(fields.filter(field => 
        field.city.toLowerCase() === city.toLowerCase()
      ));
    } else {
      setFilteredFields(fields);
    }
  }, [searchParams]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim()) {
      setFilteredFields(fields.filter(field => 
        field.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.city.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    } else {
      setFilteredFields(fields);
    }
  };
  
  const handleFilter = (filters: any) => {
    let filtered = [...fields];
    
    // Filter by city
    if (filters.city) {
      filtered = filtered.filter(field => field.city === filters.city);
    }
    
    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(field => field.pricePerHour <= filters.priceRange[1]);
    }
    
    // Filter by type
    if (filters.type) {
      filtered = filtered.filter(field => field.type === filters.type);
    }
    
    // Filter by facilities
    if (filters.facilities && filters.facilities.length > 0) {
      filtered = filtered.filter(field => 
        filters.facilities.every((facility: string) => field.facilities.includes(facility))
      );
    }
    
    setFilteredFields(filtered);
  };

  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('fields.title')}</h1>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <form onSubmit={handleSearch} className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={20} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={t('fields.search')}
                  className="input pl-10 w-full"
                />
              </div>
            </form>
            
            <div className="flex space-x-2">
              <FieldFilter onFilter={handleFilter} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFields.length > 0 ? (
              filteredFields.map(field => (
                <FieldCard key={field.id} field={field} />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-lg font-medium text-gray-700 mb-2">No fields found</h3>
                <p className="text-gray-500">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FieldsPage;