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

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-[900px] px-6 pb-24 sm:px-10">
      <div className="grid items-center gap-10 sm:grid-cols-2">
        <div className="order-2 sm:order-1">
          <h2 className="font-display text-3xl text-ink">
            Hi I&apos;m Anjana 👋🏾
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Studied Business/Comp Sci, started out in web dev, ended up in
            design (thank goodness!). I am a generalist with 6+ YOE in
            Fintech and Edtech across B2B and B2C products. Grew up in ATL
            but now based in Jersey City and I am here to stay!
          </p>

          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
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
                className="flex w-24 shrink-0 flex-col items-center gap-2 text-center"
              >
                <Image src={fact.icon} alt="" width={56} height={56} />
                <span className="text-xs text-ink-soft">{fact.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
