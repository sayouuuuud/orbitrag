export type ContentMap = Record<string, string>

/**
 * All site copy lives here as static content — no database, no external
 * services. Edit these values directly to update the landing page.
 */
export const CONTENT: ContentMap = {
  domain_name: "orbitrag.com",
  price: "$1,000",
  price_currency: "USD",
  hero_eyebrow: "Private listing · 2026",
  hero_headline: "A name for the retrieval era.",
  hero_subhead:
    "A short, brandable .com built for the retrieval-augmented era. Sold once. Transferred instantly. Offered now as a private listing.",
  cta_primary_label: "Acquire This Domain",
  cta_primary_url: "https://www.atom.com/name/orbitrag",
  cta_secondary_label: "Contact Owner",
  owner_email: "owner@orbitrag.com",
  thesis_title: "The name is the architecture.",
  thesis_body:
    "ORBIT evokes a system of knowledge in motion — vectors, indexes, embeddings in graceful circulation. RAG names the mechanic of the moment: retrieval-augmented generation, the architecture behind every serious AI product shipping today. Together: a domain that reads as infrastructure and sounds like a brand.",
  marquee_items:
    "Eight characters|.com extension|AI / RAG-native|Brandable|Three syllables|No hyphens|Instant transfer|Escrow available",
}

/** Kept for backwards compatibility with existing imports. */
export const DEFAULT_CONTENT = CONTENT

export function getContent(): ContentMap {
  return { ...CONTENT }
}

export function mailtoFor(email: string, domain: string) {
  const subject = encodeURIComponent(`${domain} — Private offer`)
  const body = encodeURIComponent(
    `Hi,\n\nI'm interested in acquiring ${domain}. Please share next steps.\n\nThanks.`
  )
  return `mailto:${email}?subject=${subject}&body=${body}`
}

/**
 * Normalizes a user-entered URL so it always opens as an external link.
 * - Leaves anchor (#section), mailto:, tel:, and relative (/path) links alone.
 * - Prepends https:// to bare hostnames like "google.com" or "www.google.com".
 * - Returns "#" for empty input so the <a> never resolves to the current URL.
 */
export function normalizeExternalUrl(raw: string | undefined | null): string {
  const url = (raw || "").trim()
  if (!url) return "#"
  if (url.startsWith("#") || url.startsWith("/") || url.startsWith("mailto:") || url.startsWith("tel:")) {
    return url
  }
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(url)) return url
  return `https://${url.replace(/^\/+/, "")}`
}

export function isExternal(url: string) {
  return /^https?:\/\//i.test(url) || url.startsWith("mailto:") || url.startsWith("tel:")
}
