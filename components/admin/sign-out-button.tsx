"use client"

import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

export function SignOutButton() {
  const router = useRouter()
  return (
    <button
      onClick={async () => {
        const supabase = createClient()
        await supabase.auth.signOut()
        router.replace("/auth/login")
        router.refresh()
      }}
      className="font-mono text-[11px] uppercase tracking-label text-muted hover:text-accent"
    >
      Sign out
    </button>
  )
}
