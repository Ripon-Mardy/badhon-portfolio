import { AnimatePresence, motion } from 'motion/react'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { coreSkills, education, professionalSkills } from '../data/content'
import { getIcon, ICON_STROKE } from '../lib/icons'
import { EASE, fadeUp, Reveal, RevealItem } from './ui/Reveal'

/** Small card title used inside the skills cards. */
function CardTitle({ children, id }: { children: string; id?: string }) {
  return <h2 id={id} className="font-display text-[26px] uppercase leading-none tracking-wide text-chrome md:text-[30px]">{children}</h2>
}

/* ── Professional skills tile with hover/focus tooltip ── */
function SkillTile({ icon, label, tip }: { icon: string; label: string; tip: string }) {
  const [open, setOpen] = useState(false)
  const Icon = getIcon(icon)
  return (
    <li className="relative">
      <button
        type="button"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((o) => !o)}
        aria-describedby={open ? `tip-${label}` : undefined}
        className="group flex h-full min-h-[96px] w-full flex-col items-center justify-center gap-2.5 rounded-xl border border-line bg-white/[0.02] px-2 py-4 text-center transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.05]"
      >
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-[#15181c] text-silver transition-colors duration-300 group-hover:border-accent/50 group-hover:text-accent">
          <Icon aria-hidden size={19} strokeWidth={ICON_STROKE} />
        </span>
        <span className="text-[12.5px] leading-tight text-white/85">{label}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.span
            id={`tip-${label}`}
            role="tooltip"
            initial={{ opacity: 0, y: 6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE }}
            className="pointer-events-none absolute bottom-[calc(100%+8px)] left-1/2 z-30 w-44 -translate-x-1/2 rounded-lg border border-accent/30 bg-[#23282e] px-3 py-2 text-center text-[12px] leading-snug text-white/85 shadow-xl backdrop-blur"
          >
            {tip}
          </motion.span>
        )}
      </AnimatePresence>
    </li>
  )
}

/* ── Education accordion row ── */
function EduRow({ icon, title, meta, details, defaultOpen }: { icon: string; title: string; meta: string; details?: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  const Icon = getIcon(icon)
  const panelId = `edu-${title.replace(/\W+/g, '-')}`

  const head = (
    <>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-accent/25 bg-accent/[0.06] text-accent">
        <Icon aria-hidden size={20} strokeWidth={ICON_STROKE} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[15px] font-medium leading-snug text-white">{title}</span>
        <span className="mt-1 block text-[13.5px] leading-snug text-muted">{meta}</span>
      </span>
    </>
  )

  return (
    <motion.li variants={fadeUp} className="border-t border-line first:border-t-0">
      {details ? (
        <>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-start gap-4 py-5 text-left"
          >
            {head}
            <ChevronDown aria-hidden size={18} strokeWidth={ICON_STROKE} className={`mt-3 shrink-0 text-accent transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="overflow-hidden"
              >
                <p className="pb-5 pl-15 text-[14px] leading-relaxed text-muted">{details}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <div className="flex items-start gap-4 py-5">{head}</div>
      )}
    </motion.li>
  )
}

export function Skills() {
  return (
    <section id="skills" aria-label="Skills and education" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
        {/* LEFT — Core skills */}
        <Reveal className="card p-6 sm:p-8 md:p-10">
          <RevealItem><CardTitle>{coreSkills.title}</CardTitle></RevealItem>
          <ul className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 md:mt-10 md:gap-y-10">
            {coreSkills.items.map((s) => {
              const Icon = getIcon(s.icon)
              return (
                <motion.li key={s.title} variants={fadeUp} className="group flex gap-4">
                  <Icon aria-hidden size={26} strokeWidth={ICON_STROKE} className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <h3 className="label font-semibold text-white">{s.title}</h3>
                    <p className="mt-2 text-[14.5px] leading-relaxed text-muted">{s.text}</p>
                  </div>
                </motion.li>
              )
            })}
          </ul>
        </Reveal>

        {/* RIGHT — Professional skills + Education */}
        <div className="grid gap-6">
          <Reveal className="card p-6 sm:p-8">
            <RevealItem><CardTitle>{professionalSkills.title}</CardTitle></RevealItem>
            <motion.ul variants={fadeUp} className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {professionalSkills.items.map((s) => <SkillTile key={s.label} {...s} />)}
            </motion.ul>
          </Reveal>

          <Reveal className="card scroll-mt-24 p-6 sm:p-8" >
            <div id="education" className="scroll-mt-24">
              <RevealItem><CardTitle>{education.title}</CardTitle></RevealItem>
              <ul className="mt-3">
                {education.items.map((e, i) => <EduRow key={e.title} {...e} defaultOpen={i === 0} />)}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
