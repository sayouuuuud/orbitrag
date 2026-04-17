import { createClient } from "@/lib/supabase/server"
import { ContentEditor } from "@/components/admin/content-editor"

export const dynamic = "force-dynamic"

export default async function ContentPage() {
  const supabase = await createClient()
  const { data: rows, error } = await supabase
    .from("site_content")
    .select("*")
    .order("sort_order", { ascending: true })

  return (
    <div className="space-y-8">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-label text-muted">
          Section · 02
        </div>
        <h1 className="mt-2 font-serif text-5xl leading-tight text-foreground md:text-6xl">
          Content.
        </h1>
        <p className="mt-3 max-w-[60ch] font-serif italic text-muted">
          Every string that appears on the landing page. Edit and save; the site updates instantly.
        </p>
      </div>

      {error ? (
        <p className="border border-accent/40 bg-accent/5 px-4 py-3 font-mono text-[12px] text-accent">
          {error.message}
        </p>
      ) : (
        <ContentEditor initial={rows ?? []} />
      )}
    </div>
  )
}
