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

      // Send acknowledgment email to user
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      // Generate official serial number
      const serialNumber = `LE-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

      await transporter.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: applicationData.email,
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
                Dear <strong>${applicationData.name}</strong>,
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
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${applicationData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Email:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${applicationData.email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Phone:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${applicationData.countryCode} ${applicationData.phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Country:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${applicationData.country}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: bold; color: #333;">Industry:</td>
                  <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #333;">${applicationData.industry}</td>
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

      // Send email notification (same format as Stripe)
      const transporter2 = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_EMAIL,
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      const { name, country, email, phone, industry, description } = applicationData;

      await transporter2.sendMail({
        from: process.env.GMAIL_EMAIL,
        to: 'leadingedge338@gmail.com',
        subject: 'New Application Submission',
        html: `
          <h1>New Application</h1>
          <p><strong>Serial Number:</strong> ${serialNumber}</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${applicationData.countryCode} ${phone}</p>
          <p><strong>Industry:</strong> ${industry}</p>
          <p><strong>Description:</strong> ${description}</p>
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