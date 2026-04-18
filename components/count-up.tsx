"use client"

import { useEffect, useState } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"

interface CountUpProps {
  to: number
  from?: number
  duration?: number
  className?: string
}

export function CountUp({
  to,
  from = 0,
  duration = 2,
  className = "",
}: CountUpProps) {
  const count = useMotionValue(from)
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString())
  const [inView, setInView] = useState(false)

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, { 
        duration, 
        ease: [0.22, 1, 0.36, 1], // Orbitrag's signature cubic-bezier
      })
      return controls.stop
    }
  }, [inView, count, to, duration])

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: "-10%" }}
    >
      {rounded}
    </motion.span>
  )
}
