import { animate, motion, useInView, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/content'
import { getIcon, ICON_STROKE } from '../lib/icons'
import { fadeUp, Reveal } from './ui/Reveal'

/** Counts the numeric part of a value (e.g. "8+") up from 0 once visible. Non-numeric values just fade in. */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' })
  const reduce = useReducedMotion()
  const match = value.match(/^(\d+)(.*)$/)
  const [n, setN] = useState(match ? 0 : null)

  useEffect(() => {
    const m = value.match(/^(\d+)/)
    if (!m || !inView) return
    const target = Number(m[1])
    if (reduce) { setN(target); return }
    const controls = animate(0, target, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setN(Math.round(v)) })
    return () => controls.stop()
  }, [inView, reduce, value])

  return (
    <span ref={ref} className="tabular-nums">
      {match ? `${n}${match[2]}` : value}
    </span>
  )
}

export function Stats() {
  return (
    <section aria-label="Highlights" className="mx-auto max-w-[1200px] px-4 sm:px-6 lg:px-8">
      <Reveal className="card grid grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = getIcon(s.icon)
          return (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className={`flex flex-col items-center px-3 py-8 text-center sm:px-6 lg:py-10
                ${i % 2 === 1 ? 'border-l border-line' : ''}
                ${i >= 2 ? 'border-t border-line lg:border-t-0' : ''}
                ${i === 2 ? 'lg:border-l' : ''}`}
            >
              <Icon aria-hidden size={24} strokeWidth={ICON_STROKE} className="text-accent" />
              <p className="mt-4 text-[40px] font-light leading-none text-white sm:text-[48px] lg:text-[56px]">
                <CountUp value={s.value} />
              </p>
              <p className="label mt-3 max-w-[14rem] text-muted">{s.label}</p>
            </motion.div>
          )
        })}
      </Reveal>
    </section>
  )
}
