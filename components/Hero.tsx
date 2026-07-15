"use client";

import Image from "next/image";
import { smoothScrollTo } from "@/lib/scrollTo";

export default function Hero() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1200px] items-center px-6 sm:px-10">
      <div className="grid w-full gap-10 lg:gap-0">
        <div className="max-w-[800px] lg:col-start-1 lg:row-start-1 lg:ml-[59px] lg:max-w-[min(800px,calc(100vw_-_589px))] lg:self-start lg:pl-[6%]">
          <h1 className="text-center font-display text-[32px] leading-snug text-ink sm:text-[45px] lg:text-left">
            NJ based senior product designer with 7 years of experience.
            Passionate about building delightful solutions with a practical
            lens.
          </h1>
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo("work");
            }}
            className="hover-lift mx-auto mt-6 flex w-fit items-center gap-1.5 rounded-full bg-coral px-6 py-3 text-sm font-medium text-cream hover:bg-coral-dark lg:mx-0 lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0 lg:text-[28px] lg:text-coral lg:hover:bg-transparent lg:hover:text-coral-dark"
          >
            See my work <span aria-hidden>→</span>
          </a>
        </div>

        <div className="relative mx-auto h-[186px] w-[186px] sm:h-[233px] sm:w-[233px] lg:col-start-1 lg:row-start-1 lg:mx-0 lg:mt-0 lg:mr-[59px] lg:h-[369px] lg:w-[369px] lg:justify-self-end lg:self-end">
          <Image
            src="/images/flowers.png"
            alt=""
            fill
            sizes="(min-width: 1024px) 369px, (min-width: 640px) 233px, 186px"
            className="object-contain -rotate-90"
            priority
          />
        </div>
      </div>
    </section>
  );
}
