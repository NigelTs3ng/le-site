import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2022-11-15' });

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const session_id = formData.get("session_id") as string;
  if (!session_id) return NextResponse.json({ error: "Missing session_id" }, { status: 400 });

  // Verify payment
  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (session.payment_status !== "paid") {
    return NextResponse.json({ error: "Payment not completed" }, { status: 402 });
  }

  // Extract form fields
  const fields: Record<string, string> = {};
  let file: File | null = null;
  for (const [key, value] of formData.entries()) {
    if (key === "file" && value instanceof File) file = value;
    else if (key !== "session_id") fields[key] = value as string;
  }

  // Upload file to Supabase
  let file_url = '';
  if (file) {
    const filePath = `resumes/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('resumes').upload(filePath, file, { contentType: file.type });
    if (error) throw error;
    file_url = supabase.storage.from('resumes').getPublicUrl(filePath).data.publicUrl;
  }

  // Save to Supabase
  const { error: dbError } = await supabase.from('submissions').insert([
    { ...fields, file_url, created_at: new Date().toISOString() },
  ]);
  if (dbError) throw dbError;

  // Send email (optional)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: 'leadingedge338@gmail.com',
    subject: 'New Application Submission',
    html: `
      <h1>New Application</h1>
      <p><strong>Name:</strong> ${fields.name}</p>
      <p><strong>Country:</strong> ${fields.country}</p>
      <p><strong>Email:</strong> ${fields.email}</p>
      <p><strong>Phone:</strong> ${fields.phone}</p>
      <p><strong>Industry:</strong> ${fields.industry}</p>
      <p><strong>Description:</strong> ${fields.description}</p>
      <p><strong>Resume Link:</strong> <a href="${file_url}">View Resume</a></p>
    `,
  });

  return NextResponse.json({ success: true });
} 