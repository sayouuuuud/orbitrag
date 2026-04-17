"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.replace("/admin")
    router.refresh()
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-background px-6 py-20 text-foreground">
      <div className="w-full max-w-md border border-border bg-surface/60 p-10 backdrop-blur-sm">
        <div className="mb-8 flex items-center justify-between font-mono text-[11px] uppercase tracking-label text-muted">
          <span>Auth · 01</span>
          <span>Admin access</span>
        </div>

        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
          Sign in.
        </h1>
        <p className="mt-3 font-serif italic text-muted">
          Owner console for orbitrag.com
        </p>

        <form onSubmit={onSubmit} className="mt-10 space-y-6">
          <div>
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-label text-muted">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
              autoComplete="email"
            />
          </div>

          <div>
            <label className="mb-2 block font-mono text-[11px] uppercase tracking-label text-muted">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-border bg-background px-4 py-3 text-foreground outline-none transition-colors focus:border-accent"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="border border-accent/40 bg-accent/5 px-4 py-3 font-mono text-[12px] text-accent">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-between border border-foreground bg-foreground px-6 py-4 text-background transition-colors hover:bg-accent hover:border-accent disabled:opacity-60"
          >
            <span className="font-mono text-[11px] uppercase tracking-label">
              {loading ? "Signing in…" : "Sign in"}
            </span>
            <span className="font-serif italic">→</span>
          </button>
        </form>

        <div className="mt-8 border-t border-border pt-6 font-mono text-[11px] uppercase tracking-label text-muted">
          <Link href="/" className="hover:text-foreground">← Back to site</Link>
        </div>
      </div>
    </main>
  )
}
