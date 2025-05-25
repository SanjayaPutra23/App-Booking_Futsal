import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Field, TimeSlot, BookingFormData } from '../../types';
import { format, addDays } from 'date-fns';
import { Calendar, Clock, CreditCard, ChevronRight } from 'lucide-react';
import { generateTimeSlots } from '../../data/mockData';

interface BookingFormProps {
  field: Field;
  onSubmit: (bookingData: BookingFormData) => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ field, onSubmit }) => {
  const { t, i18n } = useTranslation();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [duration, setDuration] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  
  useEffect(() => {
    // Generate time slots for the selected date
    setTimeSlots(generateTimeSlots(field.id, date));
    setSelectedTimeSlot('');
  }, [field.id, date]);
  
  const handleDateChange = (newDate: Date) => {
    setDate(newDate);
  };
  
  const handleSubmit = () => {
    onSubmit({
      date,
      startTime: selectedTimeSlot,
      duration,
      paymentMethod,
    });
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };
  
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      days.push(addDays(new Date(), i));
    }
    return days;
  };
  
  const isDateActive = (dateToCheck: Date) => {
    return format(dateToCheck, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
  };
  
  const nextDays = getNextDays();
  
  return (
    <div className="bg-white rounded-lg shadow-card p-6">
      <h3 className="text-xl font-semibold mb-6">{t('booking.title')}</h3>
      
      {/* Step 1: Select Date and Time */}
      {step === 1 && (
        <div className="space-y-6 animate-fade-in">
          {/* Date Selection */}
          <div>
            <h4 className="flex items-center text-md font-medium mb-3 text-gray-800">
              <Calendar size={18} className="mr-2 text-primary-600" />
              {t('booking.selectDate')}
            </h4>
            
            <div className="grid grid-cols-7 gap-2">
              {nextDays.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateChange(day)}
                  className={`flex flex-col items-center justify-center p-2 rounded-md transition-colors ${
                    isDateActive(day)
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span className="text-xs uppercase">
                    {format(day, 'EEE')}
                  </span>
                  <span className="text-lg font-semibold">
                    {format(day, 'd')}
                  </span>
                  <span className="text-xs">
                    {format(day, 'MMM')}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Time Selection */}
          <div>
            <h4 className="flex items-center text-md font-medium mb-3 text-gray-800">
              <Clock size={18} className="mr-2 text-primary-600" />
              {t('booking.selectTime')}
            </h4>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => setSelectedTimeSlot(slot.startTime)}
                  disabled={!slot.isAvailable}
                  className={`p-2 rounded-md text-center transition-colors ${
                    selectedTimeSlot === slot.startTime
                      ? 'bg-primary-600 text-white'
                      : slot.isAvailable
                      ? 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {slot.startTime}
                </button>
              ))}
            </div>
          </div>
          
          {/* Duration Selection */}
          <div>
            <h4 className="flex items-center text-md font-medium mb-3 text-gray-800">
              {t('booking.duration')}
            </h4>
            
            <div className="flex space-x-3">
              {[1, 2, 3].map((hour) => (
                <button
                  key={hour}
                  onClick={() => setDuration(hour)}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    duration === hour
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-50 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  {hour} {t('booking.hours')}
                </button>
              ))}
            </div>
          </div>
          
          <button
            onClick={() => setStep(2)}
            disabled={!selectedTimeSlot}
            className="btn-primary w-full mt-4 flex items-center justify-center"
          >
            {t('next')}
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      )}
      
      {/* Step 2: Booking Summary and Payment */}
      {step === 2 && (
        <div className="space-y-6 animate-fade-in">
          <h4 className="font-medium text-gray-800 mb-3">{t('booking.summary')}</h4>
          
          <div className="bg-gray-50 p-4 rounded-md space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">{t('booking.field')}</span>
              <span className="font-medium">{field.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('booking.date')}</span>
              <span className="font-medium">{format(date, 'EEEE, d MMMM yyyy')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('booking.time')}</span>
              <span className="font-medium">
                {selectedTimeSlot} - {
                  `${parseInt(selectedTimeSlot.split(':')[0]) + duration}:00`
                }
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">{t('booking.duration')}</span>
              <span className="font-medium">{duration} {t('booking.hours')}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-gray-200">
              <span className="text-gray-600">{t('booking.price')}</span>
              <span className="font-medium">{formatPrice(field.pricePerHour)} / {t('booking.hours')}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>{t('booking.total')}</span>
              <span className="text-lg text-primary-600">{formatPrice(field.pricePerHour * duration)}</span>
            </div>
          </div>
          
          <div>
            <h4 className="flex items-center text-md font-medium mb-3 text-gray-800">
              <CreditCard size={18} className="mr-2 text-primary-600" />
              {t('booking.paymentMethod')}
            </h4>
            
            <div className="space-y-2">
              {['Credit Card', 'Bank Transfer', 'E-Wallet'].map((method) => (
                <button
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`w-full p-3 flex items-center justify-between rounded-md border transition-colors ${
                    paymentMethod === method
                      ? 'border-primary-600 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <span>{method}</span>
                  {paymentMethod === method && (
                    <div className="w-5 h-5 rounded-full bg-primary-600 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex space-x-3 pt-2">
            <button
              onClick={() => setStep(1)}
              className="btn-outline flex-1"
            >
              {t('back')}
            </button>
            <button
              onClick={handleSubmit}
              disabled={!paymentMethod}
              className="btn-primary flex-1"
            >
              {t('booking.confirm')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;