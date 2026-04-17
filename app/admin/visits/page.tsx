import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

type Visit = {
  id: string
  path: string | null
  referrer: string | null
  user_agent: string | null
  country: string | null
  created_at: string
}

function groupByDay(visits: Visit[]) {
  const map = new Map<string, number>()
  for (let i = 13; i >= 0; i--) {
    const d = new Date()
    d.setUTCHours(0, 0, 0, 0)
    d.setUTCDate(d.getUTCDate() - i)
    map.set(d.toISOString().slice(0, 10), 0)
  }
  for (const v of visits) {
    const day = v.created_at.slice(0, 10)
    if (map.has(day)) map.set(day, (map.get(day) ?? 0) + 1)
  }
  return Array.from(map.entries())
}

export default async function VisitsPage() {
  const supabase = await createClient()

  const fourteenDaysAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()

  // Exclude synthetic keep-alive pings so the log and chart reflect real traffic only.
  const [{ data: recent }, { data: chartData }, { count: total }] = await Promise.all([
    supabase
      .from("visits")
      .select("*")
      .neq("path", "__keepalive__")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("visits")
      .select("id, created_at, path, referrer, user_agent, country")
      .neq("path", "__keepalive__")
      .gte("created_at", fourteenDaysAgo),
    supabase
      .from("visits")
      .select("*", { count: "exact", head: true })
      .neq("path", "__keepalive__"),
  ])

  const days = groupByDay((chartData ?? []) as Visit[])
  const max = Math.max(1, ...days.map(([, n]) => n))

  return (
    <div className="space-y-10">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-label text-muted">
          Section · 03
        </div>
        <h1 className="mt-2 font-serif text-5xl leading-tight text-foreground md:text-6xl">
          Visits.
        </h1>
        <p className="mt-3 max-w-[60ch] font-serif italic text-muted">
          Last 14 days of traffic, and the 100 most recent entries in the log.
        </p>
      </div>

      <section className="border border-border p-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="font-mono text-[11px] uppercase tracking-label text-foreground">
            Daily · 14 days
          </span>
          <span className="font-mono text-[11px] uppercase tracking-label text-muted">
            Total {total?.toLocaleString() ?? 0}
          </span>
        </div>
        <div className="mt-6 flex h-48 items-end gap-2">
          {days.map(([day, n]) => (
            <div key={day} className="group relative flex flex-1 flex-col items-center gap-2">
              <div className="relative w-full flex-1 bg-surface">
                <div
                  className="absolute inset-x-0 bottom-0 bg-accent transition-all"
                  style={{ height: `${(n / max) * 100}%` }}
                />
                <div className="pointer-events-none absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap border border-border bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-label text-foreground opacity-0 group-hover:opacity-100">
                  {n} · {day}
                </div>
              </div>
              <span className="font-mono text-[10px] uppercase tracking-label text-muted">
                {day.slice(5)}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="border border-border">
        <header className="flex items-center justify-between border-b border-border bg-surface/60 px-6 py-3">
          <span className="font-mono text-[11px] uppercase tracking-label text-foreground">
            Log · last 100
          </span>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border font-mono text-[10px] uppercase tracking-label text-muted">
                <th className="px-6 py-3">When</th>
                <th className="px-6 py-3">Path</th>
                <th className="px-6 py-3">Referrer</th>
                <th className="px-6 py-3">Agent</th>
              </tr>
            </thead>
            <tbody>
              {(recent ?? []).length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-10 text-center font-serif italic text-muted">
                    No visits yet. As soon as someone lands on the page, entries will appear here.
                  </td>
                </tr>
              ) : (
                (recent ?? []).map((v: Visit) => (
                  <tr key={v.id} className="border-b border-border/60 font-mono text-[12px] text-foreground">
                    <td className="whitespace-nowrap px-6 py-3 text-muted">
                      {new Date(v.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-3">{v.path ?? "/"}</td>
                    <td className="max-w-[240px] truncate px-6 py-3 text-muted">
                      {v.referrer || "—"}
                    </td>
                    <td className="max-w-[320px] truncate px-6 py-3 text-muted">
                      {v.user_agent || "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
