import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:bg-cream focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink focus:shadow-lg"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" className="pt-24">
        <Hero />
        <WorkGrid />
        <About />
      </main>
      <ContactFooter />
    </>
  );
}
