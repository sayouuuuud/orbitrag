"use client"

import { useMemo, useState, useTransition } from "react"
import { createClient } from "@/lib/supabase/client"

type Row = {
  key: string
  value: string
  label: string
  kind: "text" | "textarea" | "url" | "email"
  section: string
  sort_order: number
}

export function ContentEditor({ initial }: { initial: Row[] }) {
  const [rows, setRows] = useState<Row[]>(initial)
  const [dirty, setDirty] = useState<Record<string, boolean>>({})
  const [status, setStatus] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()

  const grouped = useMemo(() => {
    const map = new Map<string, Row[]>()
    for (const r of rows) {
      if (!map.has(r.section)) map.set(r.section, [])
      map.get(r.section)!.push(r)
    }
    return Array.from(map.entries())
  }, [rows])

  function setValue(key: string, value: string) {
    setRows((prev) => prev.map((r) => (r.key === key ? { ...r, value } : r)))
    setDirty((d) => ({ ...d, [key]: true }))
    setStatus(null)
  }

  async function saveAll() {
    const supabase = createClient()
    const changed = rows.filter((r) => dirty[r.key])
    if (changed.length === 0) {
      setStatus("Nothing to save.")
      return
    }
    startTransition(async () => {
      const errors: string[] = []
      for (const r of changed) {
        const { error } = await supabase
          .from("site_content")
          .update({ value: r.value })
          .eq("key", r.key)
        if (error) errors.push(`${r.key}: ${error.message}`)
      }
      if (errors.length) {
        setStatus(errors.join(" · "))
      } else {
        setDirty({})
        setStatus(`Saved ${changed.length} change${changed.length === 1 ? "" : "s"}.`)
      }
    })
  }

  const dirtyCount = Object.values(dirty).filter(Boolean).length

  return (
    <div className="space-y-10">
      <div className="sticky top-[73px] z-40 -mx-6 flex items-center justify-between border-y border-border bg-background/90 px-6 py-3 backdrop-blur">
        <div className="font-mono text-[11px] uppercase tracking-label text-muted">
          {dirtyCount > 0
            ? `${dirtyCount} unsaved change${dirtyCount === 1 ? "" : "s"}`
            : "All changes saved"}
          {status && <span className="ml-4 text-accent">{status}</span>}
        </div>
        <button
          onClick={saveAll}
          disabled={pending || dirtyCount === 0}
          className="flex items-center gap-3 border border-foreground bg-foreground px-5 py-2 text-background transition-colors hover:bg-accent hover:border-accent disabled:opacity-40"
        >
          <span className="font-mono text-[11px] uppercase tracking-label">
            {pending ? "Saving…" : "Save changes"}
          </span>
          <span className="font-serif italic">→</span>
        </button>
      </div>

      {grouped.map(([section, sectionRows]) => (
        <section key={section} className="border border-border">
          <header className="flex items-center justify-between border-b border-border bg-surface/60 px-6 py-3">
            <span className="font-mono text-[11px] uppercase tracking-label text-foreground">
              {section}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-label text-muted">
              {sectionRows.length} field{sectionRows.length === 1 ? "" : "s"}
            </span>
          </header>
          <div className="divide-y divide-border">
            {sectionRows.map((r) => (
              <div key={r.key} className="grid gap-4 p-6 md:grid-cols-[220px_1fr]">
                <div>
                  <div className="font-mono text-[12px] uppercase tracking-label text-foreground">
                    {r.label}
                  </div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-label text-muted">
                    {r.key}
                  </div>
                  {dirty[r.key] && (
                    <div className="mt-2 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-label text-accent">
                      <span className="inline-block h-1.5 w-1.5 bg-accent" />
                      unsaved
                    </div>
                  )}
                </div>
                <div>
                  {r.kind === "textarea" ? (
                    <textarea
                      value={r.value}
                      onChange={(e) => setValue(r.key, e.target.value)}
                      rows={Math.min(10, Math.max(3, Math.ceil(r.value.length / 60)))}
                      className="w-full border border-border bg-background px-4 py-3 font-serif text-foreground outline-none transition-colors focus:border-accent"
                    />
                  ) : (
                    <input
                      type={r.kind === "email" ? "email" : r.kind === "url" ? "url" : "text"}
                      value={r.value}
                      onChange={(e) => setValue(r.key, e.target.value)}
                      className="w-full border border-border bg-background px-4 py-3 font-serif text-foreground outline-none transition-colors focus:border-accent"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
