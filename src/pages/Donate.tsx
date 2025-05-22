import React from 'react';
import { Button } from '@/components/ui/button';
import { useDonation } from '@/contexts/DonationContext';
import { useLanguage } from '@/components/LanguageContext';

const Donate = () => {
  const { openDonationModal } = useDonation();
  const { t } = useLanguage();

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">{t('donate.title', 'Support Our Cause')}</h1>
      <p className="text-lg text-gray-700 mb-8">
        {t('donate.description', 'Your generous donation helps us continue our work and make a positive impact in the community. Every contribution, no matter the size, makes a difference.')}
      </p>
      
      <div className="text-center">
        <Button size="lg" onClick={openDonationModal}>
          {t('donate.button', 'Donate now')}
        </Button>
      </div>
    </div>
  );
};

export default Donate; 