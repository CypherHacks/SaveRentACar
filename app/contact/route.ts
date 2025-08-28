// app/api/contact/route.ts
import nodemailer from "nodemailer";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { name = "", email = "", phone = "", subject = "", message = "", hp = "" } = body as Record<string, string>;

    // Simple anti-bot honeypot
    if (hp) return new Response(JSON.stringify({ ok: true }), { status: 200 });

    // Basic validation
    if (!name.trim() || !isEmail(email) || !subject.trim() || !message.trim()) {
      return new Response(JSON.stringify({ error: "Invalid input." }), { status: 400 });
    }

    // Map subject values (from your select) to readable labels
    const subjectMap: Record<string, string> = {
      booking: "Car Booking Inquiry",
      destinations: "Destination Information",
      pricing: "Pricing Questions",
      support: "Customer Support",
      feedback: "Feedback",
      other: "Other",
    };
    const subjectLabel = subjectMap[subject] ?? subject;

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const to = process.env.TO_EMAIL || process.env.GMAIL_USER;
    if (!to || !process.env.GMAIL_USER) {
      return new Response(JSON.stringify({ error: "Email not configured." }), { status: 500 });
    }

    const plain = [
      `New contact form submission`,
      `--------------------------------`,
      `Name:    ${name}`,
      `Email:   ${email}`,
      `Phone:   ${phone || "-"}`,
      `Subject: ${subjectLabel}`,
      ``,
      message,
    ].join("\n");

    const html = `
      <div style="font-family:system-ui,Segoe UI,Roboto,Helvetica,Arial,sans-serif">
        <h2>New contact form submission</h2>
        <table style="border-collapse:collapse">
          <tr><td><b>Name:</b></td><td>${escapeHtml(name)}</td></tr>
          <tr><td><b>Email:</b></td><td>${escapeHtml(email)}</td></tr>
          <tr><td><b>Phone:</b></td><td>${escapeHtml(phone || "-")}</td></tr>
          <tr><td><b>Subject:</b></td><td>${escapeHtml(subjectLabel)}</td></tr>
        </table>
        <hr />
        <pre style="white-space:pre-wrap;font:inherit">${escapeHtml(message)}</pre>
      </div>
    `;

    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`, // authenticated sender
      replyTo: email, // hitting reply goes to the user
      to,
      subject: `Contact form: ${subjectLabel}`,
      text: plain,
      html,
    });

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to send." }), { status: 500 });
  }
}

// Tiny HTML escaper to avoid HTML injection inside the email
function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
