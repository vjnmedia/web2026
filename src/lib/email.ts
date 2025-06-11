import sgMail from '@sendgrid/mail';

// Initialize SendGrid with your API key
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendWelcomeEmail = async (email: string) => {
  if (!process.env.SENDGRID_API_KEY) {
    throw new Error('SendGrid API key is not configured');
  }

  const msg = {
    to: email,
    from: process.env.SENDGRID_FROM_EMAIL || 'your-verified-sender@yourdomain.com',
    subject: 'Welcome to Vision Jeunesse Nouvelle Newsletter!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #2563eb;">Welcome to Our Newsletter!</h1>
        <p>Thank you for subscribing to Vision Jeunesse Nouvelle's newsletter.</p>
        <p>You'll now receive updates about:</p>
        <ul>
          <li>Our latest programs and initiatives</li>
          <li>Success stories from our community</li>
          <li>Upcoming events and opportunities</li>
          <li>Ways to get involved and make a difference</li>
        </ul>
        <p>Stay connected with us on social media:</p>
        <div>
          <a href="https://facebook.com/visionjeunesse2" style="color: #2563eb;">Facebook</a> |
          <a href="https://twitter.com/visionjeunesse2" style="color: #2563eb;">Twitter</a> |
          <a href="https://instagram.com/visionjeunesse2" style="color: #2563eb;">Instagram</a>
        </div>
        <p style="margin-top: 20px; font-size: 12px; color: #666;">
          If you didn't subscribe to this newsletter, you can safely ignore this email.
        </p>
      </div>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error('Error sending welcome email:', error);
    throw error;
  }
}; 