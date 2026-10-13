import { RevealItem } from './Reveal'

/** Anton section title with metallic gradient. */
export function SectionHeading({ children, id, className = '' }: { children: string; id?: string; className?: string }) {
  return (
    <RevealItem as="h2" className={`font-display text-chrome uppercase leading-[0.95] tracking-wide text-[clamp(2rem,5vw,3.25rem)] ${className}`}>
      <span id={id}>{children}<span className="text-accent">.</span></span>
    </RevealItem>
  )
}
