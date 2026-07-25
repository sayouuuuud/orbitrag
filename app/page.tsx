import { Grain } from "@/components/orbitrag/grain"
import { Nav } from "@/components/orbitrag/nav"
import { Hero } from "@/components/orbitrag/hero"
import { Marquee } from "@/components/orbitrag/marquee"
import { Specs } from "@/components/orbitrag/specs"
import { Thesis } from "@/components/orbitrag/thesis"
import { UseCases } from "@/components/orbitrag/use-cases"
import { Acquire } from "@/components/orbitrag/acquire"
import { Footer } from "@/components/orbitrag/footer"
import { getContent } from "@/lib/content"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function Page() {
  const content = getContent()
  return (
    <main className="relative min-h-dvh bg-background text-foreground">
      <Grain />

      <ScrollReveal>
        <Nav content={content} />
      </ScrollReveal>

      <Hero content={content} />

      <ScrollReveal delay={0.2}>
        <Marquee content={content} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Specs content={content} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Thesis content={content} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <UseCases />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Acquire content={content} />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <Footer content={content} />
      </ScrollReveal>
    </main>
  )
}
