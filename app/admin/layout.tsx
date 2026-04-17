import Link from "next/link"
import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { SignOutButton } from "@/components/admin/sign-out-button"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect("/auth/login")

  const { data: admin } = await supabase
    .from("admins")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle()

  if (!admin) {
    return (
      <main className="relative flex min-h-dvh items-center justify-center bg-background px-6 text-foreground">
        <div className="w-full max-w-md border border-border bg-surface/60 p-10 backdrop-blur-sm">
          <div className="mb-6 font-mono text-[11px] uppercase tracking-label text-accent">
            Access · Denied
          </div>
          <h1 className="font-serif text-4xl leading-tight">Not authorized.</h1>
          <p className="mt-3 font-serif italic text-muted">
            Your account is signed in but not an admin of this listing.
          </p>
          <div className="mt-8 flex items-center justify-between border-t border-border pt-6 font-mono text-[11px] uppercase tracking-label text-muted">
            <Link href="/" className="hover:text-foreground">← Back to site</Link>
            <SignOutButton />
          </div>
        </div>
      </main>
    )
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-6">
            <Link href="/" className="font-serif text-lg italic text-foreground">
              orbitrag<span className="text-accent">.</span>com
            </Link>
            <span className="font-mono text-[11px] uppercase tracking-label text-muted">
              Admin console
            </span>
          </div>
          <nav className="flex items-center gap-6 font-mono text-[11px] uppercase tracking-label">
            <Link href="/admin" className="text-muted hover:text-foreground">Overview</Link>
            <Link href="/admin/content" className="text-muted hover:text-foreground">Content</Link>
            <Link href="/admin/visits" className="text-muted hover:text-foreground">Visits</Link>
            <span className="hidden text-muted md:inline">{user.email}</span>
            <SignOutButton />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-10">{children}</main>
    </div>
  )
}
