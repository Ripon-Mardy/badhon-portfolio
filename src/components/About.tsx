import { about } from '../data/content'
import { getIcon, ICON_STROKE } from '../lib/icons'
import { Reveal } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { HoverCard } from './ui/HoverCard'

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pb-24 sm:px-6 md:pb-32 lg:px-8">
      <Reveal>
        <SectionHeading id="about-title">{about.title}</SectionHeading>
      </Reveal>
      <Reveal as="ul" className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
        {about.cards.map((c, i) => {
          const Icon = getIcon(c.icon)
          return (
            <li key={c.title}>
              <HoverCard className="flex h-full flex-col p-7 md:p-8">
                <div className="flex items-start justify-between">
                  <span className="font-display text-[44px] leading-none text-chrome opacity-90">{String(i + 1).padStart(2, '0')}</span>
                  <span className="grid h-12 w-12 place-items-center rounded-xl border border-accent/25 bg-accent/[0.06] text-accent transition-colors duration-300 group-hover:border-accent/60">
                    <Icon aria-hidden size={22} strokeWidth={ICON_STROKE} />
                  </span>
                </div>
                <div className="my-7 h-px w-full bg-gradient-to-r from-accent/50 via-white/[0.06] to-transparent" />
                <h3 className="label font-semibold text-white">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{c.text}</p>
              </HoverCard>
            </li>
          )
        })}
      </Reveal>
    </section>
  )
}
