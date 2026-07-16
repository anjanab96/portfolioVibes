"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { CaseStudy, CaseStudyImage } from "@/lib/caseStudies";

const CLOSE_ANIMATION_MS = 280;

type Tag = {
  label: string;
  variant: "coral" | "olive";
};

function Carousel({ images }: { images: CaseStudyImage[] }) {
  const [index, setIndex] = useState(0);

  function goPrev() {
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }

  const current = images[index];

  return (
    <div className="relative mt-5">
      <Image
        src={current.src}
        alt={current.alt}
        width={current.width}
        height={current.height}
        className="h-auto w-full rounded-xl"
      />

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous image"
        className="hover-lift absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/80 text-ink shadow-md hover:bg-cream"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next image"
        className="hover-lift absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/80 text-ink shadow-md hover:bg-cream"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="mt-3 flex justify-center gap-1.5">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            className={`h-1.5 w-1.5 rounded-full transition-colors ${
              i === index ? "bg-coral" : "bg-ink/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default function CaseStudyModal({
  caseStudy,
  tags,
  companyLogo,
  companyLogoAlt,
  companyLogoWidth,
  companyLogoHeight,
  onClose,
}: {
  caseStudy: CaseStudy;
  tags: Tag[];
  companyLogo: string;
  companyLogoAlt: string;
  companyLogoWidth: number;
  companyLogoHeight: number;
  onClose: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 640px)").matches
  );
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 640px)");
    const updateIsDesktop = () => setIsDesktop(mql.matches);
    mql.addEventListener("change", updateIsDesktop);
    return () => mql.removeEventListener("change", updateIsDesktop);
  }, []);

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
          <Image
            src={companyLogo}
            alt={companyLogoAlt}
            width={companyLogoWidth}
            height={companyLogoHeight}
            className="h-4 w-auto"
          />
          <h2
            id="case-study-title"
            className="mt-3 font-display text-4xl text-ink"
          >
            {caseStudy.title}
          </h2>
          <div className="mt-3 flex gap-2">
            {tags.map((tag) => (
              <span
                key={tag.label}
                className={`rounded-full px-3 py-1 text-xs font-medium text-cream ${
                  tag.variant === "coral" ? "bg-coral" : "bg-olive-deep"
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>

          <div className="mt-8 h-px w-full" style={{ backgroundColor: "#D9D9D9" }} />

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
                      {sub.image && (
                        <Image
                          src={sub.image.src}
                          alt={sub.image.alt}
                          width={sub.image.width}
                          height={sub.image.height}
                          style={
                            sub.image.widthPercent
                              ? { width: `${sub.image.widthPercent}%` }
                              : undefined
                          }
                          className={
                            sub.image.widthPercent
                              ? "mx-auto mt-4 h-auto rounded-xl"
                              : "mt-4 h-auto w-full rounded-xl"
                          }
                        />
                      )}
                      {sub.images && (
                        <div className="mt-4 grid grid-cols-3 gap-4">
                          {sub.images.map((image) => (
                            <Image
                              key={image.src}
                              src={image.src}
                              alt={image.alt}
                              width={image.width}
                              height={image.height}
                              className="h-auto w-full rounded-xl"
                            />
                          ))}
                        </div>
                      )}
                      {sub.imageStack?.map((image) => (
                        <Image
                          key={image.src}
                          src={image.src}
                          alt={image.alt}
                          width={image.width}
                          height={image.height}
                          className="mt-4 h-auto w-full rounded-xl"
                        />
                      ))}
                      {sub.carousel && <Carousel images={sub.carousel} />}
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

              {section.image && (() => {
                const img = section.image;
                const isGif = img.src.endsWith(".gif");
                const applyFullBleed = img.fullBleed;
                const applyWidthPercent = img.widthPercent && (!isGif || isDesktop);

                return (
                  <Image
                    src={img.src}
                    alt={img.alt}
                    width={img.width}
                    height={img.height}
                    unoptimized={isGif}
                    style={
                      applyWidthPercent
                        ? { width: `${img.widthPercent}%` }
                        : undefined
                    }
                    className={
                      applyFullBleed
                        ? "mt-5 h-auto max-w-none w-[calc(100%+4rem)] -mx-8 rounded-none sm:w-[calc(100%+7rem)] sm:-mx-14 sm:rounded-xl"
                        : applyWidthPercent
                          ? "mx-auto mt-5 h-auto rounded-xl"
                          : "mt-5 h-auto w-full rounded-xl"
                    }
                  />
                );
              })()}

              {section.images && (
                <div className="mt-5 grid grid-cols-3 gap-4">
                  {section.images.map((image) => (
                    <Image
                      key={image.src}
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      className="h-auto w-full rounded-xl"
                    />
                  ))}
                </div>
              )}

              {section.carousel && <Carousel images={section.carousel} />}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
