import nodemailer from 'nodemailer';

interface BankDetails {
  amount: number;
  name?: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  swiftCode: string;
  branch: string;
  address: string;
  phone: string;
  email: string;
}

export class EmailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });
  }

  async sendBankDetails(to: string, details: BankDetails) {
    const subject = 'VJN Rwanda - Bank Transfer Details';
    const html = `
      <h1>Thank you for your donation to VJN Rwanda</h1>
      <p>Dear ${details.name || 'Valued Donor'},</p>
      <p>Thank you for choosing to support our cause. Here are the bank details for your donation of ${details.amount} RWF:</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin: 20px 0;">
        <h2>Bank Transfer Details</h2>
        <p><strong>Bank Name:</strong> ${details.bankName}</p>
        <p><strong>Account Name:</strong> ${details.accountName}</p>
        <p><strong>Account Number:</strong> ${details.accountNumber}</p>
        <p><strong>Swift Code:</strong> ${details.swiftCode}</p>
        <p><strong>Branch:</strong> ${details.branch}</p>
        <p><strong>Address:</strong> ${details.address}</p>
        <p><strong>Phone:</strong> ${details.phone}</p>
        <p><strong>Email:</strong> ${details.email}</p>
      </div>

      <p>Please include your name and email address in the transfer reference so we can properly acknowledge your donation.</p>
      
      <p>If you have any questions, please don't hesitate to contact us.</p>
      
      <p>Best regards,<br>VJN Rwanda Team</p>
    `;

    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_FROM,
        to,
        subject,
        html
      });

      return {
        success: true,
        message: 'Bank details sent successfully'
      };
    } catch (error) {
      console.error('Email sending error:', error);
      throw error;
    }
  }
} 