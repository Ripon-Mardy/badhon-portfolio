import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useEffect, useState, type MouseEvent } from 'react'
import { nav, navCta, profile } from '../data/content'
import { ICON_STROKE } from '../lib/icons'
import { scrollToId } from '../lib/scroll'
import { EASE } from './ui/Reveal'

/** Tracks which section is currently in the middle of the viewport. */
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const ids = nav.map((n) => n.id)

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  // Lock scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const go = (e: MouseEvent, id: string) => {
    e.preventDefault()
    setOpen(false)
    // Wait one frame so the scroll lock is released before scrolling
    requestAnimationFrame(() => scrollToId(id))
  }

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled ? 'border-b border-line bg-ink/70 backdrop-blur-xl' : 'border-b border-transparent'
        }`}
      >
        <nav aria-label="Primary" className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#top" onClick={(e) => go(e, 'top')} className="font-serif text-[28px] font-normal leading-none tracking-wide text-white" aria-label={`${profile.name} — back to top`}>
            {profile.initials}
          </a>

          <div className="hidden items-center gap-9 md:flex">
            <ul className="flex items-center gap-7 lg:gap-9">
              {nav.map((item) => {
                const isActive = active === item.id
                return (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => go(e, item.id)}
                      aria-current={isActive ? 'true' : undefined}
                      className={`label group relative py-2 transition-colors duration-300 ${isActive ? 'text-white' : 'text-muted hover:text-white'}`}
                    >
                      {item.label}
                      <span className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-accent transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                    </a>
                  </li>
                )
              })}
            </ul>
              <a href="#contact" onClick={(e) => go(e, 'contact')} className="silver shine label relative inline-flex h-11 items-center gap-1.5 overflow-hidden rounded-full px-5 font-semibold">
                {navCta} <ArrowUpRight size={15} strokeWidth={1.75} />
              </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-line text-white md:hidden"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={20} strokeWidth={ICON_STROKE} />
          </button>
        </nav>
      </header>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[80] flex flex-col bg-ink/95 px-6 pb-10 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex h-[72px] items-center justify-between">
              <span className="font-serif text-[28px] text-white">{profile.initials}</span>
              <button type="button" autoFocus onClick={() => setOpen(false)} className="grid h-11 w-11 place-items-center rounded-full border border-line text-white" aria-label="Close menu">
                <X size={20} strokeWidth={ICON_STROKE} />
              </button>
            </div>
            <ul className="mt-10 flex flex-1 flex-col gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.3, ease: EASE }}
                  className="border-b border-line"
                >
                  <a href={`#${item.id}`} onClick={(e) => go(e, item.id)} className="flex items-center justify-between py-4 font-display text-[clamp(2.5rem,12vw,3.5rem)] uppercase leading-none text-chrome">
                    {item.label}
                    <ArrowUpRight className="text-accent" size={28} strokeWidth={ICON_STROKE} />
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.a
              href={`mailto:${profile.email}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.3 }}
              className="silver label inline-flex h-12 items-center justify-center gap-2 rounded-full font-semibold"
            >
              {navCta} <ArrowUpRight size={16} strokeWidth={1.75} />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
