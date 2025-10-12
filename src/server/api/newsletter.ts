import { Router } from 'express';
import nodemailer from 'nodemailer';
import fs from 'fs';
import fsp from 'fs/promises';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Configure email transporter (reuse SMTP settings similar to volunteer route)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const ensureDir = async (dirPath: string) => {
  if (!fs.existsSync(dirPath)) {
    await fsp.mkdir(dirPath, { recursive: true });
  }
};

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

router.post('/subscribe', async (req, res) => {
  try {
    const { email, blogOptIn } = req.body || {};

    if (!email || !isValidEmail(email)) {
      return res.status(400).json({ message: 'Invalid email' });
    }

    // Persist to CSV under uploads/newsletter
    const newsletterDir = path.join(__dirname, '../../uploads/newsletter');
    await ensureDir(newsletterDir);
    const csvPath = path.join(newsletterDir, 'subscribers.csv');

    const timestamp = new Date().toISOString();
    const header = 'email,blogOptIn,timestamp\n';

    if (!fs.existsSync(csvPath)) {
      await fsp.writeFile(csvPath, header, 'utf8');
    } else {
      // Idempotency: skip if email already exists
      const existing = await fsp.readFile(csvPath, 'utf8');
      const already = existing.split(/\r?\n/).some(line => line.split(',')[0] === email);
      if (already) {
        return res.status(200).json({ message: 'Already subscribed' });
      }
    }

    await fsp.appendFile(csvPath, `${email},${Boolean(blogOptIn)},${timestamp}\n`, 'utf8');

    // Send welcome email
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@visionjeunessenouvelle.org.rw',
        to: email,
        subject: 'Welcome to Vision Jeunesse Nouvelle Newsletter',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h1 style="color: #1e40af;">Thank you for subscribing!</h1>
            <p>You will receive our latest news, events and opportunities.</p>
            ${blogOptIn ? '<p>You also opted in to receive blog posts.</p>' : ''}
            <p style="margin-top: 16px; font-size: 12px; color: #555;">If this wasn\'t you, you can ignore this email.</p>
          </div>
        `,
      });
    } catch (err) {
      // Log but do not fail the subscription due to email issues
      console.error('Newsletter welcome email error:', err);
    }

    return res.status(200).json({ message: 'Subscribed' });
  } catch (error: any) {
    console.error('Newsletter subscribe error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export default router;

// Helper to read subscribers with blog opt-in
const readBlogSubscribers = async (): Promise<string[]> => {
  const newsletterDir = path.join(__dirname, '../../uploads/newsletter');
  const csvPath = path.join(newsletterDir, 'subscribers.csv');
  if (!fs.existsSync(csvPath)) return [];
  const content = await fsp.readFile(csvPath, 'utf8');
  return content
    .split(/\r?\n/)
    .slice(1)
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [email, blogOptIn] = line.split(',');
      return blogOptIn === 'true' ? email : '';
    })
    .filter(Boolean);
};

// Send a specific blog post by ID
router.post('/send-post', async (req, res) => {
  try {
    const { postId } = req.body || {};
    if (!postId) return res.status(400).json({ message: 'postId required' });

    const post = await prisma.blogPost.findUnique({ where: { id: Number(postId) } });
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const recipients = await readBlogSubscribers();
    if (recipients.length === 0) return res.status(200).json({ message: 'No blog subscribers' });

    const subject = `New Blog: ${post.title}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h1 style="color:#1e40af;">${post.title}</h1>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="max-width:100%; height:auto;"/>` : ''}
        <div style="margin-top:12px;">${post.content}</div>
        <hr style="margin:24px 0;"/>
        <p style="font-size:12px;color:#555;">You received this because you opted to get blog posts from Vision Jeunesse Nouvelle.</p>
      </div>
    `;

    // Send sequentially to be safe with SMTP providers; simple approach
    for (const to of recipients) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@visionjeunessenouvelle.org.rw',
          to,
          subject,
          html,
        });
      } catch (err) {
        console.error('Error sending to', to, err);
      }
    }

    return res.status(200).json({ message: `Sent to ${recipients.length} subscribers` });
  } catch (error) {
    console.error('send-post error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Send the latest published blog post
router.post('/send-latest', async (_req, res) => {
  try {
    const post = await prisma.blogPost.findFirst({
      where: { status: 'published' },
      orderBy: { publishedAt: 'desc' },
    });
    if (!post) return res.status(404).json({ message: 'No published posts' });

    const recipients = await readBlogSubscribers();
    if (recipients.length === 0) return res.status(200).json({ message: 'No blog subscribers' });

    const subject = `New Blog: ${post.title}`;
    const html = `
      <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
        <h1 style="color:#1e40af;">${post.title}</h1>
        ${post.imageUrl ? `<img src="${post.imageUrl}" alt="${post.title}" style="max-width:100%; height:auto;"/>` : ''}
        <div style="margin-top:12px;">${post.content}</div>
        <hr style="margin:24px 0;"/>
        <p style="font-size:12px;color:#555;">You received this because you opted to get blog posts from Vision Jeunesse Nouvelle.</p>
      </div>
    `;

    for (const to of recipients) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@visionjeunessenouvelle.org.rw',
          to,
          subject,
          html,
        });
      } catch (err) {
        console.error('Error sending to', to, err);
      }
    }

    return res.status(200).json({ message: `Sent to ${recipients.length} subscribers` });
  } catch (error) {
    console.error('send-latest error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


