import { User, Field, Booking, Review, TimeSlot } from '../types';
import { addDays, format } from 'date-fns';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Sanjaya',
    email: 'sanjaya20@example.com',
    phone: '081234567890',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date('2023-01-10'),
  },
  {
    id: '2',
    name: 'Zahra Arin',
    email: 'zahra25@example.com',
    phone: '081234567891',
    role: 'user',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date('2023-01-15'),
  },
  {
    id: '3',
    name: 'Admin Fikri',
    email: 'admin@example.com',
    phone: '081234567892',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    createdAt: new Date('2022-12-01'),
  },
];

// Mock Fields
export const fields: Field[] = [
  {
    id: "1",
    name: "Futsal Arena Pro",
    description:
      "Professional indoor futsal field with top-quality turf and modern facilities.",
    address: "Jl. Sudirman No. 123",
    city: "Jakarta",
    pricePerHour: 200000,
    rating: 4.8,
    images: [
      "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/209956/pexels-photo-209956.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    type: "outdoor",
    size: "5v5",
    facilities: ["Parking", "Shower", "Locker", "Cafeteria", "WiFi"],
    openingTime: "08:00",
    closingTime: "22:00",
    rules: [
      "No smoking",
      "No food or drinks on the field",
      "Proper footwear required",
    ],
    featured: true,
    createdAt: new Date("2022-06-15"),
  },
  {
    id: "2",
    name: "Golden Goal Futsal",
    description:
      "Premium outdoor futsal field with natural grass and excellent lighting for night games.",
    address: "Jl. Gatot Subroto No. 45",
    city: "Jakarta",
    pricePerHour: 150000,
    rating: 4.5,
    images: [
      "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ],
    type: "outdoor",
    size: "7v7",
    facilities: ["Parking", "Locker", "Cafeteria"],
    openingTime: "09:00",
    closingTime: "21:00",
    rules: ["No smoking", "Proper footwear required"],
    featured: true,
    createdAt: new Date("2022-07-20"),
  },
  {
    id: "3",
    name: "Victory Futsal Center",
    description:
      "Modern indoor futsal center with multiple fields and professional equipment.",
    address: "Jl. Kemang Raya No. 78",
    city: "Jakarta",
    pricePerHour: 180000,
    rating: 4.6,
    images: [
      "https://images.pexels.com/photos/6077792/pexels-photo-6077792.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    type: "indoor",
    size: "5v5",
    facilities: ["Parking", "Shower", "Locker", "WiFi"],
    openingTime: "08:00",
    closingTime: "23:00",
    rules: [
      "No smoking",
      "No food or drinks on the field",
      "Proper footwear required",
    ],
    featured: false,
    createdAt: new Date("2022-08-10"),
  },
  {
    id: "4",
    name: "Champion Futsal",
    description:
      "Affordable indoor futsal field with good facilities and friendly staff.",
    address: "Jl. Kebon Jeruk No. 56",
    city: "Jakarta",
    pricePerHour: 120000,
    rating: 4.3,
    images: [
      "https://images.pexels.com/photos/16378313/pexels-photo-16378313/free-photo-of-girls-playing-soccer-at-the-gymnasium.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    type: "indoor",
    size: "5v5",
    facilities: ["Parking", "Locker"],
    openingTime: "10:00",
    closingTime: "22:00",
    rules: ["No smoking", "Proper footwear required"],
    featured: false,
    createdAt: new Date("2022-09-05"),
  },
  {
    id: "5",
    name: "Elite Futsal Stadium",
    description:
      "High-end futsal stadium with professional-grade turf and advanced facilities.",
    address: "Jl. Pantai Indah Kapuk No. 22",
    city: "Jakarta",
    pricePerHour: 250000,
    rating: 4.9,
    images: [
      "https://images.pexels.com/photos/15818644/pexels-photo-15818644/free-photo-of-men-playing-football-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    ],
    type: "indoor",
    size: "7v7",
    facilities: [
      "Parking",
      "Shower",
      "Locker",
      "Cafeteria",
      "WiFi",
      "Air Conditioning",
      "Pro Shop",
    ],
    openingTime: "07:00",
    closingTime: "23:00",
    rules: [
      "No smoking",
      "No food or drinks on the field",
      "Proper footwear required",
      "Booking confirmation required",
    ],
    featured: true,
    createdAt: new Date("2022-05-12"),
  },
];

// Generate time slots for a field
export const generateTimeSlots = (fieldId: string, date: Date): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const field = fields.find(f => f.id === fieldId);
  
  if (!field) return slots;
  
  const openingHour = parseInt(field.openingTime.split(':')[0]);
  const closingHour = parseInt(field.closingTime.split(':')[0]);
  
  for (let hour = openingHour; hour < closingHour; hour++) {
    const startTime = `${hour.toString().padStart(2, '0')}:00`;
    const endTime = `${(hour + 1).toString().padStart(2, '0')}:00`;
    
    // Randomly mark some slots as unavailable
    const isAvailable = Math.random() > 0.3;
    
    slots.push({
      id: `${fieldId}-${format(date, 'yyyy-MM-dd')}-${startTime}`,
      startTime,
      endTime,
      isAvailable,
    });
  }
  
  return slots;
};

// Mock Bookings
export const bookings: Booking[] = [
  {
    id: '1',
    userId: '1',
    fieldId: '1',
    date: format(new Date(), 'yyyy-MM-dd'),
    startTime: '18:00',
    endTime: '20:00',
    duration: 2,
    totalPrice: 400000,
    status: 'confirmed',
    paymentMethod: 'Credit Card',
    paymentStatus: 'paid',
    createdAt: new Date('2023-05-10'),
  },
  {
    id: '2',
    userId: '1',
    fieldId: '2',
    date: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    startTime: '19:00',
    endTime: '21:00',
    duration: 2,
    totalPrice: 300000,
    status: 'pending',
    paymentMethod: 'Bank Transfer',
    paymentStatus: 'pending',
    createdAt: new Date('2023-05-12'),
  },
  {
    id: '3',
    userId: '2',
    fieldId: '3',
    date: format(addDays(new Date(), -5), 'yyyy-MM-dd'),
    startTime: '16:00',
    endTime: '18:00',
    duration: 2,
    totalPrice: 360000,
    status: 'completed',
    paymentMethod: 'E-Wallet',
    paymentStatus: 'paid',
    createdAt: new Date('2023-04-28'),
  },
];

// Mock Reviews
export const reviews: Review[] = [
  {
    id: '1',
    userId: '1',
    fieldId: '1',
    rating: 5,
    comment: 'Excellent field with great facilities. The staff was very helpful.',
    createdAt: new Date('2023-04-15'),
  },
  {
    id: '2',
    userId: '2',
    fieldId: '1',
    rating: 4,
    comment: 'Good field and nice atmosphere. Would recommend for casual games.',
    createdAt: new Date('2023-04-20'),
  },
  {
    id: '3',
    userId: '1',
    fieldId: '2',
    rating: 4,
    comment: 'Nice outdoor field with good pricing. The only downside is limited parking.',
    createdAt: new Date('2023-03-10'),
  },
];

// Get user by credentials (for mock login)
export const getUserByCredentials = (email: string, password: string): User | null => {
  // In a real app, you'd hash the password and compare it properly
  if (email === 'john@example.com' && password === 'password123') {
    return users.find(user => user.email === email) || null;
  }
  if (email === 'admin@example.com' && password === 'admin123') {
    return users.find(user => user.email === email) || null;
  }
  return null;
};

// Get bookings by user ID
export const getBookingsByUserId = (userId: string): Booking[] => {
  return bookings.filter(booking => booking.userId === userId);
};

// Get reviews by field ID
export const getReviewsByFieldId = (fieldId: string): Review[] => {
  return reviews.filter(review => review.fieldId === fieldId);
};