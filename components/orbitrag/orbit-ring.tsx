export function OrbitRing({ className = "" }: { className?: string }) {
  // SVG Paths for the three orbits (ellipses converted to paths for animateMotion)
  const path1 = "M 780,400 a 380,140 0 1,0 -760,0 a 380,140 0 1,0 760,0" // rx=380, ry=140
  const path2 = "M 664,400 a 264,122 0 1,0 -528,0 a 264,122 0 1,0 528,0" // rx=264, ry=122
  const path3 = "M 590,400 a 190,80  0 1,0 -380,0 a 190,80  0 1,0 380,0" // rx=190, ry=80

  // Helper to generate orbiting dots (planets/data)
  const renderDots = (path: string, count: number, duration: number, hotIndices: number[]) => {
    return Array.from({ length: count }).map((_, i) => {
      const isHot = hotIndices.includes(i)
      const beginTime = -(duration / count) * i // Stagger the dots along the orbit

      return (
        <g key={i}>
          <animateMotion
            path={path}
            dur={`${duration}s`}
            begin={`${beginTime}s`}
            repeatCount="indefinite"
          />
          {isHot ? (
            <>
              {/* Hot data chunk (Planet) */}
              <circle cx="0" cy="0" r="6" fill="#FF4D1C" opacity="0.18" />
              <circle cx="0" cy="0" r="2.6" fill="#FF4D1C" />
            </>
          ) : (
            /* Regular data chunk */
            <circle cx="0" cy="0" r="1.6" fill="var(--muted)" opacity="0.55" />
          )}
        </g>
      )
    })
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute ${className}`}
    >
      <div className="relative h-full w-full">
        <svg
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-full w-full"
        >
          {/* Outer Orbit (Slowest) */}
          <g>
            <path
              d={path1}
              stroke="var(--border-strong)"
              strokeWidth="1"
            />
            {renderDots(path1, 12, 60, [0, 5])}
          </g>

          {/* Middle Orbit */}
          <g transform="rotate(24 400 400)">
            <path
              d={path2}
              stroke="var(--border)"
              strokeWidth="1"
            />
            {renderDots(path2, 8, 45, [2, 6])}
          </g>

          {/* Inner Orbit (Fastest) */}
          <g transform="rotate(-18 400 400)">
            <path
              d={path3}
              stroke="var(--border)"
              strokeWidth="1"
            />
            {renderDots(path3, 6, 30, [1])}
          </g>

          {/* Query vector — The Sun (Center of gravity) */}
          <circle cx="400" cy="400" r="18" fill="#FF4D1C" opacity="0.08" />
          <circle cx="400" cy="400" r="9" fill="#FF4D1C" opacity="0.18" />
          <circle cx="400" cy="400" r="3" fill="#FF4D1C" />
        </svg>
      </div>
    </div>
  )
}
