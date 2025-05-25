import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/common/Layout';
import SignupForm from '../components/auth/SignupForm';
import { useAuth } from '../context/AuthContext';

const SignupPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Layout>
      <div className="container-custom py-16 min-h-[calc(100vh-64px)] flex items-center justify-center">
        <SignupForm />
      </div>
    </Layout>
  );
};

export default SignupPage;