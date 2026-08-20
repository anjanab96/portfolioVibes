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
      className="hover-lift hover-outline-olive card-interactive flex h-full flex-col overflow-hidden rounded-2xl border border-[#C8DAC0] bg-sage-card"
    >
      <div className="relative aspect-[1300/452] w-full overflow-hidden bg-cream">
        <Image
          src={project.previewImage}
          alt={project.previewImageAlt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <Image
          src={project.companyLogo}
          alt={project.companyLogoAlt}
          width={project.companyLogoWidth}
          height={project.companyLogoHeight}
          className="h-4 w-auto self-start"
        />
        <h3 className="mt-3 font-display text-2xl text-ink">
          {project.title}
        </h3>
        <p className="mt-3 text-sm text-ink-soft">{project.description}</p>
        <div className="mt-auto flex gap-2 pt-5">
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
    </div>
  );
}

function NextProjectCard() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#C8DAC0] bg-sage-card-muted">
      <div className="relative aspect-[1300/452] w-full overflow-hidden bg-cream">
        <Image
          src="/images/nextProjectWireframe.svg"
          alt="Wireframe sketches for an upcoming project"
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover object-top opacity-30"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <span className="text-sm text-ink-soft/70">[Your company]</span>
        <h3 className="mt-3 font-display text-2xl text-ink-soft/70">
          Next project loading...
        </h3>
        <div className="mt-auto flex flex-wrap gap-2 pt-5">
          {["Let's", "make", "something", "awesome"].map((word) => (
            <span
              key={word}
              className="rounded-full border border-dashed border-ink-soft/45 px-3 py-1 text-xs font-medium text-ink-soft"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
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
