"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import CaseStudyModal from "./CaseStudyModal";
import {
  bankOperationsTooling,
  standardizingMoneyMovement,
  addingFamilyPlan,
  dataAutomationRules,
  optimizingFormDesign,
  type CaseStudy,
} from "@/lib/caseStudies";

type Tag = {
  label: string;
  variant: "coral" | "olive";
};

type Project = {
  previewImage: string;
  previewImageAlt: string;
  companyLogo: string;
  companyLogoAlt: string;
  companyLogoWidth: number;
  companyLogoHeight: number;
  title: string;
  description: string;
  tags: Tag[];
  caseStudy?: CaseStudy;
};

const projects: Project[] = [
  {
    previewImage: "/images/addingFP.png",
    previewImageAlt: "Adding a Family Plan product screens",
    companyLogo: "/images/quizlet.svg",
    companyLogoAlt: "Quizlet",
    companyLogoWidth: 77,
    companyLogoHeight: 20,
    title: "Adding a Family Plan",
    description:
      "Created a new SKU and designed the end-to-end experience, driving a 1% increase in revenue.",
    caseStudy: addingFamilyPlan,
    tags: [
      { label: "B2C", variant: "coral" },
      { label: "AB Testing", variant: "coral" },
    ],
  },
  {
    previewImage: "/images/bankingDispute.png",
    previewImageAlt: "Banking Dispute Tooling product screens",
    companyLogo: "/images/logo-stash.svg",
    companyLogoAlt: "Stash",
    companyLogoWidth: 70,
    companyLogoHeight: 20,
    title: "Banking Dispute Tooling",
    description:
      "Built in-house tooling for the debit/ACH dispute ecosystem, enabling operations team members to work 4x faster.",
    caseStudy: bankOperationsTooling,
    tags: [
      { label: "B2B", variant: "olive" },
      { label: "Building 0→1", variant: "olive" },
    ],
  },
  {
    previewImage: "/images/unifyingTransaction.png",
    previewImageAlt: "Unifying transaction UX product screens",
    companyLogo: "/images/logo-stash.svg",
    companyLogoAlt: "Stash",
    companyLogoWidth: 70,
    companyLogoHeight: 20,
    title: "Unifying transaction UX",
    description:
      "Unified patterns across 3 product surfaces where transactions occur, reducing cognitive load and promoting consistency.",
    caseStudy: standardizingMoneyMovement,
    tags: [
      { label: "B2C", variant: "coral" },
      { label: "Design systems", variant: "coral" },
    ],
  },
  {
    previewImage: "/images/dataAutomation.png",
    previewImageAlt: "Data automation rules product screens",
    companyLogo: "/images/logo-sp-global.svg",
    companyLogoAlt: "S&P Global",
    companyLogoWidth: 70,
    companyLogoHeight: 20,
    title: "Data automation rules",
    description:
      "Introduced hierarchy based logic to data management automations to substantially reduce workload for 20 clients.",
    caseStudy: dataAutomationRules,
    tags: [
      { label: "B2B", variant: "olive" },
      { label: "Systems thinking", variant: "olive" },
    ],
  },
  {
    previewImage: "/images/optimizingForm.png",
    previewImageAlt: "Optimizing form design product screens",
    companyLogo: "/images/logo-sp-global.svg",
    companyLogoAlt: "S&P Global",
    companyLogoWidth: 70,
    companyLogoHeight: 20,
    title: "Optimizing form design",
    description:
      "Redesigned an outdated experience, cutting workarounds and speeding up data collection by 10%.",
    caseStudy: optimizingFormDesign,
    tags: [
      { label: "B2B", variant: "olive" },
      { label: "Research facilitation", variant: "olive" },
    ],
  },
];

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  return (
    <div
      onClick={project.caseStudy ? onOpen : undefined}
      role={project.caseStudy ? "button" : undefined}
      tabIndex={project.caseStudy ? 0 : undefined}
      onKeyDown={
        project.caseStudy
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onOpen();
              }
            }
          : undefined
      }
      className="hover-lift hover-outline-olive card-interactive flex h-full flex-col overflow-hidden rounded-2xl border border-transparent bg-sage-card hover:border-[#C8DAC0]"
    >
      <div className="relative aspect-[1300/640] w-full overflow-hidden bg-cream">
        <div data-thumb-parallax className="absolute inset-0 scale-110">
          <Image
            src={project.previewImage}
            alt={project.previewImageAlt}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-[1.1rem] text-ink">
            {project.title}
          </h3>
          <Image
            src={project.companyLogo}
            alt={project.companyLogoAlt}
            width={project.companyLogoWidth}
            height={project.companyLogoHeight}
            className="h-3 w-auto shrink-0"
          />
        </div>
        <p className="mt-1 text-xs text-ink-soft">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tags.map((tag) => (
            <span
              key={tag.label}
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium text-cream ${
                tag.variant === "coral" ? "bg-coral" : "bg-olive-deep"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const SLIDE_COUNT = projects.length;
const LOOPS = 3;
const MIDDLE_COPY = 1;
const loopedProjects: Project[] = Array.from({ length: LOOPS }, () => projects).flat();

export default function WorkGrid() {
  const [openProject, setOpenProject] = useState<Project | null>(null);
  const [focusedIndex, setFocusedIndex] = useState(MIDDLE_COPY * SLIDE_COUNT);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafRef = useRef<number | null>(null);
  const settleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // The scroll position that puts a given card's center in the middle of
  // the viewport — used everywhere a card needs to be brought into focus.
  function centeredScrollLeft(el: HTMLDivElement, container: HTMLDivElement) {
    return el.offsetLeft + el.offsetWidth / 2 - container.clientWidth / 2;
  }

  // Pans each thumbnail's overscaled image a few pixels toward its card's
  // side of center, proportional to how far that card sits from the
  // viewport's center — a subtle parallax that tracks the scroll in real
  // time. Applied via direct DOM writes (not React state) so it stays
  // smooth at scroll-event frequency instead of re-rendering every frame.
  const PARALLAX_MAX_SHIFT_PX = 20;
  function applyParallax(container: HTMLDivElement) {
    const viewportCenter = container.scrollLeft + container.clientWidth / 2;
    cardRefs.current.forEach((el) => {
      if (!el) return;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const normalized = Math.max(
        -1,
        Math.min(1, (cardCenter - viewportCenter) / (container.clientWidth / 2))
      );
      const thumb = el.querySelector<HTMLElement>("[data-thumb-parallax]");
      if (thumb) {
        thumb.style.translate = `${normalized * PARALLAX_MAX_SHIFT_PX}px 0px`;
      }
    });
  }

  // Start the carousel on the middle copy so there's always a cloned set
  // to scroll into in either direction, before the user has scrolled at all.
  useLayoutEffect(() => {
    const container = scrollRef.current;
    const middleStart = cardRefs.current[MIDDLE_COPY * SLIDE_COUNT];
    if (container && middleStart) {
      container.scrollTo({
        left: centeredScrollLeft(middleStart, container),
        behavior: "instant",
      });
      applyParallax(container);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    };
  }, []);

  function getClosestIndex(scrollLeft: number) {
    const container = scrollRef.current;
    if (container) {
      // A card's center can't always reach the viewport's center — the
      // container caps out short of it near either end of the scroll range
      // — so the comparison below picks the wrong neighbor there. Snap to
      // the boundary card directly instead.
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (scrollLeft <= 1) return 0;
      if (scrollLeft >= maxScrollLeft - 1) return cardRefs.current.length - 1;
    }

    const viewportCenter = scrollLeft + (container?.clientWidth ?? 0) / 2;
    let closest = 0;
    let closestDist = Infinity;
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const cardCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(cardCenter - viewportCenter);
      if (dist < closestDist) {
        closestDist = dist;
        closest = i;
      }
    });
    return closest;
  }

  // Once scrolling has settled on a cloned card (the first or last copy),
  // silently jump to the pixel-identical card in the middle copy so there's
  // always headroom to keep scrolling the same direction — the clones make
  // the jump invisible. Must be an explicit "instant" scroll: this container
  // has CSS scroll-behavior: smooth (for the dot-click navigation), and that
  // also applies to a plain `scrollLeft =` assignment, which turned this
  // "invisible" correction into a second, visibly animated scroll.
  function recenterIfNeeded() {
    const container = scrollRef.current;
    if (!container) return;
    const closest = getClosestIndex(container.scrollLeft);
    if (closest < SLIDE_COUNT || closest >= SLIDE_COUNT * 2) {
      const target = cardRefs.current[(closest % SLIDE_COUNT) + SLIDE_COUNT];
      if (target) {
        container.scrollTo({
          left: centeredScrollLeft(target, container),
          behavior: "instant",
        });
      }
    }
  }

  function handleScroll() {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;
      setFocusedIndex(getClosestIndex(container.scrollLeft));
      applyParallax(container);
    });

    if (settleTimeoutRef.current) clearTimeout(settleTimeoutRef.current);
    settleTimeoutRef.current = setTimeout(recenterIfNeeded, 120);
  }

  function scrollToIndex(i: number) {
    const container = scrollRef.current;
    if (!container) return;
    const scrollLeft = container.scrollLeft;

    // Jump to whichever copy of this project is nearest the current scroll
    // position, so navigating via the dots never causes a large, jarring jump.
    let bestEl: HTMLDivElement | null = null;
    let bestDist = Infinity;
    for (let copy = 0; copy < LOOPS; copy++) {
      const el = cardRefs.current[copy * SLIDE_COUNT + i];
      if (!el) continue;
      const dist = Math.abs(el.offsetLeft - scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        bestEl = el;
      }
    }
    if (bestEl) {
      container.scrollTo({
        left: centeredScrollLeft(bestEl, container),
        behavior: "smooth",
      });
    }
  }

  return (
    <section
      id="work"
      className="relative z-0 mx-auto max-w-[1200px] px-6 pb-24 sm:px-10"
    >
      <div className="relative">
        {/* Full-viewport-width backdrop sized to just the card row (not the
            whole section) so the carousel's masked edges always fade into
            solid page background with no seam, while the hero's blob still
            shows through in the rest of the section — below the row, around
            the dots — where there's no card to bleed through. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 left-1/2 -z-10 w-screen -translate-x-1/2 bg-cream"
        />
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar carousel-mask -mx-6 flex snap-x snap-mandatory items-center gap-6 overflow-x-auto scroll-smooth px-6 py-10 sm:-mx-10 sm:px-10"
        >
          {loopedProjects.map((project, i) => {
            const copy = Math.floor(i / SLIDE_COUNT);
            const isFocused = i === focusedIndex;
            return (
              <div
                key={`${project.title}-${copy}`}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                inert={copy !== MIDDLE_COPY}
                className={`w-[80%] shrink-0 snap-center transition-all duration-300 ease-out sm:w-[58%] lg:w-[52%] ${
                  isFocused
                    ? "scale-110 opacity-100"
                    : "scale-[0.88] opacity-50 grayscale"
                }`}
              >
                <ProjectCard
                  project={project}
                  onOpen={() => setOpenProject(project)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2">
        {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => scrollToIndex(i)}
            aria-label={`Go to project ${i + 1}`}
            aria-current={i === focusedIndex % SLIDE_COUNT}
            className={`h-2 rounded-full transition-all duration-300 ease-out ${
              i === focusedIndex % SLIDE_COUNT
                ? "w-6 bg-coral"
                : "w-2 bg-ink-soft/25 hover:bg-ink-soft/45"
            }`}
          />
        ))}
      </div>

      {openProject?.caseStudy && (
        <CaseStudyModal
          caseStudy={openProject.caseStudy}
          tags={openProject.tags}
          companyLogo={openProject.companyLogo}
          companyLogoAlt={openProject.companyLogoAlt}
          companyLogoWidth={openProject.companyLogoWidth}
          companyLogoHeight={openProject.companyLogoHeight}
          onClose={() => setOpenProject(null)}
        />
      )}
    </section>
  );
}
