import { ArrowDown, ArrowUpRight, UserRound } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { hero, profile } from '../data/content'
import { getIcon } from '../lib/icons'
import { scrollToId } from '../lib/scroll'
import { Sparkle } from './ui/Sparkle'

/** Simple CSS fade-in with a delay (in seconds). */
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` })

/**
 * Editorial "magazine cover" hero:
 *   line 1 of the name sits BEHIND the portrait,
 *   line 2 is an outlined word IN FRONT of it,
 *   intro + CTAs on the left, quick facts on the right (stacked on mobile).
 */
export function Hero() {
  const [imgFailed, setImgFailed] = useState(false)
  const [line1, line2] = hero.headline

  return (
    <section id="top" aria-label="Introduction" className="relative isolate overflow-hidden pt-[72px]">
      {/* ── Background: faint grid, teal glow, concentric rings ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_at_50%_45%,#000_10%,transparent_70%)]" />
        <div className="absolute left-1/2 top-[48%] h-[120vw] w-[120vw] max-h-[1100px] max-w-[1100px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(45,212,191,0.16)_0%,rgba(45,212,191,0.05)_30%,transparent_60%)]" />
        <svg viewBox="0 0 1000 1000" className="absolute left-1/2 top-[48%] w-[160vw] max-w-[1400px] -translate-x-1/2 -translate-y-1/2">
          <circle cx="500" cy="500" r="250" fill="none" stroke="#5eead4" strokeOpacity="0.14" />
          <circle cx="500" cy="500" r="360" fill="none" stroke="#ffffff" strokeOpacity="0.06" strokeDasharray="2 8" />
          <circle cx="500" cy="500" r="470" fill="none" stroke="#ffffff" strokeOpacity="0.04" />
        </svg>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col px-4 sm:px-6 lg:min-h-[calc(100svh-72px)] lg:px-8">
        {/* ── Top meta row ── */}
        <div className="fade-in flex items-center justify-between gap-4 border-b border-line py-5">
          <p className="label text-accent">{hero.eyebrow}</p>
          <p className="label hidden text-muted sm:block">{profile.location}</p>
        </div>

        <h1 className="sr-only">{hero.headline.join(' ')} — {profile.name}, {hero.eyebrow}</h1>

        {/* ── Stage: name / portrait / name ── */}
        <div className="relative flex flex-1 flex-col items-center pt-6 lg:pt-8">
          {/* Line 1 — behind the portrait */}
          <span
            aria-hidden
            className="fade-in relative z-0 block select-none whitespace-nowrap font-display uppercase leading-[0.85] text-chrome text-[23vw] lg:text-[min(15vw,15rem)]"
            style={delay(0.05)}
          >
            {line1}
          </span>
          <Sparkle className="absolute right-[6%] top-[4%] lg:right-[14%]" size={28} color="#5eead4" />

          {/* Portrait capsule */}
          <figure
            className="fade-in relative z-10 -mt-[6vw] w-[60vw] max-w-[300px] lg:-mt-[min(5vw,72px)] lg:w-[clamp(230px,21vw,300px)]"
            style={delay(0.15)}
          >
            <div aria-hidden className="absolute -inset-2.5 rounded-full border border-accent/35" />
            <div className="relative aspect-[3/4] overflow-hidden rounded-full border border-white/10 bg-ink-2 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.95)]">
              <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(160deg,#30353b,#1d2126_70%)]">
                <UserRound aria-hidden size={100} strokeWidth={0.6} className="text-white/10" />
              </div>
              {!imgFailed && (
                <img
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  fetchPriority="high"
                  decoding="async"
                  width={800}
                  height={1000}
                  onError={() => setImgFailed(true)}
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
              )}
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-ink/90 to-transparent" />
            </div>

            {/* Rotating circular badge → contact */}
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); scrollToId('contact') }}
              aria-label={`${hero.status} — contact me`}
              className="group absolute -right-10 top-[8%] grid h-[104px] w-[104px] place-items-center rounded-full border border-white/10 bg-ink/90 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)] sm:-right-14 sm:h-[120px] sm:w-[120px]"
            >
              <svg aria-hidden viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none">
                <defs>
                  <path id="badge-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
                </defs>
                <text fill="#c9cdd1" fontSize="9.5" letterSpacing="2.6" fontFamily="Inter, sans-serif" fontWeight="500">
                  <textPath href="#badge-circle" textLength="274" lengthAdjust="spacing">{`${hero.status} • ${hero.availability.main} roles • `.toUpperCase()}</textPath>
                </text>
              </svg>
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-ink transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={18} strokeWidth={2} />
              </span>
            </a>
          </figure>

          {/* Line 2 — outlined, in front of the portrait */}
          <span
            aria-hidden
            className="fade-in relative z-20 block select-none whitespace-nowrap font-display uppercase leading-[0.85] text-outline text-[23vw] -mt-[22vw] lg:text-[min(15vw,15rem)] lg:-mt-[min(9.5vw,145px)]"
            style={delay(0.25)}
          >
            {line2}
          </span>

          {/* ── Left: intro + CTAs ── */}
          <div className="fade-in relative z-20 mt-10 w-full lg:absolute lg:bottom-[min(3vw,44px)] lg:left-0 lg:mt-0 lg:w-[min(23vw,290px)]" style={delay(0.35)}>
            <p className="text-[15px] leading-relaxed lg:text-[14.5px]">
              Hi, I'm <span className="font-medium text-white">{profile.name}</span>. {hero.intro}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4">
              <a
                href="#about"
                onClick={(e) => { e.preventDefault(); scrollToId('about') }}
                className="silver shine label relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full px-6 font-semibold"
              >
                {hero.primaryCta} <ArrowUpRight size={16} strokeWidth={1.75} />
              </a>
              <a href={profile.resume} download className="label group inline-flex min-h-11 items-center gap-2 text-white">
                <span className="border-b border-accent/60 pb-1 transition-colors group-hover:border-accent">{hero.secondaryCta}</span>
                <ArrowDown size={15} strokeWidth={1.5} className="text-accent transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* ── Right: quick facts ── */}
          <ul className="fade-in relative z-20 mt-10 w-full divide-y divide-line border-y border-line lg:absolute lg:right-0 lg:top-[min(19vw,270px)] lg:mt-0 lg:w-[min(21vw,260px)]" style={delay(0.45)}>
            {hero.imageBadges.map((b) => {
              const Icon = getIcon(b.icon)
              return (
                <li key={b.title} className="flex items-center gap-3 py-3.5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/25 bg-accent/[0.07] text-accent">
                    <Icon aria-hidden size={17} strokeWidth={1.5} />
                  </span>
                  <span className="leading-tight">
                    <span className="label block text-muted">{b.title}</span>
                    <span className="mt-1 block text-[14px] text-white">{b.sub}</span>
                  </span>
                </li>
              )
            })}
            <li className="flex items-center gap-3 py-3.5">
              <span className="grid h-10 w-10 shrink-0 place-items-center">
                <span className="h-2.5 w-2.5 rounded-full bg-accent shadow-[0_0_12px_#2dd4bf]" />
              </span>
              <span className="leading-tight">
                <span className="label block text-muted">{hero.availability.top}</span>
                <span className="mt-1 block text-[14px] text-white">{hero.availability.main} {hero.availability.bottom}</span>
              </span>
            </li>
          </ul>
        </div>

        {/* ── Bottom row: scroll cue ── */}
        <div className="fade-in flex items-center justify-center gap-3 py-8 lg:py-6" style={delay(0.55)}>
          <span className="h-px w-10 bg-white/20" />
          <span className="label text-muted">Scroll to explore</span>
          <span className="h-px w-10 bg-white/20" />
        </div>
      </div>
    </section>
  )
}
