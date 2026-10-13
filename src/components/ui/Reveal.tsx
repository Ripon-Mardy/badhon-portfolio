import { motion, type Variants } from 'motion/react'
import type { ReactNode } from 'react'

/** Shared easing — a soft "expo out" feel used across the site. */
export const EASE = [0.22, 1, 0.36, 1] as const

/** Parent variant: staggers its children by 0.08s. */
export const stagger = (delay = 0, each = 0.06): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})

/** Child variant: simple fade-up. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

type Props = { children: ReactNode; className?: string; delay?: number; as?: 'div' | 'section' | 'ul' }

/** Container that reveals its <RevealItem> children once when scrolled into view. */
export function Reveal({ children, className, delay = 0, as = 'div' }: Props) {
  const Comp = motion[as]
  return (
    <Comp
      className={className}
      variants={stagger(delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({ children, className, as = 'div' }: Omit<Props, 'delay' | 'as'> & { as?: 'div' | 'li' | 'h2' | 'p' }) {
  const Comp = motion[as]
  return <Comp className={className} variants={fadeUp}>{children}</Comp>
}
