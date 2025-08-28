// netlify/functions/contact.ts
import nodemailer from "nodemailer";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

const cors = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});
const json = (origin: string) => ({ "Content-Type": "application/json", ...cors(origin) });

// Netlify function signature (TypeScript)
export const handler: import("@netlify/functions").Handler = async (event) => {
  const origin = process.env.CORS_ORIGIN || "*";

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: cors(origin), body: "" };
  }
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, headers: json(origin), body: JSON.stringify({ error: "Method not allowed" }) };
  }

  let data: any = {};
  try { data = JSON.parse(event.body || "{}"); } catch {}

  const { name = "", email = "", phone = "", subject = "", message = "", hp = "" } = data;

  // Honeypot for bots
  if (hp) return { statusCode: 200, headers: json(origin), body: JSON.stringify({ ok: true }) };

  if (!name.trim() || !isEmail(email) || !subject.trim() || !message.trim()) {
    return { statusCode: 400, headers: json(origin), body: JSON.stringify({ error: "Invalid input." }) };
  }

  const subjectMap: Record<string, string> = {
    booking: "Car Booking Inquiry",
    destinations: "Destination Information",
    pricing: "Pricing Questions",
    support: "Customer Support",
    feedback: "Feedback",
    other: "Other",
  };
 const subjectLabel = (subjectMap[subject] ?? subject) || "Contact form";

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD, // 16-digit Gmail App Password
      },
    });

    const to = process.env.TO_EMAIL || process.env.GMAIL_USER;

    const plain = [
      `New contact form submission`,
      `---------------------------`,
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
      from: `"${name}" <${process.env.GMAIL_USER}>`, // authenticated Gmail must be the sender
      replyTo: email,                                 // reply goes to the visitor
      to,
      subject: `Contact form: ${subjectLabel}`,
      text: plain,
      html,
    });

    return { statusCode: 200, headers: json(origin), body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("SMTP error:", err);
    return { statusCode: 500, headers: json(origin), body: JSON.stringify({ error: "Failed to send." }) };
  }
};
