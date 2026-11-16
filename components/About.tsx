"use client";

import Image from "next/image";
import { smoothScrollTo } from "@/lib/scrollTo";

const funFacts = [
  { icon: "/images/flex.svg", label: "At the gym" },
  { icon: "/images/plate.svg", label: "Trying new restaurants" },
  { icon: "/images/shopping.svg", label: "Thrifting and going to sample sales" },
  { icon: "/images/plane.svg", label: "On a plane" },
  { icon: "/images/tzu.svg", label: "Petting a dog" },
  { icon: "/images/sewing.svg", label: "Acquiring another crafty hobby" },
];

const experience = [
  { company: "Quizlet", role: "Senior Product Designer", dates: "Mar 2025 – Jun 2026" },
  { company: "Stash", role: "Senior Product Designer", dates: "Jun 2022 – Oct 2024" },
  { company: "Morgan Stanley", role: "Senior UX Designer", dates: "Jan 2022 – May 2022" },
  { company: "IHS Markit", role: "UX Designer", dates: "Dec 2019 – Jan 2022" },
];

const certificates = [
  { name: "Prototyping with AI", issuer: "IDEO U" },
  {
    name: "Visual Design: The Ultimate Guide",
    issuer: "Interaction Design Foundation",
  },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[900px] px-6 pb-24 sm:px-10">
      <div className="grid items-center gap-10 sm:grid-cols-2">
        <div className="order-2 sm:order-1">
          <h2 className="font-display text-3xl text-ink">
            Hi I&apos;m Anjana 👋🏾
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Most recently, I designed monetization experiences at{" "}
            <a
              href="https://quizlet.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover-lift inline-block font-bold text-coral"
            >
              Quizlet
            </a>
            . Before that, I spent most of my 7 years in product design in
            fintech, from consumer money features to complex B2B platforms.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            I have a bias toward action and like getting work shipped without
            letting the quality of the experience slip. I studied business and
            computer science and started out as a web developer, so I
            understand the goals and tradeoffs my product and engineering
            partners are working with.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            I see AI as a tool for both speed and quality. It lets me explore
            more directions and prototype in code, so more of my time goes to
            the judgment calls that make an experience good. I mostly work in
            Claude Code and Claude Design.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Originally from ATL, now based in Jersey City and here to stay!
            Interested in working with me?{" "}
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                smoothScrollTo("contact");
              }}
              className="hover-lift inline-block font-bold text-coral"
            >
              Let&apos;s talk.
            </a>
          </p>
        </div>

        <div className="relative order-1 mx-auto h-72 w-72 sm:order-2 sm:justify-self-end">
          <div className="relative h-full w-full overflow-hidden rounded-full bg-ink-soft/20">
            <Image
              src="/images/headshot.jpg"
              alt="Portrait of Anjana"
              fill
              sizes="288px"
              className="object-cover object-[50%_25%]"
              priority
            />
          </div>
          <div className="absolute -bottom-6 -right-6 h-[123px] w-[123px]">
            <Image
              src="/images/about-flowers.svg"
              alt=""
              fill
              sizes="123px"
              className="object-contain"
            />
          </div>
        </div>
      </div>

      <div className="mt-12">
        <p className="text-sm text-ink">
          When I&apos;m not at my desk I&apos;m...
        </p>
        <div className="carousel-mask mt-5 overflow-hidden">
          <div className="carousel-track flex w-max gap-[38px]">
            {[...funFacts, ...funFacts].map((fact, i) => (
              <div
                key={`${fact.label}-${i}`}
                // The second set only exists for the seamless loop.
                aria-hidden={i >= funFacts.length || undefined}
                className="flex w-24 shrink-0 flex-col items-center gap-2 text-center"
              >
                <Image src={fact.icon} alt="" width={56} height={56} />
                <span className="text-xs text-ink-soft">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <p className="text-sm font-semibold text-ink">Experience</p>
        <ul className="mt-4 border-b border-ink-soft/15">
          {experience.map((job) => (
            <li
              key={job.company}
              className="flex flex-col gap-1 border-t border-ink-soft/15 py-3.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
            >
              <p className="text-sm text-ink">
                <span className="font-semibold">{job.company}</span>
                <span className="text-ink-soft"> · {job.role}</span>
              </p>
              <p className="text-[13px] tabular-nums text-ink-soft sm:shrink-0">
                {job.dates}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-3.5 text-[13px] text-ink-soft">
          Earlier: Popmenu, Cypress.io, and The Coca-Cola Company.
        </p>

        <div className="mt-9">
          <p className="text-sm font-semibold text-ink">Education</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Georgia Institute of Technology
            <br />
            B.S. Business Administration, minor in Computer Science
          </p>
        </div>

        <div className="mt-9">
          <p className="text-sm font-semibold text-ink">Certificates</p>
          <ul className="mt-2 space-y-1 text-sm leading-relaxed text-ink-soft">
            {certificates.map((cert) => (
              <li key={cert.name}>
                {cert.name} · {cert.issuer}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
