import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Check, Copy, Globe, Mail, MapPin, Phone, type LucideIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { contact, profile } from '../data/content'
import { ICON_STROKE } from '../lib/icons'
import { fadeUp, Reveal } from './ui/Reveal'
import { Sparkle } from './ui/Sparkle'

type Row = { icon: LucideIcon; label: string; value: string; display: string }

const rows: Row[] = [
  { icon: Mail, label: 'Email', value: profile.email, display: profile.email },
  { icon: Phone, label: 'Phone', value: profile.phone, display: profile.phone },
  { icon: MapPin, label: 'Location', value: profile.location, display: profile.location },
  { icon: Globe, label: 'Website', value: profile.website, display: profile.websiteLabel },
]

/** Copy text with a fallback for non-secure contexts (e.g. LAN preview on a phone). */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
}

export function Contact() {
  const [copied, setCopied] = useState<string | null>(null)
  const timer = useRef<number>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  const onCopy = async (r: Row) => {
    await copyText(r.value)
    setCopied(r.label)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setCopied(null), 1800)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-[1200px] scroll-mt-24 px-4 pb-20 sm:px-6 lg:px-8">
      <Reveal className="card grid overflow-hidden lg:grid-cols-[1.2fr_1fr_1fr]">
        {/* Brushed-metal panel */}
        <motion.div variants={fadeUp} className="silver relative overflow-hidden p-8 sm:p-10 lg:rounded-l-[15px]">
          {/* diagonal light streak */}
          <div aria-hidden className="pointer-events-none absolute -inset-1/2 rotate-[25deg] bg-[linear-gradient(90deg,transparent_42%,rgba(255,255,255,0.75)_50%,transparent_58%)]" />
          <h2 id="contact-title" className="relative font-display text-[clamp(2.6rem,9vw,4.2rem)] uppercase leading-[0.92] text-[#16191d] lg:text-[clamp(2.6rem,4.6vw,4.2rem)]">
            {contact.headline.map((l) => <span key={l} className="block">{l}</span>)}
          </h2>
          <Sparkle className="absolute bottom-7 right-7" size={30} color="#1d2126" />
        </motion.div>

        {/* Message + CTA */}
        <motion.div variants={fadeUp} className="flex flex-col justify-center gap-7 p-8 sm:p-10">
          <p className="text-[17px] leading-relaxed text-white/85">{contact.text}</p>
            <a
              href={`mailto:${profile.email}`}
              className="silver shine label relative inline-flex h-[52px] self-start items-center gap-2 overflow-hidden rounded-md px-6 font-semibold"
            >
              {contact.cta} <ArrowUpRight size={16} strokeWidth={1.75} />
            </a>
        </motion.div>

        {/* Contact details — click to copy */}
        <motion.ul variants={fadeUp} className="flex flex-col justify-center border-t border-line p-4 sm:p-6 lg:border-l lg:border-t-0">
          {rows.map((r) => (
            <li key={r.label}>
              <button
                type="button"
                onClick={() => onCopy(r)}
                className="group flex min-h-[52px] w-full items-center gap-4 rounded-lg px-3 py-2 text-left transition-colors hover:bg-white/[0.04]"
                aria-label={`Copy ${r.label.toLowerCase()}: ${r.display}`}
              >
                <r.icon aria-hidden size={19} strokeWidth={ICON_STROKE} className="shrink-0 text-accent" />
                <span className="min-w-0 flex-1 truncate text-[14.5px] text-white/85">{r.display}</span>
                {copied === r.label
                  ? <Check aria-hidden size={15} className="shrink-0 text-accent" />
                  : <Copy aria-hidden size={15} strokeWidth={ICON_STROKE} className="shrink-0 text-muted opacity-60 transition-opacity group-hover:opacity-100" />}
              </button>
            </li>
          ))}
        </motion.ul>
      </Reveal>

      {/* Toast */}
      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[85] flex justify-center px-4">
        <AnimatePresence>
          {copied && (
            <motion.div
              key={copied}
              initial={{ opacity: 0, y: 16, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              className="silver label inline-flex items-center gap-2 rounded-full px-5 py-3 font-semibold"
            >
              <Check size={14} strokeWidth={2} /> Copied!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
