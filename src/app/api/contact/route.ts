import { NextResponse } from 'next/server';
import { z } from 'zod';
import { Resend } from 'resend';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(80),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters.' }).max(120),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(3000),
  honeypot: z.string().optional(), // Anti-spam bot honeypot
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // Spam honeypot detection
    if (validatedData.honeypot && validatedData.honeypot.trim().length > 0) {
      // Return 200 silently to confuse bots
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const recipientEmail = process.env.CONTACT_NOTIFICATION_EMAIL || 'vickysrana2@gmail.com';
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'VickyRanaDev Portfolio <onboarding@resend.dev>';

    // If Resend API key is configured, send real email directly to Gmail
    if (apiKey) {
      const resend = new Resend(apiKey);

      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0b0f19; color: #f1f5f9; border-radius: 16px; border: 1px solid rgba(255,255,255,0.1);">
          <div style="border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 16px; margin-bottom: 20px;">
            <span style="display: inline-block; font-family: monospace; font-size: 13px; font-weight: bold; background: rgba(99,102,241,0.2); color: #818cf8; padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(99,102,241,0.3);">&lt;VR/&gt; VickyRana Dev</span>
            <h2 style="font-size: 20px; font-weight: 800; color: #ffffff; margin: 12px 0 4px 0;">New Contact Form Message</h2>
            <p style="font-size: 13px; color: #94a3b8; margin: 0;">Received via your developer portfolio website</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px; width: 110px;">Sender:</td>
              <td style="padding: 8px 0; color: #f8fafc; font-size: 14px; font-weight: 600;">${validatedData.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Email:</td>
              <td style="padding: 8px 0; color: #818cf8; font-size: 14px;"><a href="mailto:${validatedData.email}" style="color: #818cf8; text-decoration: none;">${validatedData.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #94a3b8; font-size: 13px;">Topic / Subject:</td>
              <td style="padding: 8px 0; color: #f8fafc; font-size: 14px; font-weight: 600;">${validatedData.subject}</td>
            </tr>
          </table>

          <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8; margin-bottom: 10px;">Message Body</div>
            <p style="font-size: 14px; line-height: 1.6; color: #e2e8f0; margin: 0; white-space: pre-wrap;">${validatedData.message}</p>
          </div>

          <div style="text-align: center; margin-bottom: 20px;">
            <a href="mailto:${validatedData.email}?subject=Re: ${encodeURIComponent(validatedData.subject)}" style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; font-size: 13px; font-weight: 600; text-decoration: none; padding: 12px 28px; border-radius: 10px; box-shadow: 0 4px 14px rgba(99,102,241,0.35);">
              Reply Directly to ${validatedData.name}
            </a>
          </div>

          <div style="border-top: 1px solid rgba(255,255,255,0.08); padding-top: 14px; text-align: center; font-size: 11px; color: #64748b;">
            Delivered to ${recipientEmail} • Timestamp: ${new Date().toUTCString()}
          </div>
        </div>
      `;

      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: [recipientEmail],
        replyTo: validatedData.email,
        subject: `[Portfolio Inquiry] ${validatedData.subject} - ${validatedData.name}`,
        html: emailHtml,
      });

      if (error) {
        console.error('Resend dispatch error:', error);
        return NextResponse.json(
          { success: false, message: 'Email dispatch service temporarily unavailable. Please email directly at vickysrana2@gmail.com.' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Thank you for reaching out! Your message has been delivered to Vicky Rana. You will receive a response shortly.',
        deliveryId: data?.id,
        receivedAt: new Date().toISOString(),
      });
    }

    // Fallback: If RESEND_API_KEY is not yet defined, log clearly and notify the client
    console.log(`[Contact Form Received] From: ${validatedData.name} (${validatedData.email}), Subject: ${validatedData.subject}`);

    return NextResponse.json({
      success: true,
      message: 'Thank you for reaching out! Your message has been received successfully. I will get back to you shortly.',
      receivedAt: new Date().toISOString(),
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Please verify all required form fields.',
          errors: error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { success: false, message: 'An unexpected server error occurred. Please try again or reach out directly via email.' },
      { status: 500 }
    );
  }
}
