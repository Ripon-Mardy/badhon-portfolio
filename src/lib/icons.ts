/**
 * Maps the icon names used in content.json to lucide-react components.
 * Add a new entry here if you reference another lucide icon in the JSON.
 */
import {
  BookOpen, Car, ChefHat, ClipboardList, Compass, FileText, FlaskConical, Globe, GraduationCap,
  Hammer, Keyboard, Lightbulb, MapPin, MessageCircle, Mic, Music, PenLine, RefreshCw, Send, Sheet,
  Sparkles, Target, TrendingUp, Trophy, Users, type LucideIcon,
} from 'lucide-react'

export const icons = {
  BookOpen, Car, ChefHat, ClipboardList, Compass, FileText, FlaskConical, Globe, GraduationCap,
  Hammer, Keyboard, Lightbulb, MapPin, MessageCircle, Mic, Music, PenLine, RefreshCw, Send, Sheet,
  Sparkles, Target, TrendingUp, Trophy, Users,
} satisfies Record<string, LucideIcon>

/** Look up an icon by name; falls back to Sparkles for unknown names. */
export function getIcon(name: string): LucideIcon {
  return (icons as Record<string, LucideIcon>)[name] ?? Sparkles
}

/** Shared thin-line icon style used across the site. */
export const ICON_STROKE = 1.25
