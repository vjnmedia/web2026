import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface PaymentResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface MTNPaymentRequest {
  amount: number;
  phoneNumber: string;
  currency?: string;
}

interface BankTransferRequest {
  amount: number;
  email: string;
  name?: string;
}

export const paymentService = {
  // PayPal payment verification
  verifyPayPalPayment: async (orderId: string): Promise<PaymentResponse> => {
    try {
      const response = await axios.post(`${API_URL}/payments/paypal/verify`, { orderId });
      return response.data;
    } catch (error) {
      console.error('PayPal verification error:', error);
      throw error;
    }
  },

  // MTN Mobile Money payment
  initiateMTNPayment: async (paymentData: MTNPaymentRequest): Promise<PaymentResponse> => {
    try {
      const response = await axios.post(`${API_URL}/payments/mtn/initiate`, paymentData);
      return response.data;
    } catch (error) {
      console.error('MTN payment error:', error);
      throw error;
    }
  },

  // Bank transfer details
  getBankTransferDetails: async (transferData: BankTransferRequest): Promise<PaymentResponse> => {
    try {
      const response = await axios.post(`${API_URL}/payments/bank/details`, transferData);
      return response.data;
    } catch (error) {
      console.error('Bank transfer error:', error);
      throw error;
    }
  },

  // Check payment status
  checkPaymentStatus: async (paymentId: string): Promise<PaymentResponse> => {
    try {
      const response = await axios.get(`${API_URL}/payments/status/${paymentId}`);
      return response.data;
    } catch (error) {
      console.error('Payment status check error:', error);
      throw error;
    }
  }
}; 