"use client";

import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactForm, type ContactFormState } from "./actions";
import styles from "./contact.module.css";

const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };

const TOPICS = [
  "Speaking or keynote",
  "Collaboration",
  "Interview or podcast",
  "Partnership",
  "Certainty Checklist",
  "Buyer Psychology Question Bank",
  "Objection Diagnosis Sheet",
  "High-Ticket Conversation Review",
  "Something else",
];

export function ContactForm() {
  const [state, formAction, pending] = useActionState(
    submitContactForm,
    INITIAL_STATE,
  );

  // Resources page deep-links here with ?topic=… pre-selected.
  const searchParams = useSearchParams();
  const requestedTopic = searchParams.get("topic");
  const defaultTopic =
    requestedTopic && TOPICS.includes(requestedTopic) ? requestedTopic : "";

  if (state.status === "success") {
    return (
      <div className={styles.successPanel} role="status">
        <span className={styles.successMark} aria-hidden="true">
          ✦
        </span>
        <p className={styles.successText}>{state.message}</p>
      </div>
    );
  }

  return (
    <form className={styles.form} action={formAction} noValidate>
      {/* Honeypot — visually hidden, never focusable by keyboard. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className={styles.fieldRow}>
        <Field
          label="Name"
          name="name"
          required
          autoComplete="name"
          error={state.fieldErrors?.name}
        />
        <Field
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          error={state.fieldErrors?.email}
        />
      </div>

      <div className={styles.fieldRow}>
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
        <Field
          label="Company / Organisation (optional)"
          name="company"
          autoComplete="organization"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="topic">
          What would you like to discuss?
        </label>
        <select
          className={styles.select}
          id="topic"
          name="topic"
          defaultValue={defaultTopic}
        >
          <option value="">Select a subject</option>
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="message">
          Message <span className={styles.required}>*</span>
        </label>
        <textarea
          className={`${styles.textarea} ${
            state.fieldErrors?.message ? styles.inputError : ""
          }`}
          id="message"
          name="message"
          rows={6}
          required
          aria-invalid={Boolean(state.fieldErrors?.message)}
          aria-describedby={state.fieldErrors?.message ? "message-error" : undefined}
        />
        {state.fieldErrors?.message ? (
          <span className={styles.errorText} id="message-error">
            {state.fieldErrors.message}
          </span>
        ) : null}
      </div>

      {state.status === "error" && !state.fieldErrors ? (
        <p className={styles.formError} role="alert">
          {state.message}
        </p>
      ) : null}

      <button className={styles.submit} type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send Message"}
        <span aria-hidden="true">→</span>
      </button>
    </form>
  );
}

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}

function Field({ label, name, type = "text", required, autoComplete, error }: FieldProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={name}>
        {label} {required ? <span className={styles.required}>*</span> : null}
      </label>
      <input
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error ? (
        <span className={styles.errorText} id={`${name}-error`}>
          {error}
        </span>
      ) : null}
    </div>
  );
}
