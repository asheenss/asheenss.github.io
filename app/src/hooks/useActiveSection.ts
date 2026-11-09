import { useEffect, useState } from 'react'

/**
 * Returns the id of the section currently under the reading line (~30% down
 * the viewport). Elements are resolved at scroll time so lazily mounted
 * sections are picked up as soon as they render.
 */
export function useActiveSection(sectionIds: string[]): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '')
  const key = sectionIds.join(',')

  useEffect(() => {
    const ids = key ? key.split(',') : []
    let frame = 0

    const update = () => {
      frame = 0
      const line = window.innerHeight * 0.3
      let current = ids[0] ?? ''
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= line) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      if (atBottom && ids.length > 0) current = ids[ids.length - 1]
      setActiveId(current)
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    // Lazy sections change page height after mount; re-evaluate shortly after.
    const settle = window.setTimeout(update, 1200)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.clearTimeout(settle)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [key])

  return activeId
}
