import React, { createContext, useContext, useState } from 'react';
import DonationModal from '@/components/DonationModal';

interface DonationContextType {
  isDonationModalOpen: boolean;
  openDonationModal: () => void;
  closeDonationModal: () => void;
}

const DonationContext = createContext<DonationContextType | undefined>(undefined);

export const DonationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);

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
      <DonationModal isOpen={isDonationModalOpen} onClose={closeDonationModal} />
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