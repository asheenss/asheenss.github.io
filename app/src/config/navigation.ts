import { site } from '@/config/site'
import type { NavItem } from '@/types'

export const navItems: NavItem[] = [
  { label: 'Journey', href: '#journey' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  ...(site.blogUrl ? [{ label: 'Blog', href: site.blogUrl, external: true }] : []),
  { label: 'Contact', href: '#contact' },
]

/** Section ids tracked for the active nav state (order = page order). */
export const sectionIds = ['home', 'journey', 'services', 'work', 'now', 'contact']
