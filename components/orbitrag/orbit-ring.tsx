/**
 * Hero orbital visual, re-imagined as a RAG vector space:
 *   - Three orbits = embedding manifolds
 *   - Small dots on orbits = document chunks / embeddings in the index
 *   - Bright orange dots = top-k retrieved chunks for an imaginary query
 *   - Center dot = the query vector
 *   - Thin lines from center to bright dots = retrieval edges
 */
export function OrbitRing({ className = "" }: { className?: string }) {
  // Fixed positions so the diagram reads the same every render.
  const ring1Dots = [
    { x: 780, y: 400, hot: true },
    { x: 720, y: 275, hot: false },
    { x: 595, y: 220, hot: false },
    { x: 400, y: 260, hot: false },
    { x: 205, y: 220, hot: true },
    { x: 80, y: 275, hot: false },
    { x: 20, y: 400, hot: false },
    { x: 80, y: 525, hot: false },
    { x: 205, y: 580, hot: false },
    { x: 400, y: 540, hot: false },
    { x: 595, y: 580, hot: false },
    { x: 720, y: 525, hot: false },
  ]

  const ring2Dots = [
    { x: 664, y: 356, hot: false },
    { x: 520, y: 278, hot: true },
    { x: 280, y: 278, hot: false },
    { x: 136, y: 444, hot: false },
    { x: 280, y: 522, hot: false },
    { x: 520, y: 522, hot: false },
  ]

  const ring3Dots = [
    { x: 590, y: 355, hot: false },
    { x: 400, y: 320, hot: false },
    { x: 210, y: 355, hot: false },
    { x: 210, y: 445, hot: false },
    { x: 400, y: 480, hot: true },
    { x: 590, y: 445, hot: false },
  ]

  const hotDots = [...ring1Dots, ...ring2Dots, ...ring3Dots].filter((d) => d.hot)

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
    >
      {/* The slowly rotating wrapper holds the orbits + embeddings */}
      <div className="orbit-slow relative h-full w-full">
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Orbit 1 — outer */}
          <ellipse
            cx="400"
            cy="400"
            rx="380"
            ry="140"
            stroke="var(--border-strong)"
            strokeWidth="1"
          />
          {/* Orbit 2 */}
          <ellipse
            cx="400"
            cy="400"
            rx="264"
            ry="122"
            stroke="var(--border)"
            strokeWidth="1"
            transform="rotate(24 400 400)"
          />
          {/* Orbit 3 — inner */}
          <ellipse
            cx="400"
            cy="400"
            rx="190"
            ry="80"
            stroke="var(--border)"
            strokeWidth="1"
            transform="rotate(-18 400 400)"
          />

          {/* Dim embeddings (the haystack) */}
          {[...ring1Dots, ...ring2Dots, ...ring3Dots]
            .filter((d) => !d.hot)
            .map((d, i) => (
              <circle
                key={`dim-${i}`}
                cx={d.x}
                cy={d.y}
                r="1.6"
                fill="var(--muted)"
                opacity="0.55"
              />
            ))}
        </svg>
      </div>

      {/* The non-rotating layer: query center + retrieval edges + hot chunks.
          Kept outside .orbit-slow so the "retrieval" reads as a stable act. */}
      <div className="absolute inset-0">
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Retrieval edges: query vector → retrieved chunks */}
          {hotDots.map((d, i) => (
            <line
              key={`edge-${i}`}
              x1="400"
              y1="400"
              x2={d.x}
              y2={d.y}
              stroke="#FF4D1C"
              strokeWidth="0.6"
              strokeDasharray="2 4"
              opacity="0.55"
            />
          ))}

          {/* Retrieved (top-k) chunks */}
          {hotDots.map((d, i) => (
            <g key={`hot-${i}`}>
              <circle cx={d.x} cy={d.y} r="6" fill="#FF4D1C" opacity="0.18" />
              <circle cx={d.x} cy={d.y} r="2.6" fill="#FF4D1C" />
            </g>
          ))}

          {/* Query vector — the center of gravity */}
          <circle cx="400" cy="400" r="18" fill="#FF4D1C" opacity="0.08" />
          <circle cx="400" cy="400" r="9" fill="#FF4D1C" opacity="0.18" />
          <circle cx="400" cy="400" r="3" fill="#FF4D1C" />
        </svg>
      </div>
    </div>
  )
}
