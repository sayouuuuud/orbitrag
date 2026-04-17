import type { ContentMap } from "@/lib/content"

export function Nav({ content }: { content: ContentMap }) {
  const domain = content.domain_name || "orbitrag.com"
  const [name, tld] = domain.includes(".") ? domain.split(/\.(?=[^.]+$)/) : [domain, ""]
  return (
    <header className="relative z-20 border-b border-border">
      <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-6 py-5 md:px-10">
        <a
          href="#top"
          className="font-mono text-[11px] uppercase tracking-label text-foreground"
        >
          {name}
          <span className="text-accent">.</span>
          {tld}
        </a>

        <div className="hidden font-mono text-[11px] uppercase tracking-label text-muted md:block">
          Lot 001 — Private Listing
        </div>

        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-label text-muted">
          <span
            aria-hidden="true"
            className="pulse-dot inline-block h-1.5 w-1.5 bg-accent"
          />
          <span className="text-foreground">Available</span>
        </div>
      </div>
    </header>
  )
}
