import Link from "next/link"

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  return <Inner searchParams={searchParams} />
}

async function Inner({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams
  return (
    <main className="relative flex min-h-dvh items-center justify-center bg-background px-6 py-20 text-foreground">
      <div className="w-full max-w-md border border-border bg-surface/60 p-10 backdrop-blur-sm">
        <div className="mb-8 font-mono text-[11px] uppercase tracking-label text-accent">
          Auth · Error
        </div>
        <h1 className="font-serif text-4xl leading-tight text-foreground md:text-5xl">
          Something went sideways.
        </h1>
        {error ? (
          <p className="mt-4 border border-accent/40 bg-accent/5 px-4 py-3 font-mono text-[12px] text-accent">
            {error}
          </p>
        ) : (
          <p className="mt-4 font-serif italic text-muted">An unspecified authentication error occurred.</p>
        )}
        <div className="mt-10 flex items-center justify-between border-t border-border pt-6 font-mono text-[11px] uppercase tracking-label text-muted">
          <Link href="/" className="hover:text-foreground">← Back to site</Link>
          <Link href="/auth/login" className="hover:text-foreground">Try again →</Link>
        </div>
      </div>
    </main>
  )
}
