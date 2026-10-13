import { Mail } from 'lucide-react'
import type { ComponentType } from 'react'
import { footer, profile, socials } from '../data/content'
import { ICON_STROKE } from '../lib/icons'
import { FacebookIcon, LinkedinIcon, WhatsappIcon } from './ui/BrandIcons'

const MailIcon = ({ size = 18 }: { size?: number }) => <Mail aria-hidden size={size} strokeWidth={ICON_STROKE} />

const links: { label: string; href: string; Icon: ComponentType<{ size?: number }> }[] = [
  { label: 'LinkedIn', href: socials.linkedin, Icon: LinkedinIcon },
  { label: 'Facebook', href: socials.facebook, Icon: FacebookIcon },
  { label: 'WhatsApp', href: socials.whatsapp, Icon: WhatsappIcon },
  { label: 'Email', href: `mailto:${profile.email}`, Icon: MailIcon },
]

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1200px] flex-col-reverse items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
        <p className="text-center text-[13px] text-muted">
          © {new Date().getFullYear()} {profile.name}. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4">
          <span className="label text-muted">{footer.connect}</span>
          <ul className="flex gap-2">
            {links.map(({ label, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-lg border border-line text-silver transition-all duration-300 hover:border-accent/50 hover:text-accent"
                >
                  <Icon size={17} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
