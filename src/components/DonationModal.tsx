import React, { useState, useEffect } from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from './LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { toast } from 'sonner';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { paymentService } from '@/services/paymentService';
import { mtnService } from '@/services/mtnService';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DonationModal = ({ isOpen, onClose }: DonationModalProps) => {
  const { t } = useLanguage();
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [transactionId, setTransactionId] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

  // Clean up when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTransactionId(null);
      setPaymentStatus(null);
      setPhoneNumber('');
      setEmail('');
      setAmount('');
    }
  }, [isOpen]);

  // Check payment status periodically if transaction is pending
  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (transactionId && paymentStatus === 'PENDING') {
      intervalId = setInterval(async () => {
        try {
          const response = await mtnService.checkPaymentStatus(transactionId);
          setPaymentStatus(response.data?.status || null);

          if (response.data?.status === 'SUCCESSFUL') {
            toast.success('Payment successful! Thank you for your donation.');
            clearInterval(intervalId);
            onClose();
          } else if (response.data?.status === 'FAILED') {
            toast.error('Payment failed. Please try again.');
            clearInterval(intervalId);
            setTransactionId(null);
            setPaymentStatus(null);
          }
        } catch (error) {
          console.error('Error checking payment status:', error);
        }
      }, 5000); // Check every 5 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [transactionId, paymentStatus, onClose]);

  const handleDonate = async () => {
    if (!amount) {
      toast.error('Please enter an amount');
      return;
    }

    setIsProcessing(true);
    try {
      switch (paymentMethod) {
        case 'mtn':
          if (!phoneNumber) {
            toast.error('Please enter your MTN phone number');
            setIsProcessing(false);
            return;
          }
          await handleMTNPayment();
          break;
        case 'bank':
          if (!email) {
            toast.error('Please enter your email address');
            setIsProcessing(false);
            return;
          }
          await handleBankTransfer();
          break;
        default:
          throw new Error('Invalid payment method');
      }
    } catch (error) {
      console.error('Payment failed:', error);
      toast.error('There was an error processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleMTNPayment = async () => {
    try {
      const response = await mtnService.initiatePayment({
        amount: parseFloat(amount),
        phoneNumber,
        currency: 'RWF'
      });

      if (response.success) {
        setTransactionId(response.data?.transactionId || null);
        setPaymentStatus(response.data?.status || null);
        toast.success('MTN Mobile Money payment initiated. Please check your phone for the confirmation prompt.');
      } else {
        toast.error(response.message || 'Failed to initiate MTN payment');
      }
    } catch (error) {
      console.error('MTN payment error:', error);
      toast.error('Failed to process MTN payment. Please try again.');
    }
  };

  const handleBankTransfer = async () => {
    try {
      const response = await paymentService.getBankTransferDetails({
        amount: parseFloat(amount),
        email
      });

      if (response.success) {
        toast.success('Bank transfer details have been sent to your email.');
        onClose();
      } else {
        toast.error(response.message || 'Failed to send bank details');
      }
    } catch (error) {
      console.error('Bank transfer error:', error);
      toast.error('Failed to process bank transfer request. Please try again.');
    }
  };

  const validatePhoneNumber = (phone: string) => {
    // MTN Rwanda phone number format: 07XXXXXXXX
    const phoneRegex = /^07\d{8}$/;
    return phoneRegex.test(phone);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="w-full max-w-sm md:max-w-md overflow-y-auto p-6">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('donationModal.title', 'Make a Donation')}</AlertDialogTitle>
          <AlertDialogDescription className="mt-2 mb-4">
            {t('donationModal.description', 'Your contribution will help us continue our mission of empowering Rwandan youth. Please enter the amount you would like to donate.')}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="space-y-6">
          <div className="w-full block">
            <Label htmlFor="amount" className="mb-2 block">{t('donationModal.amountLabel', 'Donation Amount (RWF)')}</Label>
            <Input
              id="amount"
              type="number"
              placeholder={t('donationModal.amountPlaceholder', 'Enter amount')}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full"
            />
            <div className="flex flex-wrap gap-2 w-full mt-2">
              <Button
                variant="outline"
                onClick={() => setAmount('10000')}
                className="flex-1 min-w-[100px]"
              >
                10,000 RWF
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount('25000')}
                className="flex-1 min-w-[100px]"
              >
                25,000 RWF
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount('50000')}
                className="flex-1 min-w-[100px]"
              >
                50,000 RWF
              </Button>
              <Button
                variant="outline"
                onClick={() => setAmount('100000')}
                className="flex-1 min-w-[100px]"
              >
                100,000 RWF
              </Button>
            </div>
          </div>

          <Tabs defaultValue="paypal" className="w-full" onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="paypal">{t('donationModal.paypalTab', 'PayPal')}</TabsTrigger>
              <TabsTrigger value="mtn">{t('donationModal.mtnTab', 'MTN Mobile Money')}</TabsTrigger>
              <TabsTrigger value="bank">{t('donationModal.bankTab', 'Bank Transfer')}</TabsTrigger>
            </TabsList>
            <TabsContent value="paypal" className="mt-4">
              <div className="text-sm text-gray-500 mb-4">
                {t('donationModal.paypalDescription', 'You will be redirected to PayPal to complete your payment securely.')}
              </div>
              {amount && (
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: amount,
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={async (data, actions) => {
                    if (actions.order) {
                      const order = await actions.order.capture();
                      try {
                        const response = await paymentService.verifyPayPalPayment(order.id);
                        if (response.success) {
                          toast.success('Thank you for your donation!');
                          onClose();
                        } else {
                          toast.error(response.message || 'Payment verification failed');
                        }
                      } catch (error) {
                        console.error('PayPal verification error:', error);
                        toast.error('Failed to verify payment. Please contact support.');
                      }
                    }
                  }}
                  onError={(err) => {
                    console.error('PayPal error:', err);
                    toast.error('There was an error processing your PayPal payment.');
                  }}
                />
              )}
            </TabsContent>
            <TabsContent value="mtn" className="mt-4 space-y-4">
              <div className="w-full block">
                <Label htmlFor="phoneNumber" className="mb-2 block">{t('donationModal.phoneNumberLabel', 'MTN Phone Number')}</Label>
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder={t('donationModal.phoneNumberPlaceholder', 'e.g., 078XXXXXXX')}
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full"
                />
                {!validatePhoneNumber(phoneNumber) && phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{t('donationModal.phoneNumberError', 'Please enter a valid MTN Rwanda phone number (e.g., 078XXXXXXX).')}</p>
                )}
              </div>
              {paymentStatus === 'PENDING' && (
                <div className="text-sm text-blue-500">
                  {t('donationModal.waiting', 'Waiting for payment confirmation. Please check your phone.')}
                </div>
              )}
              <Button
                onClick={handleDonate}
                disabled={!amount || !phoneNumber || !validatePhoneNumber(phoneNumber) || isProcessing || paymentStatus === 'PENDING'}
                className="w-full bg-vjn-blue hover:bg-vjn-light-blue"
              >
                {isProcessing ? t('donationModal.processing', 'Processing...') : paymentStatus === 'PENDING' ? t('donationModal.waiting', 'Waiting for Confirmation...') : t('donationModal.payMtn', 'Pay with MTN Mobile Money')}
              </Button>
            </TabsContent>
            <TabsContent value="bank" className="mt-4 space-y-4">
              <div className="w-full block">
                <Label htmlFor="email" className="mb-2 block">{t('donationModal.emailLabel', 'Email Address')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t('donationModal.emailPlaceholder', 'Enter your email')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="text-sm text-gray-500 space-y-1 w-full">
                <p>{t('donationModal.bankName', 'Bank: Bank of Kigali')}</p>
                <p>{t('donationModal.accountName', 'Account Name: VJN Rwanda')}</p>
                <p>{t('donationModal.accountNumber', 'Account Number: 0000000000')}</p>
                <p>{t('donationModal.swiftCode', 'Swift Code: BKIGRWRW')}</p>
                <p>{t('donationModal.branch', 'Branch: Kigali Main Branch')}</p>
              </div>
              <Button
                onClick={handleDonate}
                disabled={!amount || !email || isProcessing}
                className="w-full bg-vjn-blue hover:bg-vjn-light-blue"
              >
                {isProcessing ? t('donationModal.processing', 'Processing...') : t('donationModal.getBankDetails', 'Get Bank Details')}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
        <AlertDialogFooter className="mt-6">
          {paymentMethod !== 'paypal' && paymentStatus !== 'PENDING' && (
            <Button onClick={handleDonate} disabled={isProcessing}>
              {isProcessing ? t('donationModal.processing', 'Processing...') : t('donationModal.submit', 'Submit Donation')}
            </Button>
          )}
          <AlertDialogCancel disabled={isProcessing}>{t('donationModal.cancel', 'Cancel')}</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DonationModal; 