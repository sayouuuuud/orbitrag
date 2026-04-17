import { NextResponse, type NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const path = typeof body.path === "string" ? body.path.slice(0, 500) : "/"
    const referrer =
      typeof body.referrer === "string" ? body.referrer.slice(0, 500) : null

    const ua = req.headers.get("user-agent")?.slice(0, 500) ?? null
    const country = req.headers.get("x-vercel-ip-country") ?? null

    const supabase = await createClient()
    await supabase.from("visits").insert({
      path,
      referrer,
      user_agent: ua,
      country,
    })
    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 200 })
  }
}
