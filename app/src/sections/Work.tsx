import { ArrowUpRight } from 'lucide-react'

import { SectionHeading } from '@/components/SectionHeading'
import { projects, workHeading } from '@/data/projects'

export function Work() {
  return (
    <section id="work" className="shell work">
      <SectionHeading number="04" label="Selected Work" heading={workHeading} />
      <ol>
        {projects.map((p) => (
          <li key={p.number} className="stop">
            <div className="yr">
              <i>{p.number}</i>
              {p.year ?? '—'}
            </div>
            <div className="body">
              <h3>
                <span className="project-link">{p.title}</span>
              </h3>
              <p className="desc">{p.description}</p>
              <div className="badges">
                {p.stack.map((t) => (
                  <span className="badge" key={t}>
                    {t}
                  </span>
                ))}
                {p.website && (
                  <a className="badge" href={p.website.url} target="_blank" rel="noopener noreferrer">
                    {p.website.label} <ArrowUpRight size={12} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
            <div className="role">{p.category}</div>
          </li>
        ))}
      </ol>
    </section>
  )
}
