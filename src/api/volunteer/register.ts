import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      age,
      program,
      availability,
      skills,
      motivation,
    } = req.body;

    // Send confirmation email to volunteer
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: email,
      subject: 'Thank you for your volunteer application - Vision Jeunesse Nouvelle',
      html: `
        <h1>Thank you for your interest in volunteering with us!</h1>
        <p>Dear ${firstName} ${lastName},</p>
        <p>We have received your volunteer application for our ${program} program. We appreciate your interest in contributing to our mission.</p>
        <p>Our team will review your application and contact you within 5 business days to discuss the next steps.</p>
        <p>Here's a summary of your application:</p>
        <ul>
          <li>Program: ${program}</li>
          <li>Availability: ${availability}</li>
          <li>Age: ${age}</li>
          <li>Phone: ${phone}</li>
        </ul>
        <p>If you have any questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>Vision Jeunesse Nouvelle Team</p>
      `,
    });

    // Send notification email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: 'admin@visionjeunessenouvelle.org.rw',
      subject: 'New Volunteer Application Received',
      html: `
        <h1>New Volunteer Application</h1>
        <p>A new volunteer application has been received:</p>
        <ul>
          <li>Name: ${firstName} ${lastName}</li>
          <li>Email: ${email}</li>
          <li>Phone: ${phone}</li>
          <li>Age: ${age}</li>
          <li>Program: ${program}</li>
          <li>Availability: ${availability}</li>
          <li>Skills: ${skills}</li>
          <li>Motivation: ${motivation}</li>
        </ul>
      `,
    });

    return res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error processing volunteer application:', error);
    return res.status(500).json({ message: 'Error processing application' });
  }
} 