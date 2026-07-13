import Image from "next/image";

const links = [
  {
    label: "Resume",
    href: "/resume.pdf",
    newTab: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path d="M12 3v12m0 0-4-4m4 4 4-4M5 21h14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "Email",
    href: "mailto:anjana.bala96@gmail.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
        <path d="M4 6h16v12H4V6Zm0 0 8 7 8-7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abala96",
    newTab: true,
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3 9h4v12H3V9Zm6.5 0H14v1.75c.7-1.1 2-2.05 4-2.05 3 0 4.5 1.7 4.5 5.3V21H18v-5.4c0-1.6-.6-2.6-2-2.6-1.2 0-1.9.8-2.2 1.6-.1.3-.1.6-.1 1V21H9.5V9Z" />
      </svg>
    ),
  },
];

export default function ContactFooter() {
  return (
    <footer id="contact" className="bg-olive text-cream">
      <div className="mx-auto flex min-h-[80vh] max-w-[1200px] flex-col items-center justify-center px-6 text-center sm:px-10">
        <div className="relative h-14 w-14 shrink-0">
          <Image src="/images/footerFlower.png" alt="" fill sizes="56px" className="object-contain" />
        </div>

        <h2 className="mt-4 font-display text-5xl sm:text-6xl">Get in touch</h2>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              {...(link.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="hover-lift flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-ink hover:bg-cream/90"
            >
              {link.icon}
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-cream/10 bg-cream py-5 text-center text-xs text-ink-soft">
        🍃 Powered by Figma, Claude Code, &amp; Vercel 🍃
      </div>
    </footer>
  );
}
