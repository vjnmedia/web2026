import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';

interface DonationContextType {
  isDonationModalOpen: boolean;
  openDonationModal: () => void;
  closeDonationModal: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

interface DonationProviderProps {
  children: ReactNode;
}

export const DonationProvider: React.FC<DonationProviderProps> = ({ children }) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const { t } = useLanguage();

  const openDonationModal = () => {
    setIsDonationModalOpen(true);
  };

  const closeDonationModal = () => {
    setIsDonationModalOpen(false);
  };

  return (
    <DonationContext.Provider
      value={{
        isDonationModalOpen,
        openDonationModal,
        closeDonationModal,
      }}
    >
      {children}
      {isDonationModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">
              {t('donation.modal.title', 'Make a Donation')}
            </h2>
            <p className="text-gray-600 mb-6">
              {t('donation.modal.description', 'Your support helps us continue our mission of empowering youth and building stronger communities.')}
            </p>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                {t('donation.modal.amount', 'Donation Amount')}
              </label>
              <input
                type="number"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-vjn-blue"
                min="0"
                step="1000"
              />
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeDonationModal}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {t('donation.modal.close', 'Close')}
              </button>
              <button
                className="bg-vjn-blue text-white px-6 py-2 rounded-lg hover:bg-vjn-light-blue transition-colors"
              >
                {t('donation.modal.submit', 'Donate Now')}
              </button>
            </div>
          </div>
        </div>
      )}
    </DonationContext.Provider>
  );
};

export const useDonation = () => {
  const context = useContext(DonationContext);
  if (context === undefined) {
    throw new Error('useDonation must be used within a DonationProvider');
  }
  return context;
}; 