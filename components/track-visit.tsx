"use client"

import { useEffect } from "react"

export function TrackVisit() {
  useEffect(() => {
    const key = "orbitrag_tracked_v1"
    if (typeof window === "undefined") return
    try {
      if (sessionStorage.getItem(key)) return
      sessionStorage.setItem(key, "1")
    } catch {
      // sessionStorage may be blocked; still record once per page load
    }
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        path: window.location.pathname + window.location.search,
        referrer: document.referrer || null,
      }),
      keepalive: true,
    }).catch(() => {})
  }, [])
  return null
}
