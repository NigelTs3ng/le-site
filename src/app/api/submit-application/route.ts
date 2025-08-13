import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';
import Stripe from 'stripe';
import nodemailer from 'nodemailer';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-06-30.basil' });

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
  
  // Debug: Log all form data
  console.log("Form data entries:");
  for (const [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }
  
  for (const [key, value] of formData.entries()) {
    if (key === "file" && value instanceof File) file = value;
    else if (key !== "session_id") {
      // Map frontend field names to database column names
      if (key === "countryCode") {
        fields["country_code"] = value as string;
      } else if (key === "phone") {
        // Store phone number as-is (without country code)
        fields["phone"] = value as string;
      } else {
        fields[key] = value as string;
      }
    }
  }
  
  // Debug: Log processed fields
  console.log("Processed fields:", fields); 

  // Upload file to Supabase
  let file_url = '';
  if (file) {
    const filePath = `resumes/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from('resumes').upload(filePath, file, { contentType: file.type });
    if (error) throw error;
    file_url = supabase.storage.from('resumes').getPublicUrl(filePath).data.publicUrl;
  }

  // Save to Supabase
  const { error: dbError } = await supabase.from('submissions').insert([
    { ...fields, file_url, created_at: new Date().toISOString() },
  ]);
  if (dbError) throw dbError;

  // Send email notifications
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  // Generate official serial number
  const serialNumber = `LE-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

  // Send acknowledgment email to user
  await transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: fields.email,
    subject: 'Application Received - Leading Edge Consultancy Services',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #2563a6; margin: 0; font-size: 24px;">LEADING-EDGE CONSULTANCY SERVICES</h1>
          <p style="color: #666; margin: 5px 0; font-size: 14px;">A TOTAL SOLUTION FOR EMPLOYMENT</p>
        </div>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 6px; margin-bottom: 25px;">
          <h2 style="color: #2563a6; margin: 0 0 15px 0; font-size: 18px;">Application Acknowledgment</h2>
          <p style="margin: 0; color: #333; line-height: 1.6;">
            Dear <strong>${fields.name}</strong>,
          </p>
          <p style="margin: 15px 0; color: #333; line-height: 1.6;">
            Thank you for submitting your application to Leading Edge Consultancy Services. We have successfully received your application and it is now under review.
          </p>
        </div>

        <div style="margin-bottom: 25px;">
          <h3 style="color: #2563a6; margin: 0 0 10px 0; font-size: 16px;">Application Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Application Serial Number:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #2563a6; font-family: monospace; font-size: 14px;">${serialNumber}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Name:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${fields.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${fields.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${fields.country_code} ${fields.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Country:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${fields.country}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Industry:</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${fields.industry}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #333;">Submission Date:</td>
              <td style="padding: 8px 0; color: #333;">${new Date().toLocaleDateString('en-SG', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</td>
            </tr>
          </table>
        </div>

        <div style="background-color: #e8f4fd; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
          <h4 style="color: #2563a6; margin: 0 0 10px 0; font-size: 14px;">What's Next?</h4>
          <ul style="margin: 0; padding-left: 20px; color: #333; line-height: 1.6;">
            <li>Our team will review your application within 2-3 business days</li>
            <li>You will receive an email update on the status of your application</li>
            <li>If shortlisted, we will contact you for further discussions</li>
          </ul>
        </div>

        <div style="text-align: center; margin-bottom: 25px;">
          <p style="margin: 0; color: #666; font-size: 14px;">
            <strong>Important:</strong> Please keep this serial number for future reference.
          </p>
        </div>

        <div style="border-top: 1px solid #e0e0e0; padding-top: 20px; text-align: center;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            <strong>Leading Edge Consultancy Services Pte Ltd</strong><br>
            60 Paya Lebar Road, #07-54 Paya Lebar Square, Singapore 409051<br>
            EA Licence No.: 12C6068 | Personal EA No.: R1108879<br>
            Phone: +65 90026161 | Email: stleading@gmail.com
          </p>
        </div>
      </div>
    `,
  });

  // Send notification email to admin (existing functionality)
  await transporter.sendMail({
    from: process.env.GMAIL_EMAIL,
    to: 'leadingedge338@gmail.com',
    subject: 'New Application Submission',
    html: `
      <h1>New Application</h1>
      <p><strong>Serial Number:</strong> ${serialNumber}</p>
      <p><strong>Name:</strong> ${fields.name}</p>
      <p><strong>Country:</strong> ${fields.country}</p>
      <p><strong>Email:</strong> ${fields.email}</p>
      <p><strong>Phone:</strong> ${fields.country_code} ${fields.phone}</p>
      <p><strong>Industry:</strong> ${fields.industry}</p>
      <p><strong>Description:</strong> ${fields.description}</p>
      <p><strong>Resume Link:</strong> <a href="${file_url}">View Resume</a></p>
    `,
  });

  return NextResponse.json({ success: true });
} 