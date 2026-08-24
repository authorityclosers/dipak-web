/**
 * Global brand + navigation contract.
 *
 * Copy is transcribed from the client handoff pack
 * (01_COPY/DIPAK_WEBSITE_COPY_MASTER.md, sections NAVIGATION and FOOTER).
 * Every public page reads from here so nav/footer never drift per-page.
 */

export interface NavLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SiteBrand {
  firstLine: string;
  secondLine: string;
  positioning: string;
  primaryIdea: string;
  location: string;
}

export const siteBrand: SiteBrand = {
  firstLine: "DIPAK",
  secondLine: "VISHWAKARMA",
  positioning: "Founder of Authority Closers · High-Ticket Sales Expert",
  primaryIdea: "Because people buy certainty.",
  location: "Pune, India · Global Engagements",
};

export const primaryNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Articles", href: "/articles" },
  { label: "Videos", href: "/videos" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" },
];

/**
 * Persistent cross-link required on every public page by the handoff pack.
 * Kept as config so the destination can change without touching components.
 */
export const authorityClosersCta = {
  label: "Explore Authority Closers",
  href: "https://authorityclosers.com",
  event: "public.global.authority_closers_clicked",
};

export const footerSections = {
  navigation: {
    label: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Dipak", href: "/about" },
      { label: "Articles & Essays", href: "/articles" },
      { label: "Video Masterclasses", href: "/videos" },
      { label: "Resources & Frameworks", href: "/resources" },
      { label: "Executive Contact", href: "/contact" },
    ] as NavLink[],
  },
  dialogue: {
    label: "Direct Dialogue",
    links: [
      { label: "LinkedIn", href: "https://www.linkedin.com/in/dipak-vishwakarma", isExternal: true },
      { label: "YouTube", href: "https://youtube.com/@dipakvishwakarmasalescoach", isExternal: true },
      { label: "Instagram", href: "https://www.instagram.com/dipakv.sales", isExternal: true },
      { label: "Connect Hub", href: "/connect", isExternal: false },
    ] as NavLink[],
  },
  venture: {
    label: "Flagship Venture",
    title: "Authority Closers™",
    description: "The institutional sales training, deliberate practice labs, and deal architecture ecosystem.",
    cta: {
      label: "Explore Authority Closers",
      href: "https://authorityclosers.com",
    },
  },
};

export const footerContent = {
  philosophyLine: "Because people buy certainty.",
  legalLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Disclaimer", href: "/disclaimer" },
  ] as NavLink[],
  copyright: "Dipak Vishwakarma. All rights reserved.",
};

/**
 * Verified Social and Directory Links for Dipak Vishwakarma
 */
export const socialLinks: NavLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/dipak-vishwakarma" },
  { label: "YouTube", href: "https://youtube.com/@dipakvishwakarmasalescoach" },
  { label: "Instagram", href: "https://www.instagram.com/dipakv.sales" },
  { label: "Connect Hub", href: "/connect" },
];
