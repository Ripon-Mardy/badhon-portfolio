import { motion, useScroll } from 'motion/react'

/** Thin silver progress line pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-accent to-accent-2"
      style={{ scaleX: scrollYProgress }}
    />
  )
}
