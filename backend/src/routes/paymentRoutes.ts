import express from 'express';
import { body, validationResult } from 'express-validator';
import { PayPalService } from '../services/paypalService';
import { MTNService } from '../services/mtnService';
import { BankService } from '../services/bankService';
import { EmailService } from '../services/emailService';

const router = express.Router();
const paypalService = new PayPalService();
const mtnService = new MTNService();
const bankService = new BankService();
const emailService = new EmailService();

// PayPal payment verification
router.post('/paypal/verify',
  body('orderId').notEmpty(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Invalid request' });
      }

      const { orderId } = req.body;
      const result = await paypalService.verifyPayment(orderId);
      res.json(result);
    } catch (error) {
      console.error('PayPal verification error:', error);
      res.status(500).json({ success: false, message: 'Payment verification failed' });
    }
  }
);

// MTN Mobile Money payment
router.post('/mtn/initiate',
  [
    body('amount').isNumeric(),
    body('phoneNumber').matches(/^07\d{8}$/),
    body('currency').optional().isString()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Invalid request' });
      }

      const { amount, phoneNumber, currency } = req.body;
      const result = await mtnService.initiatePayment(amount, phoneNumber, currency);
      res.json(result);
    } catch (error) {
      console.error('MTN payment error:', error);
      res.status(500).json({ success: false, message: 'Payment initiation failed' });
    }
  }
);

// Bank transfer details
router.post('/bank/details',
  [
    body('amount').isNumeric(),
    body('email').isEmail()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, message: 'Invalid request' });
      }

      const { amount, email, name } = req.body;
      const bankDetails = bankService.getBankDetails();
      
      // Send email with bank details
      await emailService.sendBankDetails(email, {
        amount,
        name,
        ...bankDetails
      });

      res.json({
        success: true,
        message: 'Bank details sent successfully'
      });
    } catch (error) {
      console.error('Bank transfer error:', error);
      res.status(500).json({ success: false, message: 'Failed to send bank details' });
    }
  }
);

// Check payment status
router.get('/status/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const status = await paypalService.checkPaymentStatus(paymentId);
    res.json(status);
  } catch (error) {
    console.error('Payment status check error:', error);
    res.status(500).json({ success: false, message: 'Failed to check payment status' });
  }
});

export default router; 