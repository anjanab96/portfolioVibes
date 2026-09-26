import type { ReactNode } from "react";

export type CaseStudyImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  fullBleed?: boolean;
  widthPercent?: number;
};

export type CaseStudySection = {
  heading: string;
  paragraphs?: ReactNode[];
  subsections?: {
    label: string;
    text: string;
    image?: CaseStudyImage;
    images?: CaseStudyImage[];
    imageStack?: CaseStudyImage[];
    carousel?: CaseStudyImage[];
  }[];
  bullets?: string[];
  // Headline metrics shown as a row of cards.
  stats?: {
    value: string;
    label: string;
  }[];
  image?: CaseStudyImage;
  images?: CaseStudyImage[];
  carousel?: CaseStudyImage[];
  video?: { src: string };
};

// Missing fields render as a placeholder in the modal.
export type CaseStudyMetadata = {
  team?: string;
  timeline?: string;
  platform?: string;
  userGroup?: string;
};

export type CaseStudy = {
  eyebrow: string;
  title: string;
  // One-line summary shown under the title in the modal header.
  overview: ReactNode;
  // Shown under the header; a placeholder renders until one is added.
  heroImage?: CaseStudyImage;
  metadata: CaseStudyMetadata;
  sections: CaseStudySection[];
};

export const bankOperationsTooling: CaseStudy = {
  eyebrow: "STASH · B2B · Case Study",
  title: "Banking Dispute Tooling",
  heroImage: {
    src: "/images/break-hero-v2.webp",
    alt: "Line item detail view layered over the MOM Portal table of resolved dispute items",
    width: 2000,
    height: 1125,
  },
  overview: (
    <>
      Building out{" "}
      <a
        href="https://www.stash.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover-lift inline-block font-bold text-coral"
      >
        Stash
      </a>
      's debit dispute tooling ecosystem 0→1, sparked by our sponsor bank
      transition and a push to bring operations tooling in-house.
    </>
  ),
  metadata: {
    team: "2 PMs, 2 Eng Leads, Compliance",
    timeline: "4 months",
    platform: "Desktop",
    userGroup: "Internal banking operation agents",
  },
  sections: [
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
        src: "/images/break-diagram-v2.png",
        alt: "Diagram showing the settlement file from Mastercard and the internal ledger from Mambu feeding into Duco, which generates a daily break list. There are 2 types of breaks: a transaction exists in one file but not the other, or it exists in both files but the dollar amounts don't match.",
        width: 2400,
        height: 1000,
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
          text: "There are two flavors of breaks: ACH and Debit. There are slight nuances to how each one is investigated, uncovered via stakeholder interviews. The flows below show one example of how an investigation of each type can go. The exact steps vary from break to break.",
          image: {
            src: "/images/break-process-flow.png",
            alt: "Flow diagram of example ACH and debit card break investigations. ACH: Duco flags a break, the KAOS team searches Datadog while ops agents filter Mambu by hand, both confirm the transaction is in both files, and the result is no error. Debit card: Duco flags a break, then Mambu, Datadog, and the settlement file in AWS S3 show the difference is interchange income, so it is not a real break. Each break takes 5+ minutes to investigate, across 34 to 242 breaks a week.",
            width: 2400,
            height: 1660,
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
      stats: [
        {
          value: "-95%",
          label: "Engineering effort, from 20 hours/week to ~1 hour/week",
        },
        {
          value: "0%",
          label: "Reconciliation error rate, down from 24%",
        },
        {
          value: "4x",
          label: "Faster break research, from 20 minutes to 5 per break",
        },
      ],
      image: {
        src: "/images/break-prototype.gif",
        alt: "Prototype walkthrough of the break resolution tool.",
        width: 1152,
        height: 648,
        fullBleed: true,
      },
    },
  ],
};

export const addingFamilyPlan: CaseStudy = {
  eyebrow: "QUIZLET · B2C · Case Study",
  title: "Adding a Family Plan",
  heroImage: {
    src: "/images/family-plan-hero.webp",
    alt: "Quizlet Family invite screen on mobile alongside the Quizlet plans page with the Family plan highlighted",
    width: 2000,
    height: 1125,
  },
  overview: (
    <>
      Designed the end-to-end experience for{" "}
      <a
        href="https://quizlet.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="hover-lift inline-block font-bold text-coral"
      >
        Quizlet
      </a>
      's new family plan offering, including the plans page, checkout
      flow, and plan management.
    </>
  ),
  metadata: {
    team: "Lead designer, PM, Eng lead, UXR, Content Design",
    timeline: "7 months",
    platform: "Desktop, iOS, Android",
    userGroup: "Undergraduate students, ages 18–24",
  },
  sections: [
    {
      heading: "Problem space",
      paragraphs: [
        "Many similar consumer subscription products already offer family plans, giving users a way to share access friends and family at a lower combined cost. Given how price-sensitive Quizlet's user base is, a family plan offered a way to make subscriptions more affordable while increasing retention.",
      ],
    },
    {
      heading: "Initial research",
      paragraphs: [
        "We concept tested group subscription plans with both free users and paid subscribers to understand how they perceived shared plans and who they'd realistically share with. Contrary to the \"family plan\" framing, we learned users were far more likely to share with classmates and friends than with household or family members.",
      ],
    },
    {
      heading: "Design approach",
      paragraphs: [
        "Given the timeline pressure to ship before spring semester began, I skipped low-fidelity exploration and went straight to high-fidelity mockups, leveraging existing UI patterns from group order management and settings flows to speed up implementation.",
      ],
    },
    {
      heading: "Usability testing",
      paragraphs: [
        "After iterating on design with feedback from design critique and executive stakeholders, I conducted another round of research. I ran unmoderated usability testing with both free users and subscribers, focused specifically on activation, making sure users could successfully invite others to join their plan.",
      ],
    },
    {
      heading: "Project impact",
      stats: [
        { value: "1%", label: "Overall increase in revenue" },
        {
          value: "0.4%",
          label: "Share of subscription revenue from the family plan",
        },
        { value: "90%", label: "Checkout conversion for the family plan" },
      ],
      video: { src: "/videos/fp-proto.mp4" },
    },
  ],
};

export const dataAutomationRules: CaseStudy = {
  eyebrow: "S&P GLOBAL · B2B · Case Study",
  title: "Data Automation Rules",
  heroImage: {
    src: "/images/automation-hero.webp",
    alt: "iLEVEL Set Current & Latest rules table with the Define Rules modal open over it",
    width: 2000,
    height: 1125,
  },
  overview: (
    <>
      Optimized back-office workflows in{" "}
      <a
        href="https://www.spglobal.com/market-intelligence/en/solutions/products/ilevel"
        target="_blank"
        rel="noopener noreferrer"
        className="hover-lift inline-block font-bold text-coral"
      >
        iLEVEL
      </a>{" "}
      by designing a single automation rule to manage date progression
      across all related entities, replacing a process that previously
      required manual, entity-by-entity rules.
    </>
  ),
  metadata: {
    team: "Product manager, Eng Lead",
    timeline: "8 months",
    platform: "Desktop",
    userGroup: "Back office finance teams",
  },
  sections: [
    {
      heading: "Problem space",
      paragraphs: [
        "Every entity in iLEVEL tracks two dates, current period and latest period, that can be advanced automatically via a rule rather than manually. Previously, each entity needed its own rule; the goal was a single rule that advances all entities in a hierarchy (Related Entities) together.",
      ],
      image: {
        src: "/images/automation-diagram.png",
        alt: "Diagram showing how current period and latest period dates advance across a hierarchy of related entities.",
        width: 721,
        height: 279,
      },
    },
    {
      heading: "Design process",
      subsections: [
        {
          label: "Design constraints",
          text: "All changes had to fit within the existing modal, with minimal alteration to a process users were already comfortable with, since this automation is just one part of their daily responsibilities and we wanted to avoid unnecessary relearning.",
        },
        {
          label: "Workflow abstraction",
          text: "I mapped the current process as a flow chart to abstract it from the UI, letting me brainstorm workflow solutions for related entities without committing to visual design. From there, I generated multiple approaches and worked with product owners to select the best one based on release timeline and development resources.",
          image: {
            src: "/images/automation-flows.png",
            alt: "Flow chart mapping the current automation process, abstracted from the UI to explore workflow solutions.",
            width: 4817,
            height: 5957,
          },
        },
        {
          label: "Design iterations",
          text: "I began with low fidelity sketches on an iPad, then moved on to higher fidelity mockups on Figma. At this point, the team did not have a design system to pull from, so it was important for me to keep in mind that any new UI elements that I introduce to these screens would need to be consistent with the visual style of the existing product. I initially iterated based on feedback from product owners and stakeholders. Later we also included developers in the conversation and made changes based on feasibility and level of effort.",
        },
      ],
    },
    {
      heading: "Final deliverables",
      paragraphs: [
        "The final deliverables for this project were high fidelity wireframes in Figma. I worked with developers throughout the implementation of this feature to help with visual QA and edge cases. This feature successfully shipped in July 2020 and has received positive feedback from both clients and internal users.",
        "Based on data from Pendo:",
      ],
      stats: [
        { value: "20", label: "Clients using the feature" },
        { value: "24", label: "Unique visitors" },
        {
          value: "55–60",
          label: "Automation rules created with related entities",
        },
      ],
      carousel: [
        {
          src: "/images/automation-dash.png",
          alt: "Dashboard view of the automation rules feature.",
          width: 1368,
          height: 912,
        },
        {
          src: "/images/automation-1.png",
          alt: "Automation rule configuration screen, view 1.",
          width: 956,
          height: 688,
        },
        {
          src: "/images/automation-2.png",
          alt: "Automation rule configuration screen, view 2.",
          width: 956,
          height: 688,
        },
        {
          src: "/images/automation-page.png",
          alt: "Full page view of the shipped automation rules feature.",
          width: 956,
          height: 682,
        },
      ],
    },
  ],
};

export const optimizingFormDesign: CaseStudy = {
  eyebrow: "S&P GLOBAL · B2B · Case Study",
  title: "Optimizing Form Design",
  heroImage: {
    src: "/images/form-hero.webp",
    alt: "iLEVEL Monthly Financials Request upload form on desktop alongside the same request on mobile",
    width: 2000,
    height: 1125,
  },
  overview: (
    <>
      Redesigned{" "}
      <a
        href="https://www.spglobal.com/market-intelligence/en/solutions/products/ilevel"
        target="_blank"
        rel="noopener noreferrer"
        className="hover-lift inline-block font-bold text-coral"
      >
        iLEVEL
      </a>
      's data upload experience, one of the platform's most critical and
      heavily used features, replacing an outdated flow so unpolished
      that clients built workarounds just to avoid exposing their
      portfolio companies to it.
    </>
  ),
  metadata: {
    team: "2 PMs, 2 Eng Leads",
    timeline: "6 months",
    platform: "Desktop and iOS",
    userGroup: "Back office finance teams",
  },
  sections: [
    {
      heading: "About the product",
      paragraphs: [
        "iLEVEL is a tool that companies in the Private Equity and Venture Capital space utilize to track and analyze their investments. It provides methods of data collection that help upload information to iLEVEL, and also offers tools for creating a dashboard and visualizations to monitor the performance of a client's investments.",
      ],
    },
    {
      heading: "Problem space",
      paragraphs: [
        "The data upload experience is one of the most important areas of the iLEVEL platform. It is one of the most popular ways that our clients collect and load data from their portfolio companies into iLEVEL. Without data, the capabilities of the product are useless, so this is a critical feature area. The current experience is outdated and causes our clients to create strange workarounds to avoid exposing their portfolio companies to this experience. The goal of this project was to reimagine this process and turn it into an experience that clients would be comfortable showing to their portfolio companies.",
      ],
    },
    {
      heading: "Design process",
      subsections: [
        {
          label: "Initial research",
          text: "Since data upload is one of iLEVEL's most critical features, I conducted stakeholder interviews with end users to understand pain points with the existing system, and combed through our Salesforce database of client feedback to consolidate related feature requests and complaints.",
        },
        {
          label: "Initial designs",
          text: "Based on our research, I explored a few different design directions. However, after guerilla testing the new explorations with internal users, our design solution was invalidated and we went back to the drawing board. There was a negative reaction to the side panel design, as well as the progress bar/table of contents hybrid. Many stakeholders felt that it wasn't enough of a departure from our current page, and may make the reveal of the redesign underwhelming. Several participants also worried that the table of contents area would have too much white space in 90% of use cases.",
          carousel: [
            {
              src: "/images/form-design-1.png",
              alt: "Initial design exploration with a side panel showing request details.",
              width: 1368,
              height: 912,
            },
            {
              src: "/images/form-design-2.png",
              alt: "Initial design exploration with a progress bar and table of contents hybrid.",
              width: 800,
              height: 533,
            },
            {
              src: "/images/form-design-3.png",
              alt: "Initial design exploration with request details inline above the form.",
              width: 800,
              height: 533,
            },
          ],
        },
        {
          label: "Usability testing",
          text: "After iterating based on results from guerilla testing, I prepared a prototype with the new designs to conduct formal usability testing sessions. We wanted to keep the sessions around 45 minutes, so I wrote a script consisting of 5 tasks that encompassed the largest changes on the page. The product owner and I alternated facilitating the sessions which took place with 5 participants in total. I analyzed the findings and extracted a few key takeaways.",
          imageStack: [
            {
              src: "/images/form-research.png",
              alt: "Usability testing session notes and observations from the 5 participant sessions.",
              width: 2212,
              height: 1082,
            },
            {
              src: "/images/form-chart.png",
              alt: "Chart summarizing key usability testing findings and takeaways.",
              width: 1412,
              height: 1446,
            },
          ],
        },
      ],
    },
    {
      heading: "Final deliverables",
      paragraphs: [
        "The final deliverables for this project were clickable prototypes and high fidelity wireframes in Figma. Due to this redesign being a massive development effort, the new experience is being implemented in phases. I continued to work with development as questions arose during QA.",
      ],
      carousel: [
        {
          src: "/images/form-final-1.png",
          alt: "Final data upload design, view 1.",
          width: 1368,
          height: 912,
        },
        {
          src: "/images/form-final-2.png",
          alt: "Final data upload design, view 2.",
          width: 1368,
          height: 912,
        },
        {
          src: "/images/form-final-3.png",
          alt: "Final data upload design, view 3.",
          width: 1368,
          height: 912,
        },
        {
          src: "/images/form-final-4.png",
          alt: "Final data upload design, view 4.",
          width: 1368,
          height: 912,
        },
      ],
    },
  ],
};

export const standardizingMoneyMovement: CaseStudy = {
  eyebrow: "STASH · B2C · Case Study",
  title: "Standardizing Money Movement",
  heroImage: {
    src: "/images/mm-hero.webp",
    alt: "Three Stash invest screens: amount selection sheet on a Tesla stock page, amount keypad, and order review before buying TSLA",
    width: 2000,
    height: 1125,
  },
  overview: "Developed a unified UI pattern for money movement flows across Stash, replacing inconsistent information hierarchy and layouts across features with one predictable pattern. Part of a broader initiative to establish platform parity across web, iOS, and Android.",
  metadata: {
    team: "Content design lead, Design systems team",
    timeline: "2 months",
    platform: "Web, iOS, Android",
    userGroup: "Financial novices, internal designers",
  },
  sections: [
    {
      heading: "Problem space",
      paragraphs: [
        "Our users are interacting with our app in different ways dependent on their device. This is a result of previously siloed teams and workflows. In addition to lack of platform parity, we have many UI patterns to accomplish similar tasks. For example, we have 3 different flows for adding money to the platform.",
        <>
          To learn more about our design system, check out this{" "}
          <a
            href="https://www.figma.com/customers/how-stash-builds-financial-products-customers-trust/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover-lift inline-block font-bold text-coral"
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
          image: {
            src: "/images/mm-content.png",
            alt: "Framework outlining the shared content pattern used across money movement flows.",
            width: 2600,
            height: 1874,
          },
        },
        {
          label: "3. Iterate, iterate, iterate",
          text: "Refined the framework through multiple rounds of design critique and stakeholder feedback.",
        },
        {
          label: "4. Usability testing",
          text: "Validated the new flow with real users before rolling it out platform-wide.",
          image: {
            src: "/images/mm-roundRobin.png",
            alt: "Round robin usability testing setup used to validate the new money movement flow.",
            width: 1404,
            height: 1012,
            widthPercent: 90,
          },
        },
      ],
      stats: [
        { value: "4/4", label: "Users successfully completed the flow" },
        { value: "3/4", label: "Users understood how to change the frequency" },
        {
          value: "4/4",
          label: "Users navigated from the partial to the full experience",
        },
        {
          value: "3/4",
          label: "Users understood cash balance vs. linked funding source",
        },
      ],
    },
    {
      heading: "Final deliverables",
      paragraphs: [
        "I built a robust, high-quality component that contains every money movement flow screen — giving engineering a single source of truth to build from.",
      ],
      image: {
        src: "/images/mm-prototype.gif",
        alt: "Prototype walkthrough of the unified money movement flow component.",
        width: 1322,
        height: 1246,
        widthPercent: 65,
      },
    },
  ],
};
