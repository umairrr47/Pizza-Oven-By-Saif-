// src/lib/emailService.ts
import emailjs from "@emailjs/browser";

/* -----------------------------------------
   Read ENV Variables (Vite)
------------------------------------------ */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
  console.warn(
    "⚠️ EmailJS env vars missing. Make sure .env contains:\n" +
      "VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY"
  );
}

/* -----------------------------------------
   Initialize EmailJS Once
------------------------------------------ */
if (PUBLIC_KEY) {
  try {
    emailjs.init(PUBLIC_KEY);
  } catch (err) {
    console.warn("⚠️ emailjs.init failed:", err);
  }
}

/* -----------------------------------------
   Typed Payload (matches your EmailJS template)
------------------------------------------ */
export type EmailPayload = {
  full_name?: string;
  phone_number?: string;
  email_address?: string;
  selected_product?: string;
  city?: string;
  page_link?: string;
  source?: string;
  message?: string;
  full_summary?: string;
  [key: string]: string | undefined; // allows extra fields
};

/* -----------------------------------------
   Return Types
------------------------------------------ */
export type SendEmailResult =
  | { ok: true; res: unknown }
  | { ok: false; error: unknown };

/* -----------------------------------------
   sendEmail (Single function used by all forms)
------------------------------------------ */
export async function sendEmail(payload: EmailPayload): Promise<SendEmailResult> {
  if (!SERVICE_ID || !TEMPLATE_ID) {
    const error = new Error("Missing EmailJS SERVICE_ID or TEMPLATE_ID.");
    console.error("sendEmail error:", error);
    return { ok: false, error };
  }

  // Log payload only in development mode
  if (import.meta.env.DEV) {
    console.debug("[emailService] Payload:", payload);
  }

  try {
    // using public key as fallback parameter also
    const res = await emailjs.send(SERVICE_ID, TEMPLATE_ID, payload, PUBLIC_KEY);
    return { ok: true, res };
  } catch (error) {
    console.error("sendEmail error:", error);
    return { ok: false, error };
  }
}
