import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search, Calendar, CreditCard, Users } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <Search className="text-white" size={24} />,
      title: t('home.how.step1'),
      description: t('home.how.step1Desc'),
      color: 'bg-primary-600',
    },
    {
      icon: <Calendar className="text-white" size={24} />,
      title: t('home.how.step2'),
      description: t('home.how.step2Desc'),
      color: 'bg-secondary-600',
    },
    {
      icon: <CreditCard className="text-white" size={24} />,
      title: t('home.how.step3'),
      description: t('home.how.step3Desc'),
      color: 'bg-accent-600',
    },
    {
      icon: <Users className="text-white" size={24} />,
      title: t('home.how.step4'),
      description: t('home.how.step4Desc'),
      color: 'bg-success-600',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container-custom mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('home.how.title')}</h2>
          <div className="w-20 h-1 bg-primary-500 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="text-center group"
            >
              <div className="relative mb-6 mx-auto">
                <div className={`w-16 h-16 rounded-full ${step.color} flex items-center justify-center mx-auto shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  {step.icon}
                </div>
                <div className="hidden lg:block absolute top-8 left-full w-full border-t-2 border-dashed border-gray-300 -z-10">
                  {index < steps.length - 1 && <span></span>}
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;