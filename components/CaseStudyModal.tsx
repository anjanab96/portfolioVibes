"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type {
  CaseStudy,
  CaseStudyImage,
  CaseStudyMetadata,
} from "@/lib/caseStudies";

const CLOSE_ANIMATION_MS = 280;

const metadataFields: { key: keyof CaseStudyMetadata; label: string }[] = [
  { key: "team", label: "Team" },
  { key: "timeline", label: "Timeline" },
  { key: "platform", label: "Platform" },
  { key: "userGroup", label: "User group" },
];

type Tag = {
  label: string;
  variant: "coral" | "olive";
};

// Mirrors the work grid carousel: a scroll-snap track with the focused
// image centered, neighbors peeking in dimmed and grayscale, masked edges,
// and pill dots — plus prev/next arrows that wrap around at either end.
function Carousel({ images }: { images: CaseStudyImage[] }) {
  const [index, setIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  function scrollToSlide(i: number) {
    const track = trackRef.current;
    const slide = slideRefs.current[i];
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft + slide.offsetWidth / 2 - track.clientWidth / 2,
      behavior: "smooth",
    });
  }

  function handleScroll() {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDist = Infinity;
      slideRefs.current.forEach((el, i) => {
        if (!el) return;
        const dist = Math.abs(el.offsetLeft + el.offsetWidth / 2 - center);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });
      setIndex(closest);
    });
  }

  function goPrev() {
    scrollToSlide(index === 0 ? images.length - 1 : index - 1);
  }

  function goNext() {
    scrollToSlide(index === images.length - 1 ? 0 : index + 1);
  }

  return (
    // Bleeds to the modal's edges so neighbors peek in from the sides.
    // Slide width and track padding use container units so the first and
    // last slides can still snap to the center.
    <div className="@container relative -mx-8 mt-5 sm:-mx-14">
      <div
        ref={trackRef}
        onScroll={handleScroll}
        className="no-scrollbar carousel-mask flex snap-x snap-mandatory items-center gap-3 overflow-x-auto overscroll-x-contain scroll-smooth px-[15cqw]"
      >
        {images.map((image, i) => {
          const isFocused = i === index;
          return (
            <div
              key={image.src}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              onClick={isFocused ? undefined : () => scrollToSlide(i)}
              className={`w-[70cqw] shrink-0 snap-center transition-all duration-300 ease-out ${
                isFocused
                  ? "scale-100 opacity-100"
                  : "scale-[0.88] cursor-pointer opacity-50 grayscale"
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="h-auto w-full rounded-xl"
              />
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous image"
        className="hover-lift absolute left-3 top-[calc(50%-1rem)] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/80 text-ink shadow-md hover:bg-cream"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={goNext}
        aria-label="Next image"
        className="hover-lift absolute right-3 top-[calc(50%-1rem)] z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/80 text-ink shadow-md hover:bg-cream"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5">
          <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div className="mt-4 flex items-center justify-center gap-2">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => scrollToSlide(i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === index}
            className={`h-2 rounded-full transition-all duration-300 ease-out ${
              i === index
                ? "w-6 bg-coral"
                : "w-2 bg-ink-soft/25 hover:bg-ink-soft/45"
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
    // <html> has overflow-x-hidden, which makes it the scroll container, so
    // both it and <body> need locking for the page behind to stop scrolling.
    const { documentElement: html, body } = document;
    const originalHtmlOverflow = html.style.overflow;
    const originalBodyOverflow = body.style.overflow;
    const originalBodyPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - html.clientWidth;
    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

    const frame = requestAnimationFrame(() => setIsVisible(true));

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") handleClose();
    }
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      html.style.overflow = originalHtmlOverflow;
      body.style.overflow = originalBodyOverflow;
      body.style.paddingRight = originalBodyPaddingRight;
      window.removeEventListener("keydown", handleKeyDown);
      cancelAnimationFrame(frame);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Portal to <body> so the modal escapes WorkGrid's stacking context
  // (relative z-0) and layers above the fixed header.
  return createPortal(
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

        <div className="overflow-y-auto overscroll-contain px-8 py-12 sm:px-14">
          <Image
            src={companyLogo}
            alt={companyLogoAlt}
            width={companyLogoWidth}
            height={companyLogoHeight}
            className="h-4 w-auto"
          />
          <h2
            id="case-study-title"
            className="mt-3 font-display text-3xl text-ink"
          >
            {caseStudy.title}
          </h2>
          <p className="mt-4 text-sm leading-snug text-ink-soft">
            {caseStudy.overview}
          </p>
          <div className="mt-6 flex gap-2">
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

          {caseStudy.heroImage ? (
            <Image
              src={caseStudy.heroImage.src}
              alt={caseStudy.heroImage.alt}
              width={caseStudy.heroImage.width}
              height={caseStudy.heroImage.height}
              priority
              className="mt-8 h-auto w-full rounded-xl"
            />
          ) : (
            <div className="mt-8 flex aspect-video w-full items-center justify-center rounded-xl bg-sage-card text-sm font-medium text-ink-soft">
              Hero image
            </div>
          )}

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-ink/10 py-6 sm:grid-cols-4">
            {metadataFields.map(({ key, label }) => {
              const value = caseStudy.metadata[key];
              return (
                <div key={key}>
                  <dt className="text-xs font-medium uppercase tracking-wider text-ink-soft/70">
                    {label}
                  </dt>
                  <dd
                    className={`mt-1.5 text-sm leading-snug ${
                      value ? "text-ink" : "italic text-ink-soft/60"
                    }`}
                  >
                    {value ?? `[${label}]`}
                  </dd>
                </div>
              );
            })}
          </dl>

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

              {section.stats && (
                <div
                  className={`mt-5 grid gap-3 ${
                    section.stats.length === 2 ? "sm:grid-cols-2" : "sm:grid-cols-3"
                  }`}
                >
                  {section.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-2xl bg-sage-card-muted p-5"
                    >
                      <p className="font-display text-4xl leading-none text-ink">
                        {stat.value}
                      </p>
                      <p className="mt-3 text-sm leading-snug text-ink-soft">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
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

              {section.video && (
                <video
                  src={section.video.src}
                  controls
                  playsInline
                  className="mt-5 h-auto w-full rounded-xl"
                />
              )}
            </section>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
