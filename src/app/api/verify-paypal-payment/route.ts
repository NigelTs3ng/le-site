import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase } from '@/lib/supabaseClient';

export async function POST(req: NextRequest) {
  try {
    const { orderID, orderDetails, applicationData, fileDataUrl } = await req.json();
    
    // Verify the payment was successful
    if (orderDetails.status === 'COMPLETED') {
      // Handle file upload (same as Stripe flow)
      let file_url = '';
      if (fileDataUrl) {
        // Convert DataURL back to File
        const arr = fileDataUrl.split(",");
        const mime = arr[0].match(/:(.*?);/)![1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        const file = new File([u8arr], "resume.pdf", { type: mime });

        // Upload file to Supabase (same as Stripe flow)
        const filePath = `resumes/${Date.now()}-${file.name}`;
        const { error: uploadError } = await supabase.storage.from('resumes').upload(filePath, file, { contentType: file.type });
        if (uploadError) {
          console.error('File upload error:', uploadError);
          return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
        }
        file_url = supabase.storage.from('resumes').getPublicUrl(filePath).data.publicUrl;
      }

      // Save to Supabase database (same structure as Stripe flow)
      const { error: dbError } = await supabase.from('submissions').insert([
        { 
          ...applicationData, 
          file_url,
          created_at: new Date().toISOString()
        },
      ]);
      
      if (dbError) {
        console.error('Database error:', dbError);
        return NextResponse.json({ error: 'Failed to save to database' }, { status: 500 });
      }

      // Send email notification (same format as Stripe)
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const { name, country, email, phone, industry, description } = applicationData;

      await transporter.sendMail({
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
          <p><strong>Resume Link:</strong> <a href="${file_url}">View Resume</a></p>
          <p><strong>Payment Method:</strong> PayPal</p>
          <p><strong>Transaction ID:</strong> ${orderID}</p>
        `,
      });

      return NextResponse.json({ success: true, orderDetails });
    } else {
      throw new Error('PayPal payment not completed');
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    console.error('PayPal verification error:', errorMsg);
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
} 