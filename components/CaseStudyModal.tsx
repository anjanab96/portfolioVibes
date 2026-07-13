"use client";

import { useEffect, useRef, useState } from "react";
import type { CaseStudy } from "@/lib/caseStudies";

const CLOSE_ANIMATION_MS = 280;

export default function CaseStudyModal({
  caseStudy,
  onClose,
}: {
  caseStudy: CaseStudy;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleClose() {
    setIsVisible(false);
    closeTimeoutRef.current = setTimeout(onClose, CLOSE_ANIMATION_MS);
  }

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = requestAnimationFrame(() => setIsVisible(true));

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(frame);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center sm:p-6">
      <div
        className={`modal-scrim absolute inset-0 bg-ink/60 backdrop-blur-sm ${isVisible ? "modal-visible" : ""}`}
        onClick={handleClose}
        aria-hidden
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
        className={`modal-panel relative flex h-full w-full flex-col overflow-hidden rounded-none bg-cream shadow-2xl sm:h-[90vh] sm:w-[60vw] sm:max-w-full sm:rounded-3xl ${isVisible ? "modal-visible" : ""}`}
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close case study"
          className="hover-lift absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-ink/5 text-ink hover:bg-ink/10"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="overflow-y-auto px-8 py-12 sm:px-14">
          <p className="text-xs font-semibold tracking-wide text-label-blue">
            {caseStudy.eyebrow}
          </p>
          <h2
            id="case-study-title"
            className="mt-2 font-display text-4xl text-ink"
          >
            {caseStudy.title}
          </h2>

          {caseStudy.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h3 className="text-sm font-semibold text-ink">
                {section.heading}
              </h3>

              {section.paragraphs?.map((paragraph, i) => (
                <p
                  key={i}
                  className="mt-2 text-sm leading-relaxed text-ink-soft"
                >
                  {paragraph}
                </p>
              ))}

              {section.subsections && (
                <div className="mt-4 space-y-5">
                  {section.subsections.map((sub) => (
                    <div key={sub.label}>
                      <p className="text-sm font-medium text-ink">
                        {sub.label}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {sub.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {section.bullets && (
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft">
                  {section.bullets.map((bullet, i) => (
                    <li key={i}>{bullet}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {caseStudy.stats && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {caseStudy.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-sage-card p-5 text-center"
                >
                  <p className="text-sm text-ink-soft">
                    <span className="line-through">{stat.before}</span>
                  </p>
                  <p className="mt-1 font-display text-2xl text-ink">
                    {stat.after}
                  </p>
                  <p className="mt-2 text-xs text-ink-soft">{stat.label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
