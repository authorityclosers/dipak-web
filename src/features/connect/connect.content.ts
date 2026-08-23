/**
 * Connect Link Hub Content Contract
 * Dipak Vishwakarma — High-Ticket Sales Coach & Founder of Authority Closers
 */

export interface ConnectLinkItem {
  id: string;
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
  isExternal: boolean;
  featured?: boolean;
  iconType: "authority" | "about" | "contact" | "youtube" | "linkedin" | "instagram" | "articles" | "videos";
}

export interface ConnectContent {
  eyebrow: string;
  name: string;
  title: string;
  tagline: string;
  location: string;
  bio: string;
  portrait: {
    src: string;
    alt: string;
  };
  links: ConnectLinkItem[];
  footerNote: string;
}

export const connectContent: ConnectContent = {
  eyebrow: "Official Hub",
  name: "Dipak Vishwakarma",
  title: "High-Ticket Sales Coach | Founder of Authority Closers",
  tagline: "Because people buy certainty.",
  location: "Pune, India & Global",
  bio: "Helping founders, closers, and sales teams build certainty, master objection diagnosis, and close high-ticket deals without pressure or script manipulation.",
  portrait: {
    src: "/media/01_dsc06974.webp",
    alt: "Dipak Vishwakarma — High-Ticket Sales Coach & Founder of Authority Closers",
  },
  links: [
    {
      id: "authority-closers",
      title: "Authority Closers™",
      subtitle: "High-ticket sales consulting, enterprise deal architecture & closing systems.",
      url: "https://authorityclosers.com",
      badge: "Flagship Venture",
      isExternal: true,
      featured: true,
      iconType: "authority",
    },
    {
      id: "about-dipak",
      title: "About Dipak Vishwakarma",
      subtitle: "Background, sales philosophy, and the story behind The Certainty Builder™.",
      url: "/about",
      badge: "Official Bio",
      isExternal: false,
      iconType: "about",
    },
    {
      id: "youtube-channel",
      title: "YouTube Videos",
      subtitle: "Live sales call breakdowns, objection handling frameworks & buyer psychology.",
      url: "https://youtube.com/@dipakvishwakarmasalescoach",
      badge: "Free Training",
      isExternal: true,
      iconType: "youtube",
    },
    {
      id: "linkedin-profile",
      title: "LinkedIn — Daily Sales Essays",
      subtitle: "Daily frameworks on consultative selling, pipeline architecture, and closing.",
      url: "https://www.linkedin.com/in/dipak-vishwakarma",
      badge: "Active Community",
      isExternal: true,
      iconType: "linkedin",
    },
    {
      id: "instagram-profile",
      title: "Instagram (@dipakv.sales)",
      subtitle: "Short-form sales psychology breakdowns, mindset, and behind-the-scenes.",
      url: "https://www.instagram.com/dipakv.sales",
      badge: "Daily Updates",
      isExternal: true,
      iconType: "instagram",
    },
    {
      id: "sales-articles",
      title: "Sales Articles & Playbooks",
      subtitle: "Deep-dive essays on why buyers hesitate, discovery question design, and certainty.",
      url: "/articles",
      badge: "Editorial",
      isExternal: false,
      iconType: "articles",
    },
    {
      id: "book-advisory",
      title: "Book Sales Advisory / Keynote",
      subtitle: "Inquire about private sales consulting, founder coaching, or keynote speaking.",
      url: "/contact",
      badge: "Direct Access",
      isExternal: false,
      iconType: "contact",
    },
  ],
  footerNote: "Official verified link repository for Dipak Vishwakarma. Built with zero third-party tracking.",
};
