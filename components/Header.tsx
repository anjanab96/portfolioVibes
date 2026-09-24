"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { smoothScrollTo, smoothScrollToTop } from "@/lib/scrollTo";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const MENU_CLOSE_ANIMATION_MS = 200;

// Past this, the pill frosts over so it reads against page content.
const FROST_OFFSET_PX = 24;
// The bar only compacts once the hero has started to scroll away.
const COMPACT_OFFSET_PX = 120;
// Ignore scroll deltas smaller than this so trackpad jitter doesn't flicker the bar.
const SCROLL_THRESHOLD_PX = 8;

export default function Header() {
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [isFrosted, setIsFrosted] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openMenu() {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setIsMenuMounted(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
    closeTimeoutRef.current = setTimeout(
      () => setIsMenuMounted(false),
      MENU_CLOSE_ANIMATION_MS
    );
  }

  useEffect(() => {
    if (!isMenuMounted) return;
    const frame = requestAnimationFrame(() => setIsMenuOpen(true));
    return () => cancelAnimationFrame(frame);
  }, [isMenuMounted]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    let lastY = window.scrollY;

    function updateScrollState() {
      const y = window.scrollY;
      setIsFrosted(y > FROST_OFFSET_PX);

      if (y <= COMPACT_OFFSET_PX) {
        setIsScrollingDown(false);
        lastY = y;
        return;
      }

      const delta = y - lastY;
      if (Math.abs(delta) < SCROLL_THRESHOLD_PX) return;
      setIsScrollingDown(delta > 0);
      lastY = y;
    }

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  // Keep the bar full size while the mobile menu is open.
  const isCompact = isScrollingDown && !isMenuMounted;

  useEffect(() => {
    function updateActiveSection() {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      let current: string | null = null;

      for (const link of navLinks) {
        const el = document.getElementById(link.href.slice(1));
        if (!el) continue;
        const top = el.offsetTop;
        const bottom = top + el.offsetHeight;
        if (scrollPos >= top && scrollPos < bottom) {
          current = link.href;
          break;
        }
      }

      setActiveHref(current);
    }

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div
        className={`relative mx-auto max-w-[1000px] rounded-[200px] backdrop-blur-xl backdrop-saturate-150 transition-[background-color,box-shadow] duration-300 ease-out md:w-fit ${
          isFrosted
            ? "bg-cream/70 shadow-[0_8px_24px_-12px_rgba(38,36,29,0.25)]"
            : "bg-cream/20 shadow-none"
        }`}
      >
        {/* Mobile: logo left, hamburger right */}
        <div
          className={`flex items-center justify-between gap-4 pl-3 pr-6 transition-[padding] duration-300 ease-out motion-reduce:transition-none md:hidden ${
            isCompact ? "py-1.5" : "py-3"
          }`}
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollToTop();
            }}
            className="logo-hover shrink-0"
            aria-label="Home"
          >
            <Image
              src="/images/logo.png"
              alt="AB logo"
              width={88}
              height={74}
              className={`h-auto transition-[width] duration-300 ease-out motion-reduce:transition-none ${
                isCompact ? "w-12" : "w-16"
              }`}
              priority
            />
          </a>

          <button
            type="button"
            onClick={() => (isMenuMounted ? closeMenu() : openMenu())}
            className="hover-lift flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        {/* Tablet/desktop: nav links centered around the logo */}
        <nav
          className={`hidden items-center justify-center transition-[gap,padding] duration-300 ease-out motion-reduce:transition-none md:flex ${
            isCompact ? "gap-6 px-8 py-1.5" : "gap-8 px-10 py-3"
          }`}
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("work");
            }}
            className={`text-sm font-medium transition-colors hover:text-coral ${
              activeHref === "#work" ? "text-coral" : "text-ink"
            }`}
          >
            Work
          </a>
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("about");
            }}
            className={`text-sm font-medium transition-colors hover:text-coral ${
              activeHref === "#about" ? "text-coral" : "text-ink"
            }`}
          >
            About
          </a>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollToTop();
            }}
            className="logo-hover shrink-0"
            aria-label="Home"
          >
            <Image
              src="/images/logo.png"
              alt="AB logo"
              width={88}
              height={74}
              className={`h-auto transition-[width] duration-300 ease-out motion-reduce:transition-none ${
                isCompact ? "w-11" : "w-14"
              }`}
            />
          </a>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("contact");
            }}
            className={`text-sm font-medium transition-colors hover:text-coral ${
              activeHref === "#contact" ? "text-coral" : "text-ink"
            }`}
          >
            Contact
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-ink transition-colors hover:text-coral"
          >
            Resume
          </a>
        </nav>

        {isMenuMounted && (
          <nav
            className={`absolute inset-x-0 top-full z-10 mt-2 flex origin-top flex-col gap-1 rounded-2xl border border-white/40 bg-cream p-4 text-center shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-all duration-200 ease-out md:hidden ${
              isMenuOpen
                ? "translate-y-0 scale-100 opacity-100"
                : "-translate-y-1 scale-95 opacity-0"
            }`}
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  closeMenu();
                  smoothScrollTo(link.href.slice(1));
                }}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-sage-card"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="hover-lift mt-2 rounded-full bg-olive px-5 py-2.5 text-center text-sm font-medium text-cream hover:bg-olive-deep"
            >
              Resume
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
