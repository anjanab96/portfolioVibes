import type { ReactNode } from "react";

export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type CaseStudySection = {
  heading: string;
  paragraphs?: ReactNode[];
  subsections?: { label: string; text: string; image?: CaseStudyImage }[];
  bullets?: string[];
  image?: CaseStudyImage;
  images?: CaseStudyImage[];
};

export type CaseStudy = {
  eyebrow: string;
  title: string;
  sections: CaseStudySection[];
};

export const bankOperationsTooling: CaseStudy = {
  eyebrow: "STASH · B2B · Case Study",
  title: "Bank Operations Tooling",
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        <>
          Building out{" "}
          <a
            href="https://www.stash.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral underline hover:no-underline"
          >
            Stash
          </a>
          's debit dispute tooling ecosystem 0→1, sparked by our sponsor bank
          transition and a push to bring operations tooling in-house. This
          case study covers one of several tools I designed from scratch as
          part of that broader initiative.
        </>,
      ],
    },
    {
      heading: "Project team",
      paragraphs: [
        "Cross-squad initiative. I worked with two product managers, two engineering leads, and the bank operations team.",
      ],
    },
    {
      heading: "Problem space",
      paragraphs: [
        "Bank operations handles break reconciliation, resolving discrepancies between settlement files and internal ledgers, alongside their existing workload: 500+ breaks a day, up to 20 minutes each, and several not fully resolvable without engineering, which burns ~20 hours a week untangling the process.",
      ],
      subsections: [
        {
          label: "What is a break?",
          text: "Breaks are inconsistencies between the settlement files and internal ledgers. This can happen if transactions exist in one file but not the other, or if they exist in both places with inconsistent dollar amounts. Duco, our reconciliation software, compares both files and generates a list of breaks daily.",
        },
      ],
      image: {
        src: "/images/break.png",
        alt: "Diagram showing settlement file and internal ledger feeding into Duco, which outputs a break list. There are 2 types of breaks: a transaction exists in one file but not the other, or the transaction exists in both files but the dollar amounts don't match.",
        width: 1036,
        height: 412,
      },
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
          text: "There are two flavors of breaks: ACH and Debit. There are slight nuances to how each one is investigated, uncovered via stakeholder interviews.",
          image: {
            src: "/images/break-process.png",
            alt: "Diagram mapping the current ACH and Debit break investigation workflows.",
            width: 2174,
            height: 1827,
          },
        },
        {
          label: "Mockups",
          text: "I started with a low-fi outline of a solution, and reviewed with stakeholders, product, and engineers. This continues in weekly touchpoints (or more often). After we nail down the information architecture and hierarchy, I pivot to higher fidelity wireframes, and start considering error states and edge cases.",
          image: {
            src: "/images/break-wireframes.png",
            alt: "Wireframes showing the progression from low-fidelity outlines to higher fidelity designs for the break resolution tool.",
            width: 1966,
            height: 880,
          },
        },
      ],
    },
    {
      heading: "Project impact",
      paragraphs: [
        "So far, the team has implemented Phases 1 & 2, with plans to deliver phase 3 & 4 in 2024. Some metrics from following the launch of phase 1 & 2:",
      ],
      bullets: [
        "Engineering effort reduced from 20 hours/week to ~1 hour/week",
        "Reconciliation error rate reduced from 24% to 0%",
        "Break research time reduced from 20 minutes to 5 minutes per break",
      ],
      image: {
        src: "/images/break-prototype.gif",
        alt: "Prototype walkthrough of the break resolution tool.",
        width: 1152,
        height: 648,
      },
    },
  ],
};

export const addingFamilyPlan: CaseStudy = {
  eyebrow: "QUIZLET · B2C · Case Study",
  title: "Adding a Family Plan",
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "[Add 1-2 sentences on what Quizlet is and where this project fit into the product.]",
      ],
    },
    {
      heading: "Project team",
      paragraphs: [
        "[Add who you partnered with — PMs, engineers, content design, research, etc.]",
      ],
    },
    {
      heading: "Problem space",
      paragraphs: [
        "[Add the problem this SKU solved and why a family plan was needed.]",
      ],
    },
    {
      heading: "Design process",
      subsections: [
        {
          label: "[Step 1 label]",
          text: "[Describe the first phase of your process.]",
        },
        {
          label: "[Step 2 label]",
          text: "[Describe the next phase of your process.]",
        },
        {
          label: "[Step 3 label]",
          text: "[Describe how you validated or iterated on the design.]",
        },
      ],
    },
    {
      heading: "Project impact",
      paragraphs: ["[Add outcomes, metrics, or launch results.]"],
    },
  ],
};

export const dataAutomationRules: CaseStudy = {
  eyebrow: "S&P GLOBAL · B2B · Case Study",
  title: "Data Automation Rules",
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "[Add 1-2 sentences on the product context at S&P Global.]",
      ],
    },
    {
      heading: "Project team",
      paragraphs: [
        "[Add who you partnered with — PMs, engineers, data/ops stakeholders, etc.]",
      ],
    },
    {
      heading: "Problem space",
      paragraphs: [
        "[Add the operational problem this automation solved and its scale/impact.]",
      ],
    },
    {
      heading: "Design process",
      subsections: [
        {
          label: "[Step 1 label]",
          text: "[Describe how you mapped the current, manual process.]",
        },
        {
          label: "[Step 2 label]",
          text: "[Describe how you designed the rules/automation framework.]",
        },
        {
          label: "[Step 3 label]",
          text: "[Describe testing or rollout with the systems-thinking angle.]",
        },
      ],
    },
    {
      heading: "Project impact",
      paragraphs: ["[Add outcomes, metrics, or efficiency gains.]"],
    },
  ],
};

export const optimizingFormDesign: CaseStudy = {
  eyebrow: "S&P GLOBAL · B2B · Case Study",
  title: "Optimizing Form Design",
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "[Add 1-2 sentences on the product context at S&P Global.]",
      ],
    },
    {
      heading: "Project team",
      paragraphs: [
        "[Add who you partnered with — PMs, engineers, UX research, etc.]",
      ],
    },
    {
      heading: "Problem space",
      paragraphs: [
        "[Add the usability issues with the existing form and their business impact.]",
      ],
    },
    {
      heading: "Design process",
      subsections: [
        {
          label: "[Step 1 label]",
          text: "[Describe your research approach — audits, interviews, analytics.]",
        },
        {
          label: "[Step 2 label]",
          text: "[Describe how you redesigned the form.]",
        },
        {
          label: "[Step 3 label]",
          text: "[Describe usability testing and iteration.]",
        },
      ],
    },
    {
      heading: "Testing results",
      bullets: [
        "[Add a testing finding]",
        "[Add a testing finding]",
        "[Add a testing finding]",
      ],
    },
    {
      heading: "Project impact",
      paragraphs: ["[Add outcomes, metrics, or launch results.]"],
    },
  ],
};

export const standardizingMoneyMovement: CaseStudy = {
  eyebrow: "STASH · B2C · Case Study",
  title: "Standardizing Money Movement Flows",
  sections: [
    {
      heading: "Overview",
      paragraphs: [
        "Developed a unified UI pattern for money movement flows across Stash, replacing inconsistent information hierarchy and layouts across features with one predictable pattern. Part of a broader initiative to establish platform parity across web, iOS, and Android.",
      ],
    },
    {
      heading: "Project team",
      paragraphs: [
        "Partnered with head of content design and design systems team.",
      ],
    },
    {
      heading: "Problem space",
      paragraphs: [
        "Our users are interacting with our app in different ways dependent on their device. This is a result of previously siloed teams and workflows. In addition to lack of platform parity, we have many UI patterns to accomplish similar tasks. For example, we have 3 different flows with for adding money to the platform.",
        <>
          To learn more about our design system, check out this{" "}
          <a
            href="https://www.figma.com/customers/how-stash-builds-financial-products-customers-trust/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-coral underline hover:no-underline"
          >
            Stash X Figma case study
          </a>
          .
        </>,
      ],
      images: [
        {
          src: "/images/mm-buy.png",
          alt: "Add cash screen showing an amount field, funding source, and destination account.",
          width: 800,
          height: 1731,
        },
        {
          src: "/images/mm-cash.png",
          alt: "Buy US Treasury Income screen with an amount field and funding source selector.",
          width: 800,
          height: 1731,
        },
        {
          src: "/images/mm-transfer.png",
          alt: "Transfer screen showing a from account, to account, and amount field.",
          width: 800,
          height: 1731,
        },
      ],
    },
    {
      heading: "Design process",
      subsections: [
        {
          label: "1. Establish understanding of the current landscape",
          text: "Audited every existing money movement flow across platforms to see where they diverged.",
          image: {
            src: "/images/mm-research.png",
            alt: "Audit of existing money movement flows across platforms, highlighting where they diverged.",
            width: 1892,
            height: 910,
          },
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
