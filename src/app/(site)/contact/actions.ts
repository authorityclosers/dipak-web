"use server";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
  /** Field-level errors, keyed by input name. */
  fieldErrors?: Record<string, string>;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Handles a contact submission.
 *
 * Delivery is intentionally indirect: the message is POSTed to whatever
 * endpoint `CONTACT_WEBHOOK_URL` names (a form service, an automation hook, a
 * mail relay). This keeps the promise in AGENTS.md — no backend, no database,
 * no mail vendor baked into this repository — while still giving a form that
 * genuinely delivers as soon as the env var is set.
 *
 * If the variable is absent the form fails loudly and honestly rather than
 * pretending to have sent, and points the visitor at Authority Closers.
 */
export async function submitContactForm(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot: real users never fill a hidden field. Silently accept so bots
  // do not learn they were caught, but do not forward.
  if (formData.get("website")) {
    return { status: "success", message: "Thank you — your message has been sent." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const topic = String(formData.get("topic") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  if (!email) fieldErrors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(email))
    fieldErrors.email = "That email address does not look right.";
  if (!message) fieldErrors.message = "Please tell me what you would like to discuss.";
  else if (message.length < 10)
    fieldErrors.message = "A little more detail will help me reply usefully.";

  if (Object.keys(fieldErrors).length > 0) {
    return {
      status: "error",
      message: "Please correct the highlighted fields.",
      fieldErrors,
    };
  }

  const endpoint = process.env.CONTACT_WEBHOOK_URL;

  if (!endpoint) {
    return {
      status: "error",
      message:
        "The contact form is not connected yet. For sales training or programs, please use the Authority Closers link below.",
    };
  }

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone: phone || null,
        company: company || null,
        topic: topic || null,
        message,
        source: "dipakvishwakarma.com/contact",
        submittedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(`Delivery endpoint returned ${response.status}`);
    }

    return {
      status: "success",
      message: "Thank you — your message has been sent. I will reply personally.",
    };
  } catch (error) {
    // Log server-side for diagnosis; never leak endpoint details to the client.
    console.error("[contact] delivery failed:", error);
    return {
      status: "error",
      message:
        "Something went wrong sending your message. Please try again in a moment.",
    };
  }
}
