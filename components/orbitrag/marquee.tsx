import type { ContentMap } from "@/lib/content"

export function Marquee({ content }: { content: ContentMap }) {
  const items = (content.marquee_items || "")
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean)

  const safeItems = items.length
    ? items
    : [
        "Eight characters",
        ".com extension",
        "AI / RAG-native",
        "Brandable",
        "Three syllables",
        "No hyphens",
      ]

  const loop = [...safeItems, ...safeItems]

  return (
    <div className="relative overflow-hidden border-y border-border bg-surface">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-40"
        style={{
          background:
            "linear-gradient(to right, var(--surface) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40"
        style={{
          background:
            "linear-gradient(to left, var(--surface) 0%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div
        className="flex w-max items-center whitespace-nowrap py-5"
        style={{
          animation: "marquee 28s linear infinite",
          willChange: "transform",
        }}
        aria-hidden="true"
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-serif text-2xl italic text-foreground md:text-3xl"
          >
            {item}
            <span className="inline-block h-1 w-1 bg-accent" />
          </span>
        ))}
      </div>

      <span className="sr-only">{safeItems.join(", ")}.</span>
    </div>
  )
}
