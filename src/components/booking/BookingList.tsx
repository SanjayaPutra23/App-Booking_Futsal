import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { format, parseISO } from 'date-fns';
import { Clock, MapPin, Calendar, CheckCircle, XCircle, Clock3 } from 'lucide-react';
import { Booking } from '../../types';
import { fields } from '../../data/mockData';

interface BookingListProps {
  bookings: Booking[];
  onCancelBooking: (bookingId: string) => void;
}

const BookingList: React.FC<BookingListProps> = ({ bookings, onCancelBooking }) => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const getFieldById = (fieldId: string) => {
    return fields.find(field => field.id === fieldId);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-success-100 text-success-700';
      case 'pending':
        return 'bg-warning-100 text-warning-700';
      case 'cancelled':
        return 'bg-error-100 text-error-700';
      case 'completed':
        return 'bg-secondary-100 text-secondary-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle size={16} className="text-success-500" />;
      case 'pending':
        return <Clock3 size={16} className="text-warning-500" />;
      case 'cancelled':
        return <XCircle size={16} className="text-error-500" />;
      case 'completed':
        return <CheckCircle size={16} className="text-secondary-500" />;
      default:
        return null;
    }
  };
  
  const filteredBookings = bookings.filter(booking => {
    const today = new Date();
    const bookingDate = parseISO(booking.date);
    
    if (activeTab === 'upcoming') {
      return (bookingDate >= today && booking.status !== 'cancelled') || booking.status === 'pending';
    } else if (activeTab === 'past') {
      return bookingDate < today && booking.status === 'completed';
    } else if (activeTab === 'cancelled') {
      return booking.status === 'cancelled';
    }
    
    return true;
  });

  return (
    <div className="bg-white rounded-lg shadow-card overflow-hidden">
      <div className="border-b border-gray-200">
        <div className="flex">
          {['upcoming', 'past', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? 'border-b-2 border-primary-600 text-primary-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {t(`booking.${tab}`)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="p-4">
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => {
              const field = getFieldById(booking.fieldId);
              
              return (
                <div 
                  key={booking.id} 
                  className="border border-gray-200 rounded-lg p-4 transition-shadow hover:shadow-md"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold">{field?.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mt-1">
                        <MapPin size={16} className="mr-1" />
                        <span>{field?.address}, {field?.city}</span>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium flex items-center ${getStatusColor(booking.status)}`}>
                      {getStatusIcon(booking.status)}
                      <span className="ml-1 capitalize">{t(`booking.${booking.status}`)}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-700">{format(parseISO(booking.date), 'EEEE, d MMMM yyyy')}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={16} className="text-gray-500 mr-2" />
                      <span className="text-gray-700">{booking.startTime} - {booking.endTime}</span>
                    </div>
                    <div className="text-right sm:text-left font-medium">
                      {formatPrice(booking.totalPrice)}
                    </div>
                  </div>
                  
                  {booking.status === 'confirmed' && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => onCancelBooking(booking.id)}
                        className="text-error-600 hover:text-error-700 text-sm font-medium transition-colors"
                      >
                        {t('booking.cancel')}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <div className="text-gray-400 mb-2">
              <Calendar size={40} className="mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-1">No bookings found</h3>
            <p className="text-gray-500">You don't have any {activeTab} bookings</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingList;