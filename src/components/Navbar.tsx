import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

import { navItems, sectionIds } from '@/config/navigation'
import { contact, site } from '@/config/site'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useScrollLock } from '@/hooks/useScrollLock'
import type { Theme } from '@/hooks/useTheme'
import { scrollToHash } from '@/lib/scroll'
import type { NavItem } from '@/types'

type Props = { theme: Theme; onToggleTheme: () => void }

export function Navbar({ theme, onToggleTheme }: Props) {
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useScrollLock(open)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.85)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e: React.MouseEvent, item: NavItem) => {
    if (item.external) return
    e.preventDefault()
    setOpen(false)
    window.setTimeout(() => {
      scrollToHash(item.href)
      history.replaceState(null, '', item.href)
    }, 0)
  }
  const ext = (item: NavItem) => (item.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})

  return (
    <nav className={`nav${scrolled ? ' is-scrolled' : ''}${open ? ' menu-open' : ''}`} aria-label="Primary">
      <a className="logo" href="#home" onClick={(e) => go(e, { label: 'Home', href: '#home' })}>
        <span className="logo-mark">A</span>
        <span>{site.brand}</span>
      </a>

      <ul className="links">
        {navItems.map((item) => (
          <li key={item.label}>
            <a
              href={item.href}
              className={active === item.href.slice(1) ? 'active' : ''}
              aria-current={active === item.href.slice(1) ? 'true' : undefined}
              onClick={(e) => go(e, item)}
              {...ext(item)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <div className="availability">
          <span className="pulse" /> {site.availability}
        </div>
        <button
          type="button"
          className="icon-btn"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>
        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open} inert={!open}>
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={active === item.href.slice(1) ? 'active' : ''}
                onClick={(e) => go(e, item)}
                {...ext(item)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="mobile-menu-foot">
          {contact.email} · {contact.location}
        </div>
      </div>
    </nav>
  )
}
