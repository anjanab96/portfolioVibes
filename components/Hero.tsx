"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { smoothScrollTo } from "@/lib/scrollTo";

const IMPACT_PHRASES = [
  "increase your deposit rate by 4%.",
  "increase your subscription revenue by 1%.",
  "decrease your operating expenses by $2000 per month.",
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const intervalId = setInterval(() => {
      setVisible(false);
      timeoutId = setTimeout(() => {
        setIndex((i) => (i + 1) % IMPACT_PHRASES.length);
        setVisible(true);
      }, 500);
    }, 2900);
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
          className="h-[55%] w-auto max-w-none -translate-x-[12%] opacity-60 mix-blend-multiply sm:h-full sm:-translate-x-[10%] sm:opacity-70 lg:opacity-80"
        />
      </div>

      <section className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1000px] flex-col items-center px-6 pb-[58px] text-center sm:px-10 sm:pb-[77px]">
        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="font-display text-[36px] leading-tight text-ink sm:text-[48px] lg:text-[68px]">
            NJ based senior product designer with 7 years of experience.
          </h1>
          <p
            className={`mt-5 max-w-[320px] font-display text-lg text-ink transition-all duration-500 ease-[cubic-bezier(0,0,0.2,1)] sm:mt-6 sm:max-w-2xl sm:text-xl lg:max-w-[720px] lg:text-2xl ${
              visible ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0"
            }`}
          >
            {"Together we can "}
            <span className="text-coral">{IMPACT_PHRASES[index]}</span>
          </p>
        </div>
        <a
          href="#work"
          onClick={(e) => {
            e.preventDefault();
            smoothScrollTo("work");
          }}
          className="hover-lift group flex flex-col items-center gap-2 text-coral hover:text-coral-dark"
        >
          <span className="text-lg font-medium sm:text-xl">See my work</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="h-5 w-5 transition-transform duration-200 group-hover:translate-y-1"
          >
            <path
              d="M12 4v16M6 14l6 6 6-6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </section>
    </div>
  );
}
