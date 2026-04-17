import { ArrowUpRight } from "lucide-react"
import { OrbitRing } from "./orbit-ring"
import type { ContentMap } from "@/lib/content"
import { mailtoFor, normalizeExternalUrl, isExternal } from "@/lib/content"

function splitPrice(raw: string) {
  const match = raw.match(/([^\d]*)(\d[\d,.\s]*)/)
  if (!match) return { symbol: "$", number: raw }
  return { symbol: match[1].trim() || "$", number: match[2].trim() }
}

export function Hero({ content }: { content: ContentMap }) {
  const domain = content.domain_name || "orbitrag.com"
  const [name, tld] = domain.includes(".") ? domain.split(/\.(?=[^.]+$)/) : [domain, ""]
  const { symbol, number } = splitPrice(content.price || "$400")
  const currency = content.price_currency || "USD"
  const primaryUrl = normalizeExternalUrl(content.cta_primary_url || "#acquire")
  const primaryLabel = content.cta_primary_label || "Acquire This Domain"
  const secondaryLabel = content.cta_secondary_label || "Contact Owner"
  const ownerEmail = content.owner_email || "owner@orbitrag.com"

  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-border"
    >
      <OrbitRing className="left-1/2 top-1/2 h-[140vh] w-[140vh] -translate-x-1/2 -translate-y-1/2 opacity-60" />

      <div className="relative mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-6 px-6 py-24 md:px-10 md:py-40">
        {/* Left: eyebrow + headline */}
        <div className="col-span-12 lg:col-span-8">
          <div className="rise-in [animation-delay:0ms] flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-muted">
            <span className="h-px w-8 bg-border-strong" />
            <span>[ 01 / {content.hero_eyebrow || "Domain acquisition"} ]</span>
          </div>

          <h1 className="rise-in [animation-delay:80ms] mt-10 font-serif tracking-hero text-foreground leading-[0.88]"
              style={{ fontSize: "var(--text-hero)" }}>
            {name}
            {tld && (
              <>
                <span className="text-accent">.</span>
                <span className="font-serif-italic text-muted">{tld}</span>
              </>
            )}
          </h1>

          <p className="rise-in [animation-delay:160ms] mt-10 max-w-[52ch] text-pretty text-lg leading-relaxed text-muted md:text-xl">
            {content.hero_subhead}
          </p>

          {/* RAG decoding chip */}
          <div className="rise-in [animation-delay:200ms] mt-10 inline-flex flex-wrap items-center gap-x-3 gap-y-2 border border-border bg-surface/60 px-4 py-3 font-mono text-[11px] uppercase tracking-label text-muted backdrop-blur-sm">
            <span className="text-foreground">rag</span>
            <span className="text-border-strong">/</span>
            <span>
              <span className="text-foreground">r</span>etrieval
            </span>
            <span className="text-border-strong">·</span>
            <span>
              <span className="text-foreground">a</span>ugmented
            </span>
            <span className="text-border-strong">·</span>
            <span>
              <span className="text-foreground">g</span>eneration
            </span>
            <span className="ml-1 inline-block h-2 w-2 bg-accent pulse-dot" />
          </div>
        </div>

        {/* Right: price card */}
        <aside className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="rise-in [animation-delay:240ms] border border-border bg-surface/60 p-8 backdrop-blur-sm">
            <div className="font-mono text-[11px] uppercase tracking-label text-muted">
              Asking price — {currency}
            </div>

            <div className="mt-6 flex items-baseline gap-2">
              <span className="font-mono text-[11px] uppercase tracking-label text-muted">
                {symbol}
              </span>
              <span className="font-mono text-6xl font-normal tabular-nums tracking-tight text-foreground md:text-7xl">
                {number}
              </span>
            </div>

            <div className="mt-2 font-mono text-[11px] uppercase tracking-label text-muted">
              One-time · Instant transfer
            </div>

            <div className="my-8 h-px w-full bg-border" />

            <a
              href={primaryUrl}
              target={isExternal(primaryUrl) ? "_blank" : undefined}
              rel={isExternal(primaryUrl) ? "noopener noreferrer" : undefined}
              className="group flex w-full items-center justify-between border border-foreground bg-foreground px-5 py-4 font-mono text-[11px] uppercase tracking-label text-background transition-colors duration-200 hover:bg-accent hover:border-accent hover:text-accent-foreground"
            >
              <span>{primaryLabel}</span>
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>

            <a
              href={mailtoFor(ownerEmail, domain)}
              className="mt-3 flex w-full items-center justify-between border border-border px-5 py-4 font-mono text-[11px] uppercase tracking-label text-foreground transition-colors duration-200 hover:border-foreground"
            >
              <span>{secondaryLabel}</span>
              <span className="text-muted">→</span>
            </a>

            <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-label">
              <div>
                <div className="text-muted">Escrow</div>
                <div className="mt-1 text-foreground">Dan.com / Escrow.com</div>
              </div>
              <div>
                <div className="text-muted">Transfer</div>
                <div className="mt-1 text-foreground">{"< 24h"}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Footer meta row of hero */}
      <div className="relative border-t border-border">
        <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-4 px-6 py-4 font-mono text-[11px] uppercase tracking-label text-muted md:px-10">
          <span>Registrar · Atom</span>
          <span className="hidden md:inline">Listed · 2026</span>
          <span className="hidden md:inline">.com · TLD</span>
          <span>Ref · ORB-001</span>
        </div>
      </div>
    </section>
  )
}
