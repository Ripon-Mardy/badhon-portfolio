import { ArrowRight, ArrowUpRight, Quote } from 'lucide-react'
import { careerGoals } from '../data/content'
import { ICON_STROKE } from '../lib/icons'
import { scrollToId } from '../lib/scroll'
import { Reveal, RevealItem } from './ui/Reveal'
import { SectionHeading } from './ui/SectionHeading'
import { HoverCard } from './ui/HoverCard'

/* ── Abstract chrome visuals, pure CSS (no images) ── */

const gridLines =
  'bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:32px_32px]'

function Visual({ kind }: { kind: string }) {
  return (
    <div aria-hidden className="relative h-full w-full overflow-hidden bg-[#121417] transition-transform duration-500 group-hover:scale-[1.04]">
      <div className={`absolute inset-0 ${gridLines} [mask-image:radial-gradient(circle_at_50%_45%,#000_20%,transparent_75%)]`} />
      {/* soft chrome blobs */}
      <div className="absolute -left-10 top-6 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_70%)] blur-2xl" />
      <div className="absolute -bottom-10 right-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.22),transparent_70%)] blur-2xl" />

      {kind === 'ring' && (
        // 3D silver torus: a conic-gradient disc with its centre masked out, tilted in 3D
        <div className="absolute inset-0 grid place-items-center [perspective:700px]">
          <div className="h-44 w-44 rounded-full [transform:rotateX(62deg)_rotateZ(-18deg)] [background:conic-gradient(from_200deg,#5f656b,#f5f6f7,#8b9197,#ffffff,#6b7177,#d9dcdf,#5f656b)] [mask:radial-gradient(circle,transparent_52%,#000_54%,#000_69%,transparent_71%)] shadow-[0_0_60px_rgba(255,255,255,0.15)]" />
          <div className="absolute h-28 w-28 rounded-full [transform:rotateX(62deg)_rotateZ(-18deg)_translateZ(30px)] [background:conic-gradient(from_20deg,#7d8389,#ffffff,#9aa0a6,#e6e8ea,#7d8389)] [mask:radial-gradient(circle,transparent_60%,#000_62%,#000_70%,transparent_72%)] opacity-70" />
        </div>
      )}

      {kind === 'sphere' && (
        <div className="absolute inset-0 grid place-items-center">
          <div className="h-36 w-36 rounded-full bg-[radial-gradient(circle_at_32%_28%,#ffffff_0%,#d6d9dc_14%,#8a9096_42%,#2b2f34_75%,#15181c_100%)] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9),inset_-10px_-14px_30px_rgba(0,0,0,0.5)]" />
          <div className="absolute h-56 w-56 rounded-full border border-white/10" />
          <div className="absolute h-72 w-72 rounded-full border border-dashed border-white/[0.06]" />
        </div>
      )}

      {kind === 'orbits' && (
        <div className="absolute inset-0 grid place-items-center">
          {[0, 60, 120].map((deg) => (
            <div
              key={deg}
              className="absolute h-24 w-60 rounded-[50%] border border-white/25"
              style={{ transform: `rotate(${deg}deg)`, boxShadow: '0 0 18px rgba(255,255,255,0.06)' }}
            />
          ))}
          <div className="h-10 w-10 rounded-full bg-[radial-gradient(circle_at_35%_30%,#fff,#9aa0a6_55%,#3a3f45)] shadow-[0_0_30px_rgba(255,255,255,0.35)]" />
        </div>
      )}

      {/* Vignette for legibility of the title */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#1b1f24] to-transparent" />
    </div>
  )
}

export function CareerGoals() {
  return (
    <section id="career" aria-labelledby="career-title" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 py-24 sm:px-6 md:py-32 lg:px-8">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <SectionHeading id="career-title">{careerGoals.title}</SectionHeading>
        <RevealItem>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollToId('contact') }}
            className="label group inline-flex min-h-11 items-center gap-2 text-accent transition-colors hover:text-accent-2"
          >
            {careerGoals.link}
            <ArrowRight size={15} strokeWidth={ICON_STROKE} className="transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </RevealItem>
      </Reveal>

      <Reveal as="ul" className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
        {careerGoals.cards.map((c) => (
          <li key={c.title}>
            <HoverCard className="flex h-full flex-col overflow-hidden">
              <div className="relative h-64 overflow-hidden rounded-t-[15px] sm:h-72 lg:h-80">
                <Visual kind={c.visual} />
              </div>
              <div className="relative flex flex-1 items-end justify-between gap-4 p-6 pt-2">
                <div>
                  <h3 className="text-[22px] font-medium leading-tight text-white md:text-2xl">{c.title}</h3>
                  <p className="label mt-2 text-muted">{c.subtitle}</p>
                </div>
                <span
                  aria-hidden
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 text-white transition-colors duration-300 group-hover:border-accent group-hover:bg-accent group-hover:text-ink"
                >
                  <ArrowUpRight size={18} strokeWidth={ICON_STROKE} />
                </span>
              </div>
            </HoverCard>
          </li>
        ))}
      </Reveal>

      <Reveal className="mt-6">
        <RevealItem className="card overflow-hidden p-7 sm:p-10 md:p-14">
          <Quote aria-hidden strokeWidth={0.75} className="pointer-events-none absolute -top-4 right-4 h-36 w-36 rotate-180 text-accent/[0.08] md:h-52 md:w-52" />
          <p className="label text-accent">{careerGoals.quote.label}</p>
          <blockquote className="relative mt-5 max-w-4xl text-[17px] font-light leading-relaxed text-white/90 md:text-[22px]">
            “{careerGoals.quote.text}”
          </blockquote>
        </RevealItem>
      </Reveal>
    </section>
  )
}
