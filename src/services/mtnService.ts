import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

interface MTNPaymentResponse {
  success: boolean;
  message: string;
  data?: {
    transactionId: string;
    status: string;
    amount: number;
    currency: string;
    phoneNumber: string;
  };
}

interface MTNPaymentRequest {
  amount: number;
  phoneNumber: string;
  currency?: string;
}

export const mtnService = {
  // Initiate MTN Mobile Money payment
  initiatePayment: async (paymentData: MTNPaymentRequest): Promise<MTNPaymentResponse> => {
    try {
      const response = await axios.post(`${API_URL}/payments/mtn/initiate`, paymentData);
      return response.data;
    } catch (error) {
      console.error('MTN payment error:', error);
      throw error;
    }
  },

  // Check payment status
  checkPaymentStatus: async (transactionId: string): Promise<MTNPaymentResponse> => {
    try {
      const response = await axios.get(`${API_URL}/payments/mtn/status/${transactionId}`);
      return response.data;
    } catch (error) {
      console.error('MTN status check error:', error);
      throw error;
    }
  }
}; 