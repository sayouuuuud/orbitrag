import { ArrowUpRight } from "lucide-react"
import type { ContentMap } from "@/lib/content"
import { mailtoFor, normalizeExternalUrl, isExternal } from "@/lib/content"

function splitPrice(raw: string) {
  const match = raw.match(/([^\d]*)(\d[\d,.\s]*)/)
  if (!match) return { symbol: "$", number: raw }
  return { symbol: match[1].trim() || "$", number: match[2].trim() }
}

export function Acquire({ content }: { content: ContentMap }) {
  const domain = content.domain_name || "orbitrag.com"
  const { symbol, number } = splitPrice(content.price || "$400")
  const currency = content.price_currency || "USD"
  const primaryUrl = normalizeExternalUrl(content.cta_primary_url || "#acquire")
  const primaryLabel = content.cta_primary_label || "Acquire This Domain"
  const secondaryLabel = content.cta_secondary_label || "Contact Owner"
  const ownerEmail = content.owner_email || "owner@orbitrag.com"

  return (
    <section id="acquire" className="relative overflow-hidden border-b border-border">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-muted">
              <span className="h-px w-8 bg-border-strong" />
              <span>[ 05 / Acquire ]</span>
            </div>

            <h2 className="mt-10 font-serif text-6xl leading-[0.92] tracking-display text-foreground md:text-8xl">
              Take it{" "}
              <span className="font-serif-italic text-accent">home.</span>
            </h2>

            <p className="mt-8 max-w-[44ch] text-pretty text-lg leading-relaxed text-muted md:text-xl">
              One click. One wire. One transfer. The domain lives in your registrar by
              tomorrow morning. If escrow is preferred, we route through Escrow.com or
              Dan.com — buyer&apos;s choice.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5 md:col-start-8">
            <div className="border border-border bg-surface p-8 md:p-10">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-[11px] uppercase tracking-label text-muted">
                  Final price
                </span>
                <span className="font-mono text-[11px] uppercase tracking-label text-muted">
                  {currency} · fixed
                </span>
              </div>

              <div className="mt-4 flex items-baseline gap-3">
                <span className="font-mono text-sm text-muted">{symbol}</span>
                <span className="font-mono text-7xl font-normal tabular-nums tracking-tight text-foreground md:text-8xl">
                  {number}
                </span>
              </div>

              <div className="my-8 h-px w-full bg-border" />

              <dl className="space-y-4 font-mono text-[11px] uppercase tracking-label">
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Domain</dt>
                  <dd className="text-foreground">{domain}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Fees</dt>
                  <dd className="text-foreground">Seller pays escrow</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Transfer window</dt>
                  <dd className="text-foreground">{"< 24 hours"}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Ownership</dt>
                  <dd className="text-foreground">Full · perpetual</dd>
                </div>
              </dl>

              <a
                href={primaryUrl}
                target={isExternal(primaryUrl) ? "_blank" : undefined}
                rel={isExternal(primaryUrl) ? "noopener noreferrer" : undefined}
                className="group mt-10 flex w-full items-center justify-between border border-accent bg-accent px-5 py-5 font-mono text-[11px] uppercase tracking-label text-accent-foreground transition-all duration-200 hover:bg-foreground hover:border-foreground hover:text-background"
              >
                <span>{primaryLabel}</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>

              <a
                href={mailtoFor(ownerEmail, domain)}
                className="group mt-3 flex w-full items-center justify-between border border-border px-5 py-5 font-mono text-[11px] uppercase tracking-label text-foreground transition-colors duration-200 hover:border-foreground"
              >
                <span>{secondaryLabel}</span>
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </a>

              <p className="mt-5 max-w-[40ch] font-mono text-[11px] leading-relaxed text-muted">
                Serious inquiries only. The listing is private and will be pulled the
                moment it sells.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
