import { motion, type Variants } from 'motion/react'
import { ChevronRight } from 'lucide-react'
import { Fragment } from 'react'
import { hobbies } from '../data/content'
import { getIcon, ICON_STROKE } from '../lib/icons'
import { fadeUp, Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'

/** Steps and connectors fade in one after another, left → right. */
const sequence: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }

/** Dotted arrow: vertical on mobile, horizontal on desktop. */
function Connector() {
  return (
    <motion.div aria-hidden variants={fadeUp} className="flex shrink-0 items-center justify-center text-accent/70 lg:mt-[22px] lg:self-start">
      <div className="flex flex-col items-center lg:flex-row">
        <span className="dots block h-8 w-[3px] lg:h-[3px] lg:w-10 xl:w-14" />
        <ChevronRight size={14} strokeWidth={1.5} className="-mt-1 rotate-90 lg:-ml-1 lg:mt-0 lg:rotate-0" />
      </div>
    </motion.div>
  )
}

export function Hobbies() {
  return (
    <section id="hobbies" aria-labelledby="hobbies-title" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
      <Reveal>
        <SectionHeading id="hobbies-title">{hobbies.title}</SectionHeading>
      </Reveal>

      <motion.ol
        variants={sequence}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        className="card mt-10 flex flex-col p-6 sm:p-8 lg:flex-row lg:items-stretch lg:p-10"
      >
        {hobbies.items.map((h, i) => {
          const Icon = getIcon(h.icon)
          return (
            <Fragment key={h.title}>
              {i > 0 && <Connector />}
              <motion.li variants={fadeUp} className="group flex flex-1 gap-5 py-2 lg:flex-col lg:gap-0 lg:py-0">
                <span className="font-display text-[28px] leading-none text-chrome lg:text-[34px]">{String(i + 1).padStart(2, '0')}</span>
                <div className="flex-1 lg:mt-5">
                  <h3 className="label font-semibold text-white">{h.title}</h3>
                  <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{h.text}</p>
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-accent/25 bg-accent/[0.06] text-accent transition-colors duration-300 group-hover:border-accent/60 lg:mt-6">
                  <Icon aria-hidden size={20} strokeWidth={ICON_STROKE} />
                </span>
              </motion.li>
            </Fragment>
          )
        })}
      </motion.ol>
    </section>
  )
}
