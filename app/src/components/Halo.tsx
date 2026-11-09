import { useEffect, useRef } from 'react'

import { swarmCursors } from '@/config/cursors'

/**
 * Cursor effect: a soft accent glow plus a small swarm of named, multiplayer-style
 * pointers that trail the real mouse. Fine pointers only (hidden via CSS on touch).
 */
export function Halo() {
  const haloRef = useRef<HTMLDivElement>(null)
  const curRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const halo = haloRef.current
    if (!halo || !window.matchMedia('(hover: hover)').matches) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const mouse = { x: -200, y: -200 }
    const glow = { x: -200, y: -200 }
    const pos = swarmCursors.map(() => ({ x: -200, y: -200 }))
    let visible = false
    let raf = 0

    const setVisible = (v: boolean) => {
      visible = v
      halo.style.opacity = v ? '1' : '0'
      curRefs.current.forEach((el) => el && (el.style.opacity = v && !reduced ? '1' : '0'))
    }

    const tick = (t: number) => {
      glow.x += (mouse.x - glow.x) * 0.12
      glow.y += (mouse.y - glow.y) * 0.12
      halo.style.transform = `translate3d(${glow.x}px, ${glow.y}px, 0) translate(-50%, -50%)`

      if (!reduced) {
        swarmCursors.forEach((c, i) => {
          // gentle idle drift so the swarm feels alive
          const driftX = Math.sin(t / 900 + i * 1.7) * 7
          const driftY = Math.cos(t / 1100 + i * 2.3) * 7
          const p = pos[i]
          p.x += (mouse.x + c.dx + driftX - p.x) * c.ease
          p.y += (mouse.y + c.dy + driftY - p.y) * c.ease
          const el = curRefs.current[i]
          if (el) el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`
        })
      }
      raf = requestAnimationFrame(tick)
    }

    const move = (e: PointerEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      if (!visible) {
        // snap on first move so nothing flies in from the corner
        glow.x = mouse.x
        glow.y = mouse.y
        pos.forEach((p, i) => {
          p.x = mouse.x + swarmCursors[i].dx
          p.y = mouse.y + swarmCursors[i].dy
        })
        setVisible(true)
      }
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', move)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [])

  return (
    <div className="swarm" aria-hidden="true">
      <div ref={haloRef} className="halo" />
      {swarmCursors.map((c, i) => (
        <div
          key={c.label}
          ref={(el) => {
            curRefs.current[i] = el
          }}
          className={`sw-cur${c.color === 'ink' ? ' sw-ink' : ''}`}
          style={c.color === 'ink' ? undefined : ({ '--c': c.color } as React.CSSProperties)}
        >
          <svg width="18" height="22" viewBox="0 0 18 22">
            <path
              d="M1.5 1.5v16.2l4.6-4.3 3.2 7 2.9-1.3-3.1-6.9h6.3z"
              fill="currentColor"
              stroke="#fff"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <b>{c.label}</b>
        </div>
      ))}
    </div>
  )
}
