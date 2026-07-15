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

export default function Header() {
  const [isMenuMounted, setIsMenuMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <div className="relative mx-auto max-w-[1000px] rounded-[200px] bg-cream/20 py-3 pl-3 pr-6 backdrop-blur-xl backdrop-saturate-150 sm:pl-4 sm:pr-10">
        <div className="flex items-center justify-between gap-4">
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
              className="h-auto w-16 sm:w-[88px]"
              priority
            />
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(link.href.slice(1));
                }}
                className="text-sm font-medium text-ink transition-colors hover:text-coral"
              >
                {link.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift shrink-0 rounded-full bg-olive px-5 py-2 text-sm font-medium text-cream hover:bg-olive-deep"
            >
              Resume
            </a>
          </nav>

          <button
            type="button"
            onClick={() => (isMenuMounted ? closeMenu() : openMenu())}
            className="hover-lift flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-ink lg:hidden"
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

        {isMenuMounted && (
          <nav
            className={`absolute inset-x-0 top-full z-10 mt-2 flex origin-top flex-col gap-1 rounded-2xl border border-white/40 bg-cream p-4 text-center shadow-lg backdrop-blur-xl backdrop-saturate-150 transition-all duration-200 ease-out lg:hidden ${
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
