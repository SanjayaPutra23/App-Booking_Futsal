import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/common/Layout';
import BookingList from '../components/booking/BookingList';
import { getBookingsByUserId, bookings as allBookings } from '../data/mockData';
import { Booking } from '../types';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/common/ProtectedRoute';

const BookingsPage: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  
  useEffect(() => {
    if (user) {
      const userBookings = getBookingsByUserId(user.id);
      setBookings(userBookings);
    }
  }, [user]);
  
  const handleCancelBooking = (bookingId: string) => {
    // In a real app, this would send a request to the server
    const updatedBookings = bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: 'cancelled' as const } 
        : booking
    );
    
    setBookings(updatedBookings);
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="bg-gray-50 py-16">
          <div className="container-custom">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('booking.myBookings')}</h1>
            
            <BookingList 
              bookings={bookings.length > 0 ? bookings : allBookings} 
              onCancelBooking={handleCancelBooking} 
            />
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default BookingsPage;