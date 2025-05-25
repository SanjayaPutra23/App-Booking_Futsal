import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Star, Info, ShieldCheck, MessageSquare } from 'lucide-react';
import Layout from '../components/common/Layout';
import BookingForm from '../components/booking/BookingForm';
import { fields, getReviewsByFieldId } from '../data/mockData';
import { Field, BookingFormData, Review } from '../types';
import { useAuth } from '../context/AuthContext';

const FieldDetailPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { fieldId } = useParams<{ fieldId: string }>();
  const [field, setField] = useState<Field | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (fieldId) {
      const foundField = fields.find(f => f.id === fieldId);
      if (foundField) {
        setField(foundField);
        setSelectedImage(foundField.images[0]);
        setReviews(getReviewsByFieldId(fieldId));
      }
    }
  }, [fieldId]);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const handleBookingSubmit = (bookingData: BookingFormData) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    // In a real app, this would send the booking data to a server
    console.log('Booking data:', bookingData);
    setBookingSuccess(true);
    
    // Redirect to bookings page after a delay
    setTimeout(() => {
      navigate('/bookings');
    }, 3000);
  };
  
  if (!field) {
    return (
      <Layout>
        <div className="container-custom py-16 min-h-[calc(100vh-64px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p>{t('loading')}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Field Details */}
            <div className="lg:col-span-2">
              {/* Image Gallery */}
              <div className="bg-white rounded-lg shadow-card overflow-hidden mb-8">
                <div className="h-96 overflow-hidden">
                  <img 
                    src={selectedImage} 
                    alt={field.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {field.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 transition-all ${
                        selectedImage === image ? 'border-primary-600' : 'border-transparent'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${field.name} ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Field Information */}
              <div className="bg-white rounded-lg shadow-card overflow-hidden mb-8">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{field.name}</h1>
                      <div className="flex items-center text-gray-600 mb-2">
                        <MapPin size={18} className="mr-1 text-gray-500" />
                        <span>{field.address}, {field.city}</span>
                      </div>
                      <div className="flex items-center">
                        <Star size={18} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-medium">{field.rating}</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-gray-600">{reviews.length} {t('field.reviews')}</span>
                      </div>
                    </div>
                    <div className="text-xl font-bold text-primary-600">
                      {formatPrice(field.pricePerHour)}
                      <span className="text-sm font-normal text-gray-600 ml-1">{t('fields.perHour')}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="inline-block bg-primary-100 text-primary-800 rounded-full px-3 py-1 text-sm font-medium">
                      {field.type === 'indoor' ? 'Indoor' : 'Outdoor'}
                    </span>
                    <span className="inline-block bg-secondary-100 text-secondary-800 rounded-full px-3 py-1 text-sm font-medium">
                      {field.size}
                    </span>
                    {field.facilities.slice(0, 3).map((facility, index) => (
                      <span 
                        key={index} 
                        className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm font-medium"
                      >
                        {facility}
                      </span>
                    ))}
                    {field.facilities.length > 3 && (
                      <span className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm font-medium">
                        +{field.facilities.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-6">
                    <h2 className="flex items-center text-xl font-semibold text-gray-900 mb-4">
                      <Info size={20} className="mr-2 text-primary-600" />
                      {t('field.about')}
                    </h2>
                    <p className="text-gray-700 mb-6">{field.description}</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">{t('field.facilities')}</h3>
                        <ul className="space-y-2">
                          {field.facilities.map((facility, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <div className="w-1.5 h-1.5 bg-primary-600 rounded-full mr-2"></div>
                              {facility}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="font-medium text-gray-900 mb-3">{t('field.rules')}</h3>
                        <ul className="space-y-2">
                          {field.rules.map((rule, index) => (
                            <li key={index} className="flex items-center text-gray-700">
                              <ShieldCheck size={16} className="mr-2 text-primary-600" />
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-100 mt-6 pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="flex items-center text-xl font-semibold text-gray-900">
                        <MessageSquare size={20} className="mr-2 text-primary-600" />
                        {t('field.reviews')}
                      </h2>
                      <div className="flex items-center">
                        <Star size={18} className="text-yellow-400 fill-yellow-400 mr-1" />
                        <span className="font-medium">{field.rating}</span>
                        <span className="mx-1 text-gray-400">•</span>
                        <span className="text-gray-600">{reviews.length} {t('field.reviews')}</span>
                      </div>
                    </div>
                    
                    {reviews.length > 0 ? (
                      <div className="space-y-4">
                        {reviews.map((review) => (
                          <div key={review.id} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex justify-between mb-2">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gray-300 mr-3"></div>
                                <div>
                                  <div className="font-medium">User</div>
                                  <div className="text-xs text-gray-500">
                                    {new Date(review.createdAt).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                <span className="ml-1 font-medium">{review.rating}</span>
                              </div>
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-500">{t('field.reviews')} not available yet.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column: Booking Form */}
            <div className="lg:col-span-1">
              {bookingSuccess ? (
                <div className="bg-white rounded-lg shadow-card p-6 text-center">
                  <div className="w-16 h-16 bg-success-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-success-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('booking.success')}</h3>
                  <p className="text-gray-600 mb-4">Your booking has been confirmed. Redirecting to your bookings...</p>
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary-600 mx-auto"></div>
                </div>
              ) : (
                <BookingForm field={field} onSubmit={handleBookingSubmit} />
              )}
              
              <div className="bg-white rounded-lg shadow-card p-6 mt-6">
                <h3 className="font-medium text-gray-900 mb-3">{t('field.openHours')}</h3>
                <div className="flex items-center mb-4">
                  <Clock size={18} className="text-primary-600 mr-2" />
                  <span className="text-gray-700">{field.openingTime} - {field.closingTime}</span>
                </div>
                
                <h3 className="font-medium text-gray-900 mb-3">{t('field.location')}</h3>
                <div className="bg-gray-100 h-48 rounded-md mb-3 flex items-center justify-center">
                  <MapPin size={24} className="text-primary-600" />
                  <span className="ml-2">Map View</span>
                </div>
                <p className="text-gray-700">{field.address}, {field.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default FieldDetailPage;