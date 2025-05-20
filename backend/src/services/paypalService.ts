import paypal from '@paypal/checkout-server-sdk';

export class PayPalService {
  private client: paypal.core.PayPalHttpClient;

  constructor() {
    const environment = process.env.NODE_ENV === 'production'
      ? new paypal.core.LiveEnvironment(
          process.env.PAYPAL_CLIENT_ID!,
          process.env.PAYPAL_CLIENT_SECRET!
        )
      : new paypal.core.SandboxEnvironment(
          process.env.PAYPAL_CLIENT_ID!,
          process.env.PAYPAL_CLIENT_SECRET!
        );

    this.client = new paypal.core.PayPalHttpClient(environment);
  }

  async verifyPayment(orderId: string) {
    try {
      const request = new paypal.orders.OrdersGetRequest(orderId);
      const order = await this.client.execute(request);

      if (order.result.status === 'COMPLETED') {
        return {
          success: true,
          message: 'Payment verified successfully',
          data: order.result
        };
      }

      return {
        success: false,
        message: 'Payment not completed',
        data: order.result
      };
    } catch (error) {
      console.error('PayPal verification error:', error);
      throw error;
    }
  }

  async checkPaymentStatus(paymentId: string) {
    try {
      const request = new paypal.orders.OrdersGetRequest(paymentId);
      const order = await this.client.execute(request);

      return {
        success: true,
        message: 'Payment status retrieved successfully',
        data: {
          status: order.result.status,
          amount: order.result.purchase_units[0].amount,
          createTime: order.result.create_time,
          updateTime: order.result.update_time
        }
      };
    } catch (error) {
      console.error('PayPal status check error:', error);
      throw error;
    }
  }
} 