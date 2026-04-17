import type { Metadata } from "next"
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
})

export const metadata: Metadata = {
  title: "orbitrag.com — Premium AI-era domain for sale",
  description:
    "orbitrag.com is a rare, brandable .com built for the retrieval-augmented era. Available now via private listing for $400. Instant transfer.",
  generator: "v0.app",
  openGraph: {
    title: "orbitrag.com — Premium AI-era domain for sale",
    description:
      "A rare, brandable .com for the retrieval-augmented era. $400. Instant transfer.",
    type: "website",
    url: "https://orbitrag.com",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
