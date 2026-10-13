/**
 * Single source of truth for every piece of text on the site.
 * Edit `content.json` (same folder) to change your name, photo, email, phone, etc.
 * This file only re-exports it with types so components stay type-safe.
 */
import raw from './content.json'

export const content = raw
export type Content = typeof raw

export const { site, profile, socials, nav, navCta, hero, stats, careerGoals, coreSkills, professionalSkills, education, about, hobbies, contact, footer } = content
