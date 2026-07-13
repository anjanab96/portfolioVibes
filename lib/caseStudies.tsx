export type CaseStudySection = {
  heading: string;
  paragraphs?: string[];
  subsections?: { label: string; text: string }[];
  bullets?: string[];
};

export type CaseStudyStat = {
  before: string;
  after: string;
  label: string;
};

export type CaseStudy = {
  eyebrow: string;
  title: string;
  sections: CaseStudySection[];
  stats?: CaseStudyStat[];
};

export const bankOperationsTooling: CaseStudy = {
  eyebrow: "STASH · B2B · Case Study",
  title: "Bank Operations Tooling",
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "This project was part of Stash's internal tooling suite, known internally as Atlas, which supports several operational teams — including bank operations and fraud.",
      ],
    },
    {
      heading: "Project team",
      paragraphs: [
        "A cross-squad initiative: one squad owned the UI, the other owned the backend systems. I partnered closely with product managers and engineering leads from both teams, with regular reviews alongside the bank operations staff who'd actually use the tool.",
      ],
    },
    {
      heading: "Problem space",
      paragraphs: [
        "The bank operations team handles break reconciliation — resolving discrepancies between settlement files and internal ledgers. They process upwards of 500 breaks a day, spending up to 20 minutes investigating each one. Untangling the process end-to-end also required about 20 engineering hours a week.",
      ],
    },
    {
      heading: "Design process",
      subsections: [
        {
          label: "Phased rollout approach",
          text: "We scoped a four-phase rollout so the team could start seeing value immediately, while engineering built toward the complete solution behind the scenes.",
        },
        {
          label: "Understanding the current process",
          text: "There are two flavors of breaks — ACH and Debit — each investigated slightly differently. Mapping both workflows in detail was the first step before touching any UI.",
        },
        {
          label: "Wireframing",
          text: "Low-fidelity wireframes evolved into high-fidelity designs through weekly stakeholder reviews, incorporating edge cases and error states along the way.",
        },
      ],
    },
    {
      heading: "Project impact",
      paragraphs: ["Following the launch of Phases 1 & 2:"],
    },
  ],
  stats: [
    { before: "20 hrs/week", after: "~1 hr/week", label: "Engineering effort" },
    { before: "24%", after: "0%", label: "Reconciliation error rate" },
    { before: "20 min", after: "5 min", label: "Investigation time per break" },
  ],
};

export const standardizingMoneyMovement: CaseStudy = {
  eyebrow: "STASH · B2C · Case Study",
  title: "Standardizing Money Movement Flows",
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "Stash is a personal finance app that makes investing accessible to the average American.",
      ],
    },
    {
      heading: "Project team",
      paragraphs: [
        "I worked closely with our head of content design, as well as engineering and product stakeholders from the design system team.",
      ],
    },
    {
      heading: "Problem space",
      paragraphs: [
        "This project is part of a larger initiative to standardize commonly used UI design patterns and establish platform parity.",
        "Our users interact with the app differently depending on their device — at the time, we had three different flows for adding money to the platform.",
      ],
    },
    {
      heading: "Design process",
      subsections: [
        {
          label: "1. Establish understanding of the current landscape",
          text: "Audited every existing money movement flow across platforms to see where they diverged.",
        },
        {
          label: "2. Create a framework for new money movement flows",
          text: "Defined a shared pattern that could flex across each entry point without fragmenting the experience.",
        },
        {
          label: "3. Iterate, iterate, iterate",
          text: "Refined the framework through multiple rounds of design critique and stakeholder feedback.",
        },
        {
          label: "4. Usability testing",
          text: "Validated the new flow with real users before rolling it out platform-wide.",
        },
      ],
    },
    {
      heading: "Testing results",
      bullets: [
        "4/4 users successfully completed the flow",
        "3/4 users understood how to change the frequency",
        "4/4 users successfully navigated from the partial to full experience",
        "3/4 users understood the concept of cash balance vs. linked funding source",
      ],
    },
    {
      heading: "Final deliverables",
      paragraphs: [
        "I built a robust, high-quality component that contains every money movement flow screen — giving engineering a single source of truth to build from.",
      ],
    },
  ],
};
