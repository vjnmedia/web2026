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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>Make a Donation</AlertDialogTitle>
          <AlertDialogDescription>
            Your contribution will help us continue our mission of empowering Rwandan youth.
            Please enter the amount you would like to donate.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <Input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="mb-4"
          />
          <div className="flex gap-2 mb-6">
            <Button
              variant="outline"
              onClick={() => setAmount('10000')}
              className="flex-1"
            >
              10,000 RWF
            </Button>
            <Button
              variant="outline"
              onClick={() => setAmount('25000')}
              className="flex-1"
            >
              25,000 RWF
            </Button>
            <Button
              variant="outline"
              onClick={() => setAmount('50000')}
              className="flex-1"
            >
              50,000 RWF
            </Button>
            <Button
              variant="outline"
              onClick={() => setAmount('100000')}
              className="flex-1"
            >
              100,000 RWF
            </Button>
          </div>

          <Tabs defaultValue="paypal" className="w-full" onValueChange={setPaymentMethod}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="paypal">PayPal</TabsTrigger>
              <TabsTrigger value="mtn">MTN Mobile Money</TabsTrigger>
              <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
            </TabsList>
            <TabsContent value="paypal" className="mt-4">
              <div className="text-sm text-gray-500 mb-4">
                You will be redirected to PayPal to complete your payment securely.
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
            <TabsContent value="mtn" className="mt-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-500">
                  Enter your MTN Mobile Money phone number to receive a payment prompt.
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">MTN Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="07XXXXXXXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={!phoneNumber || validatePhoneNumber(phoneNumber) ? '' : 'border-red-500'}
                  />
                  {phoneNumber && !validatePhoneNumber(phoneNumber) && (
                    <p className="text-sm text-red-500">Please enter a valid MTN phone number (07XXXXXXXX)</p>
                  )}
                </div>
                {paymentStatus === 'PENDING' && (
                  <div className="text-sm text-blue-500">
                    Waiting for payment confirmation. Please check your phone.
                  </div>
                )}
                <Button
                  onClick={handleDonate}
                  disabled={!amount || !phoneNumber || !validatePhoneNumber(phoneNumber) || isProcessing || paymentStatus === 'PENDING'}
                  className="w-full bg-vjn-blue hover:bg-vjn-light-blue"
                >
                  {isProcessing ? 'Processing...' : paymentStatus === 'PENDING' ? 'Waiting for Confirmation...' : 'Pay with MTN Mobile Money'}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="bank" className="mt-4">
              <div className="space-y-4">
                <div className="text-sm text-gray-500">
                  Enter your email address to receive bank transfer details.
                </div>
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="text-sm text-gray-500">
                  <p className="mb-2">Bank: Bank of Kigali</p>
                  <p className="mb-2">Account Name: VJN Rwanda</p>
                  <p className="mb-2">Account Number: 0000000000</p>
                  <p className="mb-2">Swift Code: BKIGRWRW</p>
                  <p>Branch: Kigali Main Branch</p>
                </div>
                <Button
                  onClick={handleDonate}
                  disabled={!amount || !email || isProcessing}
                  className="w-full bg-vjn-blue hover:bg-vjn-light-blue"
                >
                  {isProcessing ? 'Processing...' : 'Get Bank Details'}
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DonationModal; 