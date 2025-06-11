import express from 'express';
import nodemailer from 'nodemailer';
import { Router } from 'express';

const router = Router();

// Configure email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

router.post('/register', async (req, res) => {
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
      from: process.env.SMTP_FROM || 'Vision Jeunesse Nouvelle <admin@visionjeunessenouvelle.org.rw>',
      to: email,
      subject: 'Thank you for your volunteer application - Vision Jeunesse Nouvelle',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1e40af; text-align: center;">Thank you for your interest in volunteering with us!</h1>
          <p>Dear ${firstName} ${lastName},</p>
          <p>We have received your volunteer application for our ${program} program. We appreciate your interest in contributing to our mission.</p>
          <p>Our team will review your application and contact you within 5 business days to discuss the next steps.</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h2 style="color: #1e40af; margin-top: 0;">Application Summary:</h2>
            <ul style="list-style-type: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>Program:</strong> ${program}</li>
              <li style="margin-bottom: 10px;"><strong>Availability:</strong> ${availability}</li>
              <li style="margin-bottom: 10px;"><strong>Age:</strong> ${age}</li>
              <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
            </ul>
          </div>
          <p>If you have any questions, please don't hesitate to contact us.</p>
          <p style="margin-top: 30px;">Best regards,<br><strong>Vision Jeunesse Nouvelle Team</strong></p>
        </div>
      `,
    });

    // Send notification email to admin
    await transporter.sendMail({
      from: process.env.SMTP_FROM || 'Vision Jeunesse Nouvelle <admin@visionjeunessenouvelle.org.rw>',
      to: 'admin@visionjeunessenouvelle.org.rw',
      subject: 'New Volunteer Application Received',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #1e40af; text-align: center;">New Volunteer Application</h1>
          <p>A new volunteer application has been received:</p>
          <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <ul style="list-style-type: none; padding: 0;">
              <li style="margin-bottom: 10px;"><strong>Name:</strong> ${firstName} ${lastName}</li>
              <li style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</li>
              <li style="margin-bottom: 10px;"><strong>Phone:</strong> ${phone}</li>
              <li style="margin-bottom: 10px;"><strong>Age:</strong> ${age}</li>
              <li style="margin-bottom: 10px;"><strong>Program:</strong> ${program}</li>
              <li style="margin-bottom: 10px;"><strong>Availability:</strong> ${availability}</li>
              <li style="margin-bottom: 10px;"><strong>Skills:</strong> ${skills}</li>
              <li style="margin-bottom: 10px;"><strong>Motivation:</strong> ${motivation}</li>
            </ul>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error processing volunteer application:', error);
    return res.status(500).json({ message: 'Error processing application' });
  }
});

export default router; 