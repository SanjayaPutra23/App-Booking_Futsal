import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/common/Layout';
import { User, Mail, Phone, Key, CreditCard, Plus, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/common/ProtectedRoute';

const ProfilePage: React.FC = () => {
  const { t } = useTranslation();
  const { user, updateProfile } = useAuth();
  
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      await updateProfile({
        name,
        email,
        phone,
      });
      setEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="bg-gray-50 py-16">
          <div className="container-custom">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">{t('profile.title')}</h1>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Profile Picture and Sidebar */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-card p-6 mb-6">
                  <div className="flex flex-col items-center">
                    {user?.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-32 h-32 rounded-full object-cover mb-4"
                      />
                    ) : (
                      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center mb-4">
                        <User size={48} className="text-gray-400" />
                      </div>
                    )}
                    <h2 className="text-xl font-semibold text-gray-900">{user?.name}</h2>
                    <p className="text-gray-600 mb-4">{user?.email}</p>
                    
                    <div className="w-full border-t border-gray-200 pt-4 mt-2">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>{t('auth.email')}</span>
                        <span>{user?.email}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>{t('auth.phone')}</span>
                        <span>{user?.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Column: Profile Details */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
                  <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{t('profile.personal')}</h2>
                    {!editing && (
                      <button
                        onClick={() => setEditing(true)}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                      >
                        {t('edit')}
                      </button>
                    )}
                  </div>
                  
                  <div className="p-6">
                    {editing ? (
                      <div className="space-y-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('auth.name')}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User size={18} className="text-gray-400" />
                            </div>
                            <input
                              id="name"
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className="input pl-10"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('auth.email')}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail size={18} className="text-gray-400" />
                            </div>
                            <input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="input pl-10"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            {t('auth.phone')}
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Phone size={18} className="text-gray-400" />
                            </div>
                            <input
                              id="phone"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className="input pl-10"
                            />
                          </div>
                        </div>
                        
                        <div className="flex space-x-3 pt-2">
                          <button
                            onClick={() => setEditing(false)}
                            className="btn-outline flex-1"
                          >
                            {t('cancel')}
                          </button>
                          <button
                            onClick={handleSaveProfile}
                            disabled={isLoading}
                            className="btn-primary flex-1 flex items-center justify-center"
                          >
                            {isLoading ? (
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            ) : (
                              <Save size={16} className="mr-2" />
                            )}
                            {t('save')}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="flex border-b border-gray-100 pb-4">
                          <div className="w-1/3 text-gray-600">{t('auth.name')}</div>
                          <div className="w-2/3 font-medium">{user?.name}</div>
                        </div>
                        
                        <div className="flex border-b border-gray-100 pb-4">
                          <div className="w-1/3 text-gray-600">{t('auth.email')}</div>
                          <div className="w-2/3 font-medium">{user?.email}</div>
                        </div>
                        
                        <div className="flex">
                          <div className="w-1/3 text-gray-600">{t('auth.phone')}</div>
                          <div className="w-2/3 font-medium">{user?.phone}</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-card overflow-hidden mb-6">
                  <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{t('profile.changePassword')}</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key size={18} className="text-gray-400" />
                          </div>
                          <input
                            id="currentPassword"
                            type="password"
                            className="input pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key size={18} className="text-gray-400" />
                          </div>
                          <input
                            id="newPassword"
                            type="password"
                            className="input pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Key size={18} className="text-gray-400" />
                          </div>
                          <input
                            id="confirmPassword"
                            type="password"
                            className="input pl-10"
                            placeholder="••••••••"
                          />
                        </div>
                      </div>
                      
                      <button className="btn-primary">
                        Update Password
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg shadow-card overflow-hidden">
                  <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">{t('profile.paymentMethods')}</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      <div className="p-4 border border-gray-200 rounded-lg flex items-center justify-between">
                        <div className="flex items-center">
                          <CreditCard size={24} className="text-gray-500 mr-3" />
                          <div>
                            <div className="font-medium">Credit Card</div>
                            <div className="text-sm text-gray-500">**** **** **** 4242</div>
                          </div>
                        </div>
                        <button className="text-error-600 hover:text-error-700 text-sm font-medium">
                          {t('delete')}
                        </button>
                      </div>
                      
                      <button className="w-full p-4 border border-dashed border-gray-300 rounded-lg text-gray-500 hover:text-gray-700 hover:border-gray-400 flex items-center justify-center">
                        <Plus size={20} className="mr-2" />
                        {t('profile.addPayment')}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default ProfilePage;