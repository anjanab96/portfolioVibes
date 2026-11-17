"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/scrollTo";
import { prefersReducedMotion } from "@/lib/motion";

// Each line is an ink lead-in followed by a coral payoff.
const IMPACT_LINES = [
  { lead: "Prototyping in code to know what works ", phrase: "before it ships." },
  { lead: "Building 0→1 tools that ", phrase: "make teams 4x faster." },
  { lead: "Speaking an engineer’s language, ", phrase: "thanks to a web dev background." },
  { lead: "Designing flows that convert, ", phrase: "like 90% checkout on a new plan." },
  { lead: "Making complex workflows simple, ", phrase: "from consumer apps to B2B." },
  { lead: "Shipping fast ", phrase: "without letting quality slip." },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // With reduced motion, keep the first line instead of rotating.
    if (prefersReducedMotion()) return;
    let timeoutId: ReturnType<typeof setTimeout>;
    const intervalId = setInterval(() => {
      setVisible(false);
      timeoutId = setTimeout(() => {
        setIndex((i) => (i + 1) % IMPACT_LINES.length);
        setVisible(true);
      }, 500);
    }, 4000);
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className="relative">
      {/* Watercolor flower anchored to the left edge. It starts at the top of
          the page (behind the header) and multiplies onto the cream so the
          image's white background disappears. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-24 bottom-0 -z-10 overflow-hidden"
      >
        <Image
          src="/images/hero-flower.webp"
          alt=""
          width={1672}
          height={941}
          priority
          className="h-[55%] w-auto max-w-none -translate-x-[12%] opacity-75 mix-blend-multiply sm:h-full sm:-translate-x-[10%] sm:opacity-85 lg:opacity-95"
        />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1000px] flex-col items-center px-6 pb-[58px] text-center sm:px-10 sm:pb-[77px]">
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="font-display text-[36px] leading-tight text-ink sm:text-[48px] lg:text-[68px]">
            NJ based senior product designer with 7 years of experience.
          </h1>
          {/* All lines share one grid cell, so the block keeps the height of
              the tallest line and the headline doesn't shift as they rotate. */}
          <p className="mt-5 grid max-w-[320px] font-display text-lg text-ink-soft sm:mt-6 sm:max-w-2xl sm:text-xl lg:max-w-[720px] lg:text-2xl">
            {IMPACT_LINES.map((line, i) => {
              const active = i === index;
              return (
                <span
                  key={i}
                  aria-hidden={!active}
                  className={`[grid-area:1/1] transition-all duration-500 ease-[cubic-bezier(0,0,0.2,1)] ${
                    active && visible
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-1 opacity-0"
                  }`}
                >
                  {line.lead}
                  <span className="text-coral">{line.phrase}</span>
                </span>
              );
            })}
          </p>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("work");
            }}
            // Soft sage pill that deepens on hover.
            className="group mt-10 flex items-center gap-2.5 rounded-full bg-[#d2d6bf] px-7 py-3 font-display text-xl text-ink transition-colors duration-300 hover:bg-[#c2c8aa] sm:mt-12"
          >
            See my work
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              aria-hidden="true"
              className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5"
            >
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
}
