import type { ContentMap } from "@/lib/content"

export function Footer({ content }: { content: ContentMap }) {
  const domain = content.domain_name || "orbitrag.com"
  const [name, tld] = domain.includes(".") ? domain.split(/\.(?=[^.]+$)/) : [domain, ""]
  const ownerEmail = content.owner_email || "owner@orbitrag.com"
  const price = content.price || "$400"

  return (
    <footer className="relative overflow-hidden bg-background">
      <div className="mx-auto w-full max-w-[1440px] px-6 pt-24 md:px-10 md:pt-32">
        <div className="grid grid-cols-12 gap-6 border-b border-border pb-16">
          <div className="col-span-12 md:col-span-6">
            <p className="max-w-[40ch] font-serif text-3xl italic leading-[1.15] text-foreground md:text-4xl">
              A domain is a promise you make to the future — that when someone types it,
              something will be there.
            </p>
          </div>

          <div className="col-span-6 md:col-span-3 md:col-start-8">
            <div className="font-mono text-[11px] uppercase tracking-label text-muted">
              Contact
            </div>
            <ul className="mt-4 space-y-2 font-mono text-sm text-foreground">
           
              <li>
                <a
                  href="#acquire"
                  className="transition-colors duration-200 hover:text-accent"
                >
                  Make offer
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-2">
            <div className="font-mono text-[11px] uppercase tracking-label text-muted">
              Listing
            </div>
            <ul className="mt-4 space-y-2 font-mono text-sm text-foreground">
              <li>Ref · ORB-001</li>
              <li>Status · Available</li>
              <li>Price · {price}</li>
            </ul>
          </div>
        </div>

        {/* Giant wordmark */}
        <div className="relative -mx-2 flex items-center justify-center py-12 md:py-16">
          <h2
            aria-hidden="true"
            className="font-serif leading-[0.8] tracking-hero text-foreground"
            style={{ fontSize: "clamp(4rem, 22vw, 22rem)" }}
          >
            {name}
            {tld && (
              <>
                <span className="text-accent">.</span>
                <span className="font-serif-italic text-muted">{tld}</span>
              </>
            )}
          </h2>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 font-mono text-[11px] uppercase tracking-label text-muted">
          <span>© 2026 · {domain} — private listing</span>
          <span>Not affiliated with any registrar</span>
          <span>Designed as a single-purpose page</span>
        </div>
      </div>
    </footer>
  )
}
