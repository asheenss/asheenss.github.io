import { Plus } from 'lucide-react'
import { useState } from 'react'

import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { journey, journeyIntro } from '@/data/journey'

const canHover = () => window.matchMedia('(hover: hover)').matches

export function Journey() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="journey" className="shell">
      <SectionHeading number="02" label="Journey" heading={journeyIntro.heading} />
      <div className="journey">
        <Reveal className="rail">
          <b>{journeyIntro.range}</b>
          {journeyIntro.note}
        </Reveal>
        <ol onMouseLeave={() => canHover() && setOpen(null)}>
          {journey.map((c, i) => {
            const isOpen = open === i
            return (
              <li
                key={c.year}
                className={`stop${isOpen ? ' is-open' : ''}`}
                onMouseEnter={() => canHover() && setOpen(i)}
              >
                <div className="yr">
                  <i>0{i + 1}</i>
                  {c.year}
                </div>
                <div className="body">
                  <button
                    type="button"
                    className="stop-trigger"
                    aria-expanded={isOpen}
                    aria-controls={`chapter-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    onFocus={() => setOpen(i)}
                  >
                    <h3>
                      {c.title}
                      <Plus className="plus" size={22} aria-hidden="true" />
                    </h3>
                  </button>
                  <div id={`chapter-${i}`} className="expand" role="region" aria-label={c.title}>
                    <div>
                      <p className="stop-title">{c.headline}</p>
                      <p>{c.body}</p>
                      <p className="stop-meta">
                        {c.company} · {c.period}
                      </p>
                      <div className="tags">
                        {c.tags.map((t) => (
                          <span className="tag" key={t}>
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="role">
                  {c.role}
                  <small>{c.company}</small>
                </div>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
