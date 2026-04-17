import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

export const dynamic = "force-dynamic"

export default async function AdminOverview() {
  const supabase = await createClient()

  const now = new Date()
  const startOf24h = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
  const startOf7d  = new Date(now.getTime() - 7  * 24 * 60 * 60 * 1000).toISOString()
  const startOf30d = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString()

  // Exclude synthetic keep-alive pings from all analytics counts.
  const base = () =>
    supabase.from("visits").select("*", { count: "exact", head: true }).neq("path", "__keepalive__")

  const [{ count: total }, { count: last24 }, { count: last7 }, { count: last30 }] = await Promise.all([
    base(),
    base().gte("created_at", startOf24h),
    base().gte("created_at", startOf7d),
    base().gte("created_at", startOf30d),
  ])

  const stats = [
    { label: "All time",  value: total ?? 0 },
    { label: "Last 24 h", value: last24 ?? 0 },
    { label: "Last 7 d",  value: last7  ?? 0 },
    { label: "Last 30 d", value: last30 ?? 0 },
  ]

  return (
    <div className="space-y-10">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-label text-muted">
          Section · 01
        </div>
        <h1 className="mt-2 font-serif text-5xl leading-tight text-foreground md:text-6xl">
          Console.
        </h1>
        <p className="mt-3 max-w-[60ch] font-serif italic text-muted">
          Edit the copy and links on your listing, and watch how many people came to look.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-background p-6">
            <div className="font-mono text-[11px] uppercase tracking-label text-muted">{s.label}</div>
            <div className="mt-4 font-serif text-5xl text-foreground">{s.value.toLocaleString()}</div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-label text-muted">visits</div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/admin/content"
          className="group border border-border bg-surface/40 p-8 transition-colors hover:border-accent"
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-label text-muted">
            <span>Edit</span>
            <span className="transition-colors group-hover:text-accent">Content →</span>
          </div>
          <h2 className="mt-6 font-serif text-3xl text-foreground">Content editor</h2>
          <p className="mt-2 max-w-[40ch] font-serif italic text-muted">
            Change headlines, price, button labels, and the buy link.
          </p>
        </Link>
        <Link
          href="/admin/visits"
          className="group border border-border bg-surface/40 p-8 transition-colors hover:border-accent"
        >
          <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-label text-muted">
            <span>Analyze</span>
            <span className="transition-colors group-hover:text-accent">Visits →</span>
          </div>
          <h2 className="mt-6 font-serif text-3xl text-foreground">Visit log</h2>
          <p className="mt-2 max-w-[40ch] font-serif italic text-muted">
            Every view, with path, referrer, and timestamp.
          </p>
        </Link>
      </div>
    </div>
  )
}
