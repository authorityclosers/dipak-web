"use client";

import { useState, useEffect, useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactForm, type ContactFormState } from "./actions";
import styles from "./contact.module.css";

const INITIAL_STATE: ContactFormState = { status: "idle", message: "" };

export interface ContactIntent {
  id: string;
  index: string;
  label: string;
  description: string;
  isExternal?: boolean;
  externalUrl?: string;
  field1Label?: string;
  field1Name?: string;
  field1Placeholder?: string;
  field2Label?: string;
  field2Name?: string;
  field2Placeholder?: string;
  messagePrompt: string;
  messagePlaceholder: string;
}

export const INTENTS: ContactIntent[] = [
  {
    id: "speaking",
    index: "01",
    label: "Speaking & Keynotes",
    description: "Conferences, corporate summits, and executive workshops.",
    field1Label: "Organization / Event Name",
    field1Name: "organization",
    field1Placeholder: "e.g. Annual Growth Summit 2026",
    field2Label: "Target Date / Timeline",
    field2Name: "timeline",
    field2Placeholder: "e.g. Q3 2026 / October",
    messagePrompt: "What is the core theme or outcome for the audience?",
    messagePlaceholder: "Share details on audience size, event location, format (in-person/virtual), and desired keynote topics.",
  },
  {
    id: "advisory",
    index: "02",
    label: "Advisory & Deal Architecture",
    description: "Private sales diagnostics, high-ticket pipeline engineering & deal reviews.",
    field1Label: "Company / Venture Name",
    field1Name: "company",
    field1Placeholder: "e.g. Acme Tech Solutions",
    field2Label: "Current Revenue Scale",
    field2Name: "revenue",
    field2Placeholder: "e.g. $1M–$5M ARR / Bootstrapped",
    messagePrompt: "What is the primary constraint currently slowing deal velocity?",
    messagePlaceholder: "Describe your sales team structure, average contract value (ACV), and where buyers currently hesitate or stall.",
  },
  {
    id: "interviews",
    index: "03",
    label: "Interviews & Podcasts",
    description: "Long-form discussions on sales psychology, buyer behavior & decision models.",
    field1Label: "Publication / Show Name",
    field1Name: "organization",
    field1Placeholder: "e.g. The Founders Dialogue Podcast",
    field2Label: "Format / Estimated Air Date",
    field2Name: "timeline",
    field2Placeholder: "e.g. Video Podcast / Next Month",
    messagePrompt: "What specific topic or angle would you like to explore?",
    messagePlaceholder: "Share links to past episodes, target audience demographic, and key themes you'd like to dissect.",
  },
  {
    id: "partnerships",
    index: "04",
    label: "Strategic Partnerships",
    description: "Institutional alliances, co-created frameworks & commercial ventures.",
    field1Label: "Organization / Firm Name",
    field1Name: "organization",
    field1Placeholder: "e.g. Global Venture Studio",
    field2Label: "Direct Phone (Optional)",
    field2Name: "phone",
    field2Placeholder: "+1 (555) 000-0000",
    messagePrompt: "How can we create asymmetric value together?",
    messagePlaceholder: "Outline your partnership proposal, mutual alignment, and immediate next milestones.",
  },
  {
    id: "general",
    index: "05",
    label: "General Enquiry",
    description: "Questions, field note feedback, or general correspondence.",
    field1Label: "Company / Organization (Optional)",
    field1Name: "company",
    field1Placeholder: "Your organization",
    field2Label: "Direct Phone (Optional)",
    field2Name: "phone",
    field2Placeholder: "+1 (555) 000-0000",
    messagePrompt: "Give me enough context to understand the decision.",
    messagePlaceholder: "Write your note with enough background for a meaningful response.",
  },
  {
    id: "authority-closers",
    index: "06",
    label: "Authority Closers™ Ecosystem",
    description: "Sales training programs, roleplay simulation labs & deal certifications.",
    isExternal: true,
    externalUrl: "https://authorityclosers.com",
    messagePrompt: "",
    messagePlaceholder: "",
  },
];

export function ContactForm() {
  const searchParams = useSearchParams();
  const requestedTopic = searchParams.get("topic")?.toLowerCase() || "";

  // Find initial intent from query parameter or default to speaking
  const initialIntentId =
    INTENTS.find(
      (i) =>
        !i.isExternal &&
        (i.id === requestedTopic || i.label.toLowerCase().includes(requestedTopic))
    )?.id || "speaking";

  const [isModalOpen, setIsModalOpen] = useState<boolean>(Boolean(requestedTopic));
  const [selectedIntentId, setSelectedIntentId] = useState<string>(initialIntentId);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formDataState, setFormDataState] = useState({
    name: "",
    email: "",
    organization: "",
    timeline: "",
    revenue: "",
    phone: "",
    message: "",
  });
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({});

  const activeIntent = INTENTS.find((i) => i.id === selectedIntentId) || INTENTS[0];
  const [state, formAction, pending] = useActionState(submitContactForm, INITIAL_STATE);

  // Keyboard escape listener & body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  const handleInputChange = (field: string, value: string) => {
    setFormDataState((prev) => ({ ...prev, [field]: value }));
    if (clientErrors[field]) {
      setClientErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSelectAndOpen = (intentId: string) => {
    setSelectedIntentId(intentId);
    setCurrentStep(1);
    setIsModalOpen(true);
  };

  const handleNextFromStep1 = () => {
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    const errors: Record<string, string> = {};
    if (!formDataState.name.trim()) errors.name = "Please enter your name.";
    if (!formDataState.email.trim()) errors.email = "Please enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formDataState.email.trim())) {
      errors.email = "Please enter a valid work email.";
    }

    if (Object.keys(errors).length > 0) {
      setClientErrors(errors);
      return;
    }

    setCurrentStep(3);
  };

  return (
    <div className={styles.contactExperienceWrapper}>
      {/* --- On-Page Conversation Intent Launcher ------------------------ */}
      <div className={styles.onPageLauncher}>
        <div className={styles.launcherHeader}>
          <span className={styles.launcherKicker}>CONVERSATION CHANNELS</span>
          <h3 className={styles.launcherTitle}>Choose a path to begin.</h3>
          <p className={styles.launcherSubtitle}>
            Click any priority below to launch the focused 3-step decision flow.
          </p>
        </div>

        <div className={styles.launcherGrid}>
          {INTENTS.map((intent) => {
            if (intent.isExternal) {
              return (
                <a
                  key={intent.id}
                  href={intent.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.launcherCard} ${styles.launcherCardExternal}`}
                >
                  <div className={styles.launcherCardTop}>
                    <span className={styles.launcherIndex}>{intent.index}</span>
                    <span className={styles.launcherExternalArrow}>↗</span>
                  </div>
                  <h4 className={styles.launcherLabel}>{intent.label}</h4>
                  <p className={styles.launcherDesc}>{intent.description}</p>
                  <span className={styles.launcherActionLink}>
                    <span>Visit Authority Closers</span>
                    <span aria-hidden="true">→</span>
                  </span>
                </a>
              );
            }

            return (
              <button
                key={intent.id}
                type="button"
                className={styles.launcherCard}
                onClick={() => handleSelectAndOpen(intent.id)}
              >
                <div className={styles.launcherCardTop}>
                  <span className={styles.launcherIndex}>{intent.index}</span>
                  <span className={styles.launcherDotIndicator} aria-hidden="true" />
                </div>
                <h4 className={styles.launcherLabel}>{intent.label}</h4>
                <p className={styles.launcherDesc}>{intent.description}</p>
                <span className={styles.launcherActionLink}>
                  <span>Start conversation</span>
                  <span aria-hidden="true">→</span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Floating Full-Focus Modal Wizard Overlay ------------------- */}
      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="Conversation Wizard"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div className={styles.floatingModalContainer}>
            {/* Modal Top Header */}
            <div className={styles.modalHeader}>
              <div className={styles.modalHeaderMeta}>
                <span className={styles.modalKicker}>DECISION TO CONVERSATION</span>
                <div className={styles.stepperPills}>
                  <span className={`${styles.stepPill} ${currentStep === 1 ? styles.stepPillActive : ""} ${currentStep > 1 ? styles.stepPillComplete : ""}`}>
                    01 INTENT
                  </span>
                  <span className={styles.stepPillDivider}>/</span>
                  <span className={`${styles.stepPill} ${currentStep === 2 ? styles.stepPillActive : ""} ${currentStep > 2 ? styles.stepPillComplete : ""}`}>
                    02 DETAILS
                  </span>
                  <span className={styles.stepPillDivider}>/</span>
                  <span className={`${styles.stepPill} ${currentStep === 3 ? styles.stepPillActive : ""}`}>
                    03 CONTEXT
                  </span>
                </div>
              </div>

              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close conversation wizard"
              >
                <span>Close</span>
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className={styles.modalBody}>
              {state.status === "success" ? (
                <div className={styles.successPanel} role="status">
                  <div className={styles.successBadge}>
                    <span className={styles.successDot} aria-hidden="true" />
                    <span>TRANSMISSION CONFIRMED</span>
                  </div>
                  <h3 className={styles.successTitle}>Clarity helps. Thank you for the context.</h3>
                  <p className={styles.successBody}>
                    Every message is reviewed personally. Dipak or his executive team will examine your note and get back to you shortly.
                  </p>
                  <button
                    type="button"
                    className={styles.successResetBtn}
                    onClick={() => {
                      setIsModalOpen(false);
                      window.location.reload();
                    }}
                  >
                    Done & Return to Page →
                  </button>
                </div>
              ) : (
                <form className={styles.wizardForm} action={formAction} noValidate>
                  {/* Hidden Form Fields */}
                  <input type="hidden" name="intent" value={activeIntent.label} />
                  <input type="hidden" name="name" value={formDataState.name} />
                  <input type="hidden" name="email" value={formDataState.email} />
                  <input type="hidden" name="company" value={formDataState.organization} />
                  <input type="hidden" name="organization" value={formDataState.organization} />
                  <input type="hidden" name="timeline" value={formDataState.timeline} />
                  <input type="hidden" name="revenue" value={formDataState.revenue} />
                  <input type="hidden" name="phone" value={formDataState.phone} />

                  {/* Honeypot */}
                  <div className={styles.honeypot} aria-hidden="true">
                    <label htmlFor="website-modal">Website</label>
                    <input id="website-modal" name="website" type="text" tabIndex={-1} autoComplete="off" />
                  </div>

                  {/* STEP 1: Choose Conversation Intent */}
                  {currentStep === 1 && (
                    <div className={styles.stepContent} key="modal-step-1">
                      <div className={styles.stepHeader}>
                        <span className={styles.stepKicker}>STAGE 01 — INTENT</span>
                        <h3 className={styles.stepHeading}>What would you like to discuss?</h3>
                        <p className={styles.stepSubhead}>
                          Select your primary priority. We will adapt the questions specifically for this conversation.
                        </p>
                      </div>

                      <div className={styles.intentSelectorList}>
                        {INTENTS.filter((i) => !i.isExternal).map((intent) => {
                          const isSelected = selectedIntentId === intent.id;

                          return (
                            <div
                              key={intent.id}
                              role="button"
                              tabIndex={0}
                              className={`${styles.intentCard} ${isSelected ? styles.intentCardSelected : ""}`}
                              onClick={() => setSelectedIntentId(intent.id)}
                              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && setSelectedIntentId(intent.id)}
                              aria-pressed={isSelected}
                            >
                              <span className={styles.intentCardIndex}>{intent.index}</span>
                              <div className={styles.intentCardMeta}>
                                <span className={styles.intentCardLabel}>{intent.label}</span>
                                <span className={styles.intentCardDesc}>{intent.description}</span>
                              </div>
                              <div className={styles.intentIndicatorBox}>
                                <span className={styles.intentIndicatorDot} />
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <div className={styles.wizardControls}>
                        <button
                          type="button"
                          className={styles.wizardPrimaryBtn}
                          onClick={handleNextFromStep1}
                        >
                          <span>Continue to Details</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: Identity & Organization Context */}
                  {currentStep === 2 && (
                    <div className={styles.stepContent} key="modal-step-2">
                      <div className={styles.stepHeader}>
                        <div className={styles.stepBadgeRow}>
                          <span className={styles.stepKicker}>STAGE 02 — DETAILS</span>
                          <span className={styles.activePill}>{activeIntent.label.toUpperCase()}</span>
                        </div>
                        <h3 className={styles.stepHeading}>Who are you & what are you building?</h3>
                        <p className={styles.stepSubhead}>
                          Share your direct coordinates so Dipak can examine your situation with high precision.
                        </p>
                      </div>

                      <div className={styles.stepFieldsGrid}>
                        <div className={styles.fieldRow}>
                          <div className={styles.field}>
                            <label className={styles.label} htmlFor="modal-name">
                              Your Full Name <span className={styles.required}>*</span>
                            </label>
                            <input
                              id="modal-name"
                              className={`${styles.input} ${clientErrors.name || state.fieldErrors?.name ? styles.inputError : ""}`}
                              type="text"
                              required
                              placeholder="e.g. Alexander Vance"
                              value={formDataState.name}
                              onChange={(e) => handleInputChange("name", e.target.value)}
                              autoComplete="name"
                              autoFocus
                            />
                            {(clientErrors.name || state.fieldErrors?.name) && (
                              <span className={styles.errorText}>
                                {clientErrors.name || state.fieldErrors?.name}
                              </span>
                            )}
                          </div>

                          <div className={styles.field}>
                            <label className={styles.label} htmlFor="modal-email">
                              Direct Work Email <span className={styles.required}>*</span>
                            </label>
                            <input
                              id="modal-email"
                              className={`${styles.input} ${clientErrors.email || state.fieldErrors?.email ? styles.inputError : ""}`}
                              type="email"
                              required
                              placeholder="alexander@company.com"
                              value={formDataState.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              autoComplete="email"
                            />
                            {(clientErrors.email || state.fieldErrors?.email) && (
                              <span className={styles.errorText}>
                                {clientErrors.email || state.fieldErrors?.email}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Dynamic Contextual Inputs */}
                        <div className={styles.fieldRow}>
                          {activeIntent.field1Label && (
                            <div className={styles.field}>
                              <label className={styles.label} htmlFor="modal-org">
                                {activeIntent.field1Label}
                              </label>
                              <input
                                id="modal-org"
                                className={styles.input}
                                type="text"
                                placeholder={activeIntent.field1Placeholder}
                                value={formDataState.organization}
                                onChange={(e) => handleInputChange("organization", e.target.value)}
                              />
                            </div>
                          )}

                          {activeIntent.field2Label && (
                            <div className={styles.field}>
                              <label className={styles.label} htmlFor="modal-context2">
                                {activeIntent.field2Label}
                              </label>
                              <input
                                id="modal-context2"
                                className={styles.input}
                                type="text"
                                placeholder={activeIntent.field2Placeholder}
                                value={formDataState.timeline || formDataState.revenue || formDataState.phone}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  if (activeIntent.field2Name === "timeline") handleInputChange("timeline", val);
                                  else if (activeIntent.field2Name === "revenue") handleInputChange("revenue", val);
                                  else handleInputChange("phone", val);
                                }}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      <div className={styles.wizardControlsSplit}>
                        <button
                          type="button"
                          className={styles.wizardBackBtn}
                          onClick={() => setCurrentStep(1)}
                        >
                          ← Back
                        </button>
                        <button
                          type="button"
                          className={styles.wizardPrimaryBtn}
                          onClick={handleNextFromStep2}
                        >
                          <span>Continue to Context Note</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: Context Note & Submission */}
                  {currentStep === 3 && (
                    <div className={styles.stepContent} key="modal-step-3">
                      <div className={styles.stepHeader}>
                        <div className={styles.stepBadgeRow}>
                          <span className={styles.stepKicker}>STAGE 03 — CONTEXT</span>
                          <span className={styles.activePill}>{activeIntent.label.toUpperCase()}</span>
                        </div>
                        <h3 className={styles.stepHeading}>{activeIntent.messagePrompt}</h3>
                        <p className={styles.stepSubhead}>
                          Give me enough context to understand the decision. Detailed notes get prioritized replies.
                        </p>
                      </div>

                      <div className={styles.field}>
                        <textarea
                          className={`${styles.textarea} ${state.fieldErrors?.message ? styles.inputError : ""}`}
                          id="modal-message"
                          name="message"
                          rows={5}
                          required
                          placeholder={activeIntent.messagePlaceholder}
                          value={formDataState.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          autoFocus
                        />
                        {state.fieldErrors?.message && (
                          <span className={styles.errorText}>{state.fieldErrors.message}</span>
                        )}
                      </div>

                      <div className={styles.assuranceBox}>
                        <span className={styles.assuranceTag}>RESPONSE PROMISE</span>
                        <p className={styles.assuranceBody}>
                          Every inquiry is reviewed personally. You will receive an authentic, strategic response.
                        </p>
                      </div>

                      {state.status === "error" && !state.fieldErrors && (
                        <p className={styles.formError} role="alert">
                          {state.message}
                        </p>
                      )}

                      <div className={styles.wizardControlsSplit}>
                        <button
                          type="button"
                          className={styles.wizardBackBtn}
                          onClick={() => setCurrentStep(2)}
                          disabled={pending}
                        >
                          ← Back
                        </button>
                        <button
                          type="submit"
                          className={styles.wizardPrimaryBtn}
                          disabled={pending}
                        >
                          <span>{pending ? "Transmitting Context…" : "Send My Message"}</span>
                          <span aria-hidden="true">→</span>
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
