import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/common/Layout';
import { 
  Users, 
  MapPin, 
  Calendar, 
  BarChart, 
  Settings,
  PlusCircle,
  Search,
  Filter,
  Edit,
  Trash,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { users, fields, bookings } from '../data/mockData';
import ProtectedRoute from '../components/common/ProtectedRoute';

const AdminDashboardPage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState('fields');
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat(i18n.language === 'id' ? 'id-ID' : 'en-US', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'fields':
        return (
          <div>
            <div className="flex justify-between mb-6">
              <div className="relative flex-grow max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search fields..."
                  className="input pl-10 w-full"
                />
              </div>
              <div className="flex space-x-3">
                <button className="btn-outline flex items-center">
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
                <button className="btn-primary flex items-center">
                  <PlusCircle size={16} className="mr-2" />
                  {t('admin.addField')}
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Field
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {fields.map((field) => (
                      <tr key={field.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                              <img src={field.images[0]} alt={field.name} className="h-10 w-10 object-cover" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{field.name}</div>
                              <div className="text-sm text-gray-500">{field.rating} ★</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{field.city}</div>
                          <div className="text-sm text-gray-500">{field.address}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                            {field.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatPrice(field.pricePerHour)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-100 text-success-800">
                            Active
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">
                            <Edit size={16} />
                          </button>
                          <button className="text-error-600 hover:text-error-900">
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'bookings':
        return (
          <div>
            <div className="flex justify-between mb-6">
              <div className="relative flex-grow max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search bookings..."
                  className="input pl-10 w-full"
                />
              </div>
              <div className="flex space-x-3">
                <button className="btn-outline flex items-center">
                  <Filter size={16} className="mr-2" />
                  Filter
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Field
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => {
                      const field = fields.find(f => f.id === booking.fieldId);
                      const user = users.find(u => u.id === booking.userId);
                      
                      return (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="text-sm font-medium text-gray-900">{user?.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{field?.name}</div>
                            <div className="text-sm text-gray-500">{field?.city}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.date}</div>
                            <div className="text-sm text-gray-500">{booking.startTime} - {booking.endTime}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {formatPrice(booking.totalPrice)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === 'confirmed' ? 'bg-success-100 text-success-800' :
                              booking.status === 'pending' ? 'bg-warning-100 text-warning-800' :
                              booking.status === 'cancelled' ? 'bg-error-100 text-error-800' :
                              'bg-secondary-100 text-secondary-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {booking.status === 'pending' && (
                              <>
                                <button className="text-success-600 hover:text-success-900 mr-3">
                                  <CheckCircle size={16} />
                                </button>
                                <button className="text-error-600 hover:text-error-900">
                                  <XCircle size={16} />
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case 'users':
        return (
          <div>
            <div className="flex justify-between mb-6">
              <div className="relative flex-grow max-w-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search users..."
                  className="input pl-10 w-full"
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Phone
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {user.avatar ? (
                              <img src={user.avatar} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
                            ) : (
                              <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <Users size={16} className="text-gray-500" />
                              </div>
                            )}
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.phone}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === 'admin' ? 'bg-secondary-100 text-secondary-800' : 'bg-gray-100 text-gray-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.createdAt.toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button className="text-primary-600 hover:text-primary-900 mr-3">
                            <Edit size={16} />
                          </button>
                          <button className="text-error-600 hover:text-error-900">
                            <Trash size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute requireAdmin>
      <Layout>
        <div className="bg-gray-50 py-16">
          <div className="container-custom">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('admin.dashboard')}</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{t('nav.fields')}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{fields.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <MapPin size={24} className="text-primary-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{t('nav.bookings')}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{bookings.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
                    <Calendar size={24} className="text-secondary-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{t('admin.users')}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">{users.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-accent-100 flex items-center justify-center">
                    <Users size={24} className="text-accent-600" />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{t('admin.reports')}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">6</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-success-100 flex items-center justify-center">
                    <BarChart size={24} className="text-success-600" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-card mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex">
                  <button
                    onClick={() => setActiveTab('fields')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'fields'
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <MapPin size={16} className="inline-block mr-1" />
                    {t('admin.fields')}
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'bookings'
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Calendar size={16} className="inline-block mr-1" />
                    {t('admin.bookings')}
                  </button>
                  <button
                    onClick={() => setActiveTab('users')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'users'
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Users size={16} className="inline-block mr-1" />
                    {t('admin.users')}
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'settings'
                        ? 'border-primary-600 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Settings size={16} className="inline-block mr-1" />
                    {t('admin.settings')}
                  </button>
                </nav>
              </div>
              
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default AdminDashboardPage;