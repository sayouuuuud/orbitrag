import type { ContentMap } from "@/lib/content"

export function Specs({ content }: { content: ContentMap }) {
  const domain = content.domain_name || "orbitrag.com"
  const [name, tld] = domain.includes(".") ? domain.split(/\.(?=[^.]+$)/) : [domain, ""]
  const rows = [
    { n: "01", k: "Name", v: name },
    { n: "02", k: "Extension", v: tld ? `.${tld}` : "—" },
    { n: "03", k: "Characters", v: String(name.length).padStart(2, "0") },
    { n: "04", k: "Syllables", v: "03" },
    { n: "05", k: "Pronunciation", v: "/ˈɔːr.bɪt.ræɡ/" },
    { n: "06", k: "Trademark", v: "Clear · no known conflicts" },
    { n: "07", k: "Prior use", v: "None · fresh registration" },
    { n: "08", k: "Social handles", v: "Available · X, GitHub, IG" },
  ]

  return (
    <section
      id="details"
      className="border-b border-border"
    >
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-muted">
              <span className="h-px w-8 bg-border-strong" />
              <span>[ 02 / The lot ]</span>
            </div>
            <h2 className="mt-8 font-serif text-5xl leading-[0.95] tracking-display text-foreground md:text-6xl">
              A single,{" "}
              <span className="font-serif-italic text-accent">unencumbered</span>{" "}
              asset.
            </h2>
            <p className="mt-6 max-w-[40ch] text-pretty leading-relaxed text-muted">
              Registered clean. Never parked, never developed, never burned on a failed
              project. What you acquire is a name — and a runway.
            </p>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <dl className="divide-y divide-border border-y border-border">
              {rows.map((r) => (
                <div
                  key={r.n}
                  className="grid grid-cols-12 gap-4 py-5 transition-colors duration-200 hover:bg-surface"
                >
                  <dt className="col-span-2 font-mono text-[11px] uppercase tracking-label text-muted md:col-span-1">
                    {r.n}
                  </dt>
                  <dt className="col-span-4 font-mono text-[11px] uppercase tracking-label text-muted md:col-span-4">
                    {r.k}
                  </dt>
                  <dd className="col-span-6 font-mono text-sm text-foreground md:col-span-7">
                    {r.v}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
