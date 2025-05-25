export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'user' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Field {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  pricePerHour: number;
  rating: number;
  images: string[];
  type: 'indoor' | 'outdoor';
  size: '5v5' | '7v7';
  facilities: string[];
  openingTime: string;
  closingTime: string;
  rules: string[];
  featured: boolean;
  createdAt: Date;
}

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  fieldId: string;
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  paymentMethod: string;
  paymentStatus: 'pending' | 'paid';
  createdAt: Date;
}

export interface Review {
  id: string;
  userId: string;
  fieldId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface BookingFormData {
  date: Date;
  startTime: string;
  duration: number;
  paymentMethod: string;
}