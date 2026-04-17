import { Grain } from "@/components/orbitrag/grain"
import { Nav } from "@/components/orbitrag/nav"
import { Hero } from "@/components/orbitrag/hero"
import { Marquee } from "@/components/orbitrag/marquee"
import { Specs } from "@/components/orbitrag/specs"
import { Thesis } from "@/components/orbitrag/thesis"
import { UseCases } from "@/components/orbitrag/use-cases"
import { Acquire } from "@/components/orbitrag/acquire"
import { Footer } from "@/components/orbitrag/footer"
import { TrackVisit } from "@/components/track-visit"
import { getContent } from "@/lib/content"

export const dynamic = "force-dynamic"

export default async function Page() {
  const content = await getContent()
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <TrackVisit />
      <Grain />
      <div className="rise-in">
        <Nav content={content} />
      </div>
      <Hero content={content} />
      <div className="rise-in" style={{ animationDelay: "320ms" }}>
        <Marquee content={content} />
      </div>
      <div className="rise-in" style={{ animationDelay: "400ms" }}>
        <Specs content={content} />
        <Thesis content={content} />
        <UseCases />
        <Acquire content={content} />
        <Footer content={content} />
      </div>
    </main>
  )
}
