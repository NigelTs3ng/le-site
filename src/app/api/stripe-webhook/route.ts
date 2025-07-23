import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';
import { unlink } from 'fs/promises';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-06-30.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `Webhook error: ${errorMsg}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const { name, country, email, phone, industry, description, tempFilePath } = session.metadata || {};

    const mailOptions = {
      from: process.env.GMAIL_EMAIL,
      to: 'leadingedge338@gmail.com',
      subject: 'New Application Submission',
      html: `
        <h1>New Application</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Industry:</strong> ${industry}</p>
        <p><strong>Description:</strong> ${description}</p>
      `,
      attachments: tempFilePath ? [{ path: tempFilePath }] : [],
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error: unknown) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      console.error('Failed to send email:', errorMsg);
      // Don't delete the file if the email fails, so we can retry
      return NextResponse.json({ error: 'Failed to send submission email.' }, { status: 500 });
    } finally {
      if (tempFilePath) {
        try {
          await unlink(tempFilePath);
        } catch (unlinkErr) {
          console.error(`Failed to delete temp file: ${tempFilePath}`, unlinkErr);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
} 