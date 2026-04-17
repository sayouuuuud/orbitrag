const cases = [
  {
    n: "01",
    k: "AI Infrastructure",
    t: "A vector database, embedding service, or retrieval layer. Technical enough to signal depth, soft enough to be a consumer product.",
  },
  {
    n: "02",
    k: "Agent platform",
    t: "Agents orbit a task, gather context, return with an answer. The metaphor is already in the name.",
  },
  {
    n: "03",
    k: "Research tool",
    t: "A legal, scientific, or financial research product where the core loop is query → retrieve → synthesize.",
  },
]

export function UseCases() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto w-full max-w-[1440px] px-6 py-24 md:px-10 md:py-40">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-label text-muted">
          <span className="h-px w-8 bg-border-strong" />
          <span>[ 04 / Fit ]</span>
        </div>

        <h2 className="mt-8 max-w-[20ch] text-balance font-serif text-5xl leading-[0.95] tracking-display text-foreground md:text-6xl">
          What it could{" "}
          <span className="font-serif-italic text-accent">become.</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {cases.map((c) => (
            <article
              key={c.n}
              className="group relative bg-background p-8 transition-colors duration-300 hover:bg-surface md:p-10"
            >
              <div className="flex items-start justify-between">
                <span className="font-mono text-[11px] uppercase tracking-label text-muted">
                  {c.k}
                </span>
                <span className="font-mono text-sm tabular-nums text-accent">
                  {c.n}
                </span>
              </div>

              <h3 className="mt-16 font-serif text-3xl leading-[1.05] tracking-display text-foreground md:text-4xl">
                {c.t.split(".")[0]}.
              </h3>

              <p className="mt-6 max-w-[36ch] text-pretty leading-relaxed text-muted">
                {c.t.split(".").slice(1).join(".").trim()}
              </p>

              <div className="mt-10 h-px w-8 bg-border-strong transition-all duration-300 group-hover:w-24 group-hover:bg-accent" />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
