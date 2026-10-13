import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { fadeUp } from './Reveal'

/** Glass card that fades in on scroll and lifts slightly on hover (plain CSS hover). */
export function HoverCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeUp} className="h-full">
      <div className={`card group h-full transition-[transform,border-color] duration-300 hover:-translate-y-1 hover:border-accent/40 ${className}`}>
        {children}
      </div>
    </motion.div>
  )
}
