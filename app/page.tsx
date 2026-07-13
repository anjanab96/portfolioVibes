import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import ContactFooter from "@/components/ContactFooter";

export default function Home() {
  return (
    <>
      <Header />
      <main className="pt-24">
        <Hero />
        <WorkGrid />
        <About />
      </main>
      <ContactFooter />
    </>
  );
}
