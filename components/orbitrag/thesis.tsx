import type { ContentMap } from "@/lib/content"

export function Thesis({ content }: { content: ContentMap }) {
  const title = content.thesis_title || "A name for retrieval."
  const body = content.thesis_body || ""

  const paragraphs = body.split(/\n+/).map((p) => p.trim()).filter(Boolean)

  return (
    <section className="border-b border-border bg-surface">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-12 gap-6 px-6 py-24 md:px-10 md:py-40">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-muted">
            <span className="h-px w-8 bg-border-strong" />
            <span>[ 03 / Thesis ]</span>
          </div>

          <h2 className="mt-10 font-serif text-5xl leading-[0.95] tracking-display text-foreground md:text-6xl">
            {title}
          </h2>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7">
          <div className="space-y-8 text-pretty text-lg leading-relaxed text-foreground md:text-xl">
            {paragraphs.length > 0 ? (
              paragraphs.map((p, i) => (
                <p key={i} className={i === paragraphs.length - 1 ? "text-muted" : ""}>
                  {p}
                </p>
              ))
            ) : (
              <p className="text-muted">{body}</p>
            )}
          </div>

          <div className="mt-12 border-t border-border pt-8 font-mono text-[11px] uppercase tracking-label text-muted">
            <span className="text-foreground">Best fit —</span>{" "}
            AI infrastructure · vector search · retrieval tooling · agents · research
          </div>
        </div>
      </div>
    </section>
  )
}
