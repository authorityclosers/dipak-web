import type { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "@/features/site-chrome";

/**
 * Chrome for every page except Home.
 *
 * Home is excluded on purpose: its header is part of the pinned GSAP story
 * stage and must deconstruct with Act 1, so it cannot use a fixed header.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </>
  );
}
