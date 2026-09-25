export const SITE_URL = "https://dipakvishwakarma.com";
export const PERSON_ID = `${SITE_URL}/#person`;
export const AUTHORITY_CLOSERS_URL = "https://authorityclosers.com";
export const AUTHORITY_CLOSERS_ID = `${AUTHORITY_CLOSERS_URL}/#organization`;

export const dipakPerson = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Dipak Vishwakarma",
  alternateName: ["Dipak", "The Certainty Builder"],
  jobTitle: "High-Ticket Sales Coach and Founder of Authority Closers",
  worksFor: { "@id": AUTHORITY_CLOSERS_ID },
  url: SITE_URL,
  image: `${SITE_URL}/media/dipak-vishwakarma-portrait-connect.webp`,
  sameAs: [
    "https://www.linkedin.com/in/dipak-vishwakarma",
    "https://youtube.com/@dipakvishwakarmasalescoach",
    "https://www.instagram.com/dipakv.sales",
    AUTHORITY_CLOSERS_URL,
  ],
  description:
    "Dipak Vishwakarma is a High-Ticket Sales Coach, Public Speaker, and Founder of Authority Closers. He writes about buyer psychology, objection handling, consultative selling, and high-stakes decisions.",
  knowsAbout: [
    "High-Ticket Sales",
    "Sales Psychology",
    "Buyer Psychology",
    "Objection Handling",
    "Consultative Selling",
    "Deal Architecture",
  ],
};

export const authorityClosersOrganization = {
  "@type": "Organization",
  "@id": AUTHORITY_CLOSERS_ID,
  name: "Authority Closers",
  url: AUTHORITY_CLOSERS_URL,
};
