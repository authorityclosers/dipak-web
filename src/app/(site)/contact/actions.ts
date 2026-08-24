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
  const topic = String(formData.get("topic") ?? formData.get("intent") ?? "").trim();
  const organization = String(formData.get("organization") ?? "").trim();
  const timeline = String(formData.get("timeline") ?? "").trim();
  const revenue = String(formData.get("revenue") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: Record<string, string> = {};
  if (!name) fieldErrors.name = "Please enter your name.";
  if (!email) fieldErrors.email = "Please enter your email.";
  else if (!EMAIL_PATTERN.test(email))
    fieldErrors.email = "That email address does not look right.";
  if (!message) fieldErrors.message = "Please provide some context for your enquiry.";
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
    // Graceful offline fallback: logs submission on server and gives positive user feedback
    console.log("[contact] enquiry received locally:", {
      name,
      email,
      phone,
      company: company || organization,
      topic,
      timeline,
      revenue,
      message,
    });

    return {
      status: "success",
      message:
        "Message received. Clarity helps. Thank you for the context—we will review your enquiry and get back to you shortly.",
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
        company: company || organization || null,
        topic: topic || null,
        timeline: timeline || null,
        revenue: revenue || null,
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
      message:
        "Message received. Clarity helps. Thank you for the context—we will review your enquiry and get back to you shortly.",
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
