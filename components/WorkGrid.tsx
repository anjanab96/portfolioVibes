"use client";

import { useState } from "react";
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
    companyLogo: "/images/quizlet.svg",
    companyLogoAlt: "Quizlet",
    companyLogoWidth: 77,
    companyLogoHeight: 20,
    title: "Adding a Family Plan",
    description:
      "Adding to the current offerings with a family plan, starting a SKU from scratch.",
    caseStudy: addingFamilyPlan,
    tags: [
      { label: "B2C", variant: "coral" },
      { label: "AB Testing", variant: "coral" },
    ],
  },
  {
    companyLogo: "/images/logo-stash.svg",
    companyLogoAlt: "Stash",
    companyLogoWidth: 70,
    companyLogoHeight: 20,
    title: "Banking Dispute Tooling",
    description:
      "Adding to the current offerings with a family plan, starting a SKU from scratch.",
    caseStudy: bankOperationsTooling,
    tags: [
      { label: "B2B", variant: "olive" },
      { label: "Building 0→1", variant: "olive" },
    ],
  },
  {
    companyLogo: "/images/logo-stash.svg",
    companyLogoAlt: "Stash",
    companyLogoWidth: 70,
    companyLogoHeight: 20,
    title: "Unifying transaction UX",
    description:
      "Adding to the current offerings with a family plan, starting a SKU from scratch.",
    caseStudy: standardizingMoneyMovement,
    tags: [
      { label: "B2C", variant: "coral" },
      { label: "Design systems", variant: "coral" },
    ],
  },
  {
    companyLogo: "/images/logo-sp-global.svg",
    companyLogoAlt: "S&P Global",
    companyLogoWidth: 70,
    companyLogoHeight: 20,
    title: "Data automation rules",
    description:
      "Adding to the current offerings with a family plan, starting a SKU from scratch.",
    caseStudy: dataAutomationRules,
    tags: [
      { label: "B2B", variant: "olive" },
      { label: "Systems thinking", variant: "olive" },
    ],
  },
  {
    companyLogo: "/images/logo-sp-global.svg",
    companyLogoAlt: "S&P Global",
    companyLogoWidth: 70,
    companyLogoHeight: 20,
    title: "Optimizing form design",
    description:
      "Adding to the current offerings with a family plan, starting a SKU from scratch.",
    caseStudy: optimizingFormDesign,
    tags: [
      { label: "B2B", variant: "olive" },
      { label: "UX Research", variant: "olive" },
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
      className="hover-lift hover-outline-olive card-interactive rounded-2xl bg-sage-card p-8"
    >
      <Image
        src={project.companyLogo}
        alt={project.companyLogoAlt}
        width={project.companyLogoWidth}
        height={project.companyLogoHeight}
        className="h-4 w-auto"
      />
      <h3 className="mt-3 font-display text-2xl text-ink">
        {project.title}
      </h3>
      <p className="mt-3 text-sm text-ink-soft">{project.description}</p>
      <div className="mt-5 flex gap-2">
        {project.tags.map((tag) => (
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
    </div>
  );
}

function NextProjectCard() {
  return (
    <div className="flex h-full flex-col justify-center rounded-2xl bg-sage-card-muted p-8">
      <h3 className="font-display text-2xl text-ink-soft/70">
        Next project loading...
      </h3>
      <p className="mt-3 text-sm text-ink-soft/60">
        [Insert your company here]
      </p>
    </div>
  );
}

export default function WorkGrid() {
  const [openProject, setOpenProject] = useState<Project | null>(null);

  return (
    <section id="work" className="mx-auto max-w-[1200px] px-6 pb-24 sm:px-10">
      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onOpen={() => setOpenProject(project)}
          />
        ))}
        <NextProjectCard />
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
