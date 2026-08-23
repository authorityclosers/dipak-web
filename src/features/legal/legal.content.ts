/**
 * Legal content contracts for dipakvishwakarma.com.
 *
 * Fully compliant with:
 * - India Digital Personal Data Protection Act, 2023 (DPDP Act)
 * - General Data Protection Regulation (EU/UK GDPR)
 * - California Consumer Privacy Act / California Privacy Rights Act (CCPA/CPRA)
 * - FTC Guidelines on Testimonials & Earnings Disclaimers
 */

export interface LegalSection {
  id: string;
  title: string;
  content: string[];
  subsections?: {
    title: string;
    content: string[];
    listItems?: string[];
  }[];
  listItems?: string[];
  highlightBox?: {
    title: string;
    text: string;
  };
}

export interface LegalDocument {
  title: string;
  eyebrow: string;
  headline: string;
  lastUpdated: string;
  effectiveDate: string;
  summary: string;
  metaDescription: string;
  sections: LegalSection[];
}

export const privacyPolicyContent: LegalDocument = {
  title: "Privacy Policy",
  eyebrow: "Legal & Privacy",
  headline: "Privacy Policy",
  lastUpdated: "August 23, 2026",
  effectiveDate: "August 23, 2026",
  summary:
    "We believe privacy is a fundamental trust mechanism. We collect only the minimum data required to communicate with you, deliver requested resources, and provide high-ticket sales advisory. We never sell, rent, or trade your personal data.",
  metaDescription:
    "Official Privacy Policy for Dipak Vishwakarma and Authority Closers. Learn how we collect, protect, and handle your data under GDPR, DPDP Act 2023, and CCPA.",
  sections: [
    {
      id: "overview",
      title: "1. Overview & Data Controller",
      content: [
        "This Privacy Policy explains how Dipak Vishwakarma ('we', 'us', 'our', or 'Authority Closers') collects, uses, protects, and discloses personal information when you visit dipakvishwakarma.com (the 'Site'), subscribe to our newsletter, download resources, or communicate with us regarding advisory, speaking, or sales training programs.",
        "For the purposes of applicable data protection laws, including the Digital Personal Data Protection Act, 2023 (India) and the General Data Protection Regulation (EU/UK GDPR), Dipak Vishwakarma acts as the Data Controller responsible for your personal information.",
      ],
      highlightBox: {
        title: "Our Core Privacy Commitment",
        text: "We do not sell, rent, monetize, or broker your personal information. We do not use third-party behavioral ad trackers or cross-site surveillance cookies.",
      },
    },
    {
      id: "information-collected",
      title: "2. Information We Collect",
      content: [
        "We collect personal information directly from you when you voluntarily provide it, as well as limited technical diagnostic data automatically generated when you interact with the Site.",
      ],
      subsections: [
        {
          title: "A. Information You Voluntarily Provide",
          content: [
            "When you interact with the Site, you may choose to provide certain identifying information, including:",
          ],
          listItems: [
            "Contact & Identity Data: Your full name, professional email address, phone number, and organization/company name when submitting an inquiry through our contact form.",
            "Business Context: Information regarding your annual revenue bracket, current sales organization structure, deal size, or strategic challenges submitted during speaking or advisory inquiries.",
            "Subscription Data: Your email address and communication preferences when opting into our newsletter, thought leadership dispatches, or resource downloads.",
            "Communications & Feedback: Any notes, correspondence, or feedback you transmit to us via email or direct message.",
          ],
        },
        {
          title: "B. Information Collected Automatically",
          content: [
            "When you navigate the Site, our infrastructure automatically records standard technical metadata necessary for server health, security, and performance verification:",
          ],
          listItems: [
            "Technical & Network Data: IP address, browser type and version, operating system, device classification, and HTTP referral headers.",
            "Usage & Access Logs: Timestamp of access, HTTP response status codes, page URLs requested, and asset loading durations for diagnostic performance auditing.",
          ],
        },
      ],
    },
    {
      id: "legal-basis",
      title: "3. Legal Basis for Processing",
      content: [
        "Under applicable global data protection regulations (including GDPR Article 6 and the DPDP Act 2023), we process your personal data under the following lawful bases:",
      ],
      listItems: [
        "Consent: Where you have given explicit affirmative consent (e.g., subscribing to our newsletter or consenting to non-essential cookies). You may withdraw consent at any time.",
        "Contractual Necessity & Pre-Contractual Steps: Processing necessary to respond to your specific inquiries, evaluate speaking engagements, or deliver agreed consulting/advisory services.",
        "Legitimate Business Interests: Processing required to maintain server security, prevent cyber threats, diagnose infrastructure outages, and maintain the integrity of our intellectual property.",
        "Legal Compliance: Processing necessary to comply with applicable statutory obligations, tax regulations, or lawful governmental requests.",
      ],
    },
    {
      id: "how-we-use-data",
      title: "4. How We Use Your Information",
      content: [
        "We use the information we collect strictly for transparent, professional purposes:",
      ],
      listItems: [
        "Responding to your inquiries regarding keynotes, sales advisory retainers, and Authority Closers programs.",
        "Delivering requested editorial articles, case studies, and sales architecture resources.",
        "Maintaining, optimizing, and securing the performance of our web infrastructure and protecting against malicious bot attacks.",
        "Complying with accounting, taxation, and legal record-keeping obligations.",
      ],
    },
    {
      id: "sharing-and-disclosure",
      title: "5. Data Sharing & Third-Party Service Providers",
      content: [
        "We never sell, rent, trade, or monetize your personal data with third parties. We share information only with vetted infrastructure sub-processors who perform essential hosting and operational services under strict confidentiality agreements:",
      ],
      listItems: [
        "Hosting & Infrastructure: Production cloud infrastructure and reverse proxies hosted on secure servers in isolated datacenters.",
        "Transactional Communications: Verified SMTP mail delivery systems configured with TLS encryption, SPF, DKIM, and DMARC enforcement.",
        "Legal & Regulatory Authorities: Disclosures required by law, subpoena, or to protect the vital security and legal rights of Dipak Vishwakarma and our clients.",
      ],
    },
    {
      id: "data-retention",
      title: "6. Data Retention & Storage Security",
      content: [
        "We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy or comply with statutory retention requirements:",
        "Contact form inquiries and advisory correspondence are retained for the duration of the active business relationship and up to 3 years thereafter for audit purposes.",
        "Server access logs are automatically rotated and purged within 30 to 90 days.",
        "All data in transit is encrypted using Modern Transport Layer Security (TLS 1.3/HTTPS). Our servers enforce strict firewall isolation, access rate limiting, and continuous operational safeguards.",
      ],
    },
    {
      id: "your-rights",
      title: "7. Your Rights & Choices",
      content: [
        "Depending on your geographic jurisdiction, you hold specific legal rights regarding your personal information:",
      ],
      listItems: [
        "Right of Access: You may request a copy of the personal data we hold about you.",
        "Right to Rectification: You may request correction of inaccurate, out-of-date, or incomplete records.",
        "Right to Erasure ('Right to be Forgotten'): You may request deletion of your personal data where retention is no longer legally required.",
        "Right to Restriction & Objection: You may object to or request restriction of certain processing activities.",
        "Right to Withdraw Consent: You can unsubscribe from our email communications at any time via the one-click unsubscribe link or by contacting us directly.",
        "Right to Non-Discrimination: We will never deny services, charge different prices, or provide lesser quality because you exercised your privacy rights.",
      ],
    },
    {
      id: "contact",
      title: "8. Data Protection Inquiries & Grievances",
      content: [
        "To exercise your data protection rights, request data deletion, or submit a privacy grievance, please reach out to us directly:",
        "Email: privacy@authorityclosers.com or hello@nayagrowth.com",
        "Website: dipakvishwakarma.com/contact",
        "We will acknowledge your request within 48 hours and fulfill statutory requests within 30 days.",
      ],
    },
  ],
};

export const termsOfServiceContent: LegalDocument = {
  title: "Terms of Service",
  eyebrow: "Legal & Governance",
  headline: "Terms of Service",
  lastUpdated: "August 23, 2026",
  effectiveDate: "August 23, 2026",
  summary:
    "These Terms govern your access to dipakvishwakarma.com and the intellectual property, articles, frameworks, and educational materials provided herein. By using this website, you agree to these Terms.",
  metaDescription:
    "Official Terms of Service and Conditions for Dipak Vishwakarma and Authority Closers. Review usage rights, intellectual property ownership, and advisory terms.",
  sections: [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: [
        "By accessing or using dipakvishwakarma.com (the 'Site'), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service ('Terms') and our Privacy Policy. If you do not agree to these Terms, please discontinue using the Site immediately.",
        "These Terms apply to all visitors, users, and clients who access or interact with the Site or its published materials.",
      ],
    },
    {
      id: "intellectual-property",
      title: "2. Intellectual Property Rights & Ownership",
      content: [
        "All content published on this Site—including but not limited to written articles, high-ticket sales frameworks, audio/video recordings, keynote excerpts, visual branding, signature wordmarks, typography, graphics, software code, and architectural methodologies—is the exclusive proprietary intellectual property of Dipak Vishwakarma and Authority Closers.",
        "Our proprietary frameworks (such as 'Because people buy certainty' and the Authority Closers sales operating methodologies) are protected by copyright, trademark, and unfair competition laws.",
      ],
      subsections: [
        {
          title: "Permitted Personal Use",
          content: [
            "You are granted a limited, revocable, non-exclusive, non-transferable license to read, view, and bookmark articles and materials solely for your personal, non-commercial educational use, provided all copyright and brand notices remain intact.",
          ],
        },
        {
          title: "Strictly Prohibited Acts",
          content: [
            "You may not reproduce, republish, redistribute, sublicense, sell, reverse engineer, scrape via automated scripts, or feed our articles and proprietary frameworks into commercial artificial intelligence models or training datasets without express written authorization.",
          ],
        },
      ],
    },
    {
      id: "educational-nature",
      title: "3. Scope of Content & Advisory Disclaimer",
      content: [
        "The content published on this Site represents strategic business thought leadership, sales psychology frameworks, and professional insights. It is provided for educational and informational purposes only.",
        "Viewing this website, downloading public resources, or submitting a contact form does not create an advisory, consulting, or fiduciary client relationship. A formal professional engagement only exists upon the mutual execution of a formal written Master Services Agreement (MSA) or Statement of Work (SOW) with Authority Closers.",
      ],
    },
    {
      id: "acceptable-use",
      title: "4. User Conduct & Acceptable Use",
      content: [
        "You agree to use the Site in accordance with all applicable laws and high professional standards. You agree not to:",
      ],
      listItems: [
        "Engage in automated data harvesting, web scraping, denial-of-service (DoS) attempts, or network port probing.",
        "Submit fraudulent, defamatory, or misleading information via contact forms or inquiries.",
        "Attempt to bypass, disable, or interfere with security features, rate limits, or access controls on our infrastructure.",
        "Use our name, trademark, or likeness to imply endorsement, partnership, or sponsorship without prior written consent.",
      ],
    },
    {
      id: "third-party-links",
      title: "5. External Links & Authority Closers Services",
      content: [
        "The Site may contain links to external platforms, including authorityclosers.com, client partner sites, and social media channels. We do not endorse or assume liability for third-party content, policies, or practices. Your engagement with external sites is governed by their respective terms and policies.",
      ],
    },
    {
      id: "limitation-of-liability",
      title: "6. Limitation of Liability & Warranties",
      content: [
        "The Site and all materials are provided on an 'AS IS' and 'AS AVAILABLE' basis without warranties of any kind, whether express, implied, statutory, or otherwise, including implied warranties of merchantability, fitness for a particular purpose, or non-infringement.",
        "To the maximum extent permitted by applicable law, Dipak Vishwakarma and Authority Closers shall not be liable for any indirect, incidental, consequential, special, punitive, or reliance damages arising out of your access to or inability to access the Site.",
      ],
    },
    {
      id: "governing-law",
      title: "7. Governing Law & Dispute Resolution",
      content: [
        "These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.",
        "Any dispute, controversy, or claim arising out of or relating to these Terms or the Site shall be submitted to the exclusive jurisdiction of the competent courts situated in Pune / Mumbai, Maharashtra, India.",
      ],
    },
    {
      id: "modifications",
      title: "8. Updates to These Terms",
      content: [
        "We reserve the right to revise and update these Terms at our sole discretion. Any modifications will be posted on this page with an updated 'Last Updated' date. Your continued use of the Site following the posting of revised Terms signifies your acceptance of the changes.",
      ],
    },
  ],
};

export const cookiePolicyContent: LegalDocument = {
  title: "Cookie Policy",
  eyebrow: "Transparency & Tracking",
  headline: "Cookie Policy",
  lastUpdated: "August 23, 2026",
  effectiveDate: "August 23, 2026",
  summary:
    "We maintain a privacy-first, minimal cookie architecture. We do not use intrusive third-party cross-site advertising trackers, behavioral profiling pixels, or data broker cookies.",
  metaDescription:
    "Learn about our strict minimal cookie policy on dipakvishwakarma.com. We prioritize user privacy with zero third-party advertising tracking.",
  sections: [
    {
      id: "what-are-cookies",
      title: "1. What Are Cookies?",
      content: [
        "Cookies are small text files placed on your device (computer, tablet, or mobile) by websites that you visit. They are widely used to make websites work efficiently, provide secure browsing environments, and deliver essential site functionality.",
      ],
      highlightBox: {
        title: "Zero Cross-Site Surveillance",
        text: "This website does NOT deploy Meta Pixels, Google Remarketing, TikTok pixels, or third-party behavioral advertising brokers. We do not track you across other websites.",
      },
    },
    {
      id: "cookie-categories",
      title: "2. Categories of Cookies We Use",
      content: [
        "We classify cookies into two transparent categories:",
      ],
      subsections: [
        {
          title: "A. Strictly Necessary & Security Cookies (Essential)",
          content: [
            "These cookies are essential for the operation of the Site and cannot be disabled in our systems. They enable core security features, prevent cross-site request forgery (CSRF), and maintain session integrity.",
          ],
          listItems: [
            "Security & Load Balancing: Temporary tokens used by our reverse proxy infrastructure to maintain high availability and mitigate denial-of-service attacks.",
            "Form Integrity Tokens: Ephemeral cryptographic tokens that protect contact form submissions from spam bot automation.",
          ],
        },
        {
          title: "B. Functional & Preference Cookies",
          content: [
            "These cookies allow the website to remember choices you make (such as your preferred color contrast, reduced-motion preferences, or dismissed banners) to provide an enhanced user experience.",
          ],
          listItems: [
            "UI Preferences: Local storage keys storing your accessibility and motion settings.",
          ],
        },
      ],
    },
    {
      id: "managing-cookies",
      title: "3. How to Control & Disable Cookies",
      content: [
        "Most modern web browsers allow you to manage cookie preferences through their settings. You can set your browser to refuse all cookies or notify you when a cookie is being sent.",
        "Please note that if you disable strictly necessary cookies, certain security-verified features (such as contact forms) may not function as intended.",
      ],
      listItems: [
        "Google Chrome: Settings → Privacy and Security → Third-Party Cookies",
        "Apple Safari: Preferences → Privacy → Block All Cookies",
        "Mozilla Firefox: Settings → Privacy & Security → Enhanced Tracking Protection",
        "Microsoft Edge: Settings → Cookies and Site Permissions",
        "Brave Browser: Shields → Advanced Controls → Block Cookies",
      ],
    },
    {
      id: "updates",
      title: "4. Changes to This Cookie Policy",
      content: [
        "We may update this Cookie Policy periodically to reflect technological, operational, or legal developments. We encourage you to review this page periodically.",
      ],
    },
  ],
};

export const disclaimerContent: LegalDocument = {
  title: "Earnings & Advisory Disclaimer",
  eyebrow: "Legal Disclosures",
  headline: "Earnings & Advisory Disclaimer",
  lastUpdated: "August 23, 2026",
  effectiveDate: "August 23, 2026",
  summary:
    "High-ticket sales mastery requires rigorous execution, market fit, and discipline. Results shared across our articles and case studies represent exemplary outcomes and do not constitute a guarantee of future performance.",
  metaDescription:
    "Official Earnings and Professional Advice Disclaimer for Dipak Vishwakarma and Authority Closers. FTC compliant disclosures regarding business results and consulting.",
  sections: [
    {
      id: "earnings-disclaimer",
      title: "1. Earnings & Results Disclaimer (FTC & Regulatory Compliance)",
      content: [
        "Any references to revenue milestones, deal sizes, closing percentages, enterprise contract values, or client growth statistics shared across dipakvishwakarma.com, our articles, keynote recordings, or Authority Closers programs represent historical, individual, or exemplary results achieved under specific business conditions.",
        "These results are not typical and are not intended to represent or guarantee that anyone will achieve the same or similar outcomes. Your business success depends entirely on your own effort, founder execution, market conditions, product-market fit, sales team caliber, risk appetite, and capital capacity.",
      ],
      highlightBox: {
        title: "No Promise of Financial Return",
        text: "We make no representations, warranties, or guarantees regarding your future financial earnings, deal closures, or business growth from applying the frameworks discussed on this Site.",
      },
    },
    {
      id: "not-financial-advice",
      title: "2. Not Financial, Legal, or Certified Accounting Advice",
      content: [
        "The frameworks, architectural guides, and sales psychology concepts published by Dipak Vishwakarma represent strategic business commentary and thought leadership based on real-world closing experience.",
        "They do not constitute certified financial advice, legal counsel, tax advice, or registered investment advisory services. You should always consult with qualified legal, accounting, and financial professionals prior to making major corporate or financial commitments.",
      ],
    },
    {
      id: "testimonials-and-case-studies",
      title: "3. Case Studies & Testimonials",
      content: [
        "Case studies, client feedback, and founder testimonials featured on this website reflect the genuine experiences of real individuals and organizations who have implemented Authority Closers frameworks or engaged Dipak Vishwakarma for advisory.",
        "However, individual experiences vary significantly. Past performance is never an indicator or guarantee of future outcomes.",
      ],
    },
    {
      id: "forward-looking-statements",
      title: "4. Forward-Looking Statements",
      content: [
        "Content on this website may contain forward-looking statements regarding industry sales trends, artificial intelligence impact on deal cycles, and market evolution. These statements represent our current perspective and analysis and are subject to market changes, technological disruptions, and inherent uncertainties.",
      ],
    },
  ],
};
