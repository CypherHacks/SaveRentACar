// netlify/functions/contact.ts
import type { Handler } from "@netlify/functions";
import nodemailer from "nodemailer";

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}
function escapeHtml(s = "") {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const corsHeaders = (origin: string) => ({
  "Access-Control-Allow-Origin": origin,
  "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
});
const jsonHeaders = (origin: string) => ({
  "Content-Type": "application/json",
  ...corsHeaders(origin),
});

export const handler: Handler = async (event) => {
  const origin = process.env.CORS_ORIGIN || "*";

  // CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers: corsHeaders(origin), body: "" };
  }

  // Health check (useful for 404/500 debugging in the browser)
  if (event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers: jsonHeaders(origin),
      body: JSON.stringify({
        ok: true,
        using: "netlify function",
        hasEnv: Boolean(
          process.env.GMAIL_USER &&
          process.env.GMAIL_APP_PASSWORD &&
          (process.env.TO_EMAIL || process.env.GMAIL_USER)
        ),
      }),
    };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: jsonHeaders(origin),
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  let data: Record<string, string> = {};
  try { data = JSON.parse(event.body || "{}"); } catch {}

  const { name = "", email = "", phone = "", subject = "", message = "", hp = "" } = data;

  // Honeypot
  if (hp) {
    return { statusCode: 200, headers: jsonHeaders(origin), body: JSON.stringify({ ok: true }) };
  }

  // Validate
  if (!name.trim() || !isEmail(email) || !subject.trim() || !message.trim()) {
    return { statusCode: 400, headers: jsonHeaders(origin), body: JSON.stringify({ error: "Invalid input." }) };
  }

  // Subject mapping
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
    const user = process.env.GMAIL_USER;
    const pass = process.env.GMAIL_APP_PASSWORD;
    const to = process.env.TO_EMAIL || user;
    if (!user || !pass || !to) {
      return { statusCode: 500, headers: jsonHeaders(origin), body: JSON.stringify({ error: "Email not configured." }) };
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user, pass },
    });

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
      from: `"${name}" <${user}>`,
      replyTo: email,
      to,
      subject: `Contact form: ${subjectLabel}`,
      text: plain,
      html,
    });

    return { statusCode: 200, headers: jsonHeaders(origin), body: JSON.stringify({ ok: true }) };
  } catch (err) {
    console.error("SMTP error:", err);
    return { statusCode: 500, headers: jsonHeaders(origin), body: JSON.stringify({ error: "Failed to send." }) };
  }
};
