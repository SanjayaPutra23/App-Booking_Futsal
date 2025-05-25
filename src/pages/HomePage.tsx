import React from 'react';
import Layout from '../components/common/Layout';
import Hero from '../components/home/Hero';
import FeaturedFields from '../components/home/FeaturedFields';
import HowItWorks from '../components/home/HowItWorks';

const HomePage: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <FeaturedFields />
      <HowItWorks />
    </Layout>
  );
};

export default HomePage;