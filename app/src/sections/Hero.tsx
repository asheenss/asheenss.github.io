import { ArrowDownRight } from 'lucide-react'

import { site } from '@/config/site'
import { useClock } from '@/hooks/useClock'
import { scrollToHash } from '@/lib/scroll'

export function Hero() {
  const time = useClock('Asia/Dubai')
  const [first, ...rest] = site.name.split(' ')

  return (
    <section id="home" className="hero" data-layout="centered">
      <div className="hero-top">
        <div className="hero-eyebrow">{site.role}</div>
        <div className="hero-tag">
          {site.location} · {site.year}
          <small>Local time {time} GST</small>
        </div>
      </div>

      <h1 className="sr-only">
        {site.name} — {site.role}, {site.location}
      </h1>
      <div className="hero-headline" aria-hidden="true">
        <span>
          <span className="word">{first}</span>{' '}
        </span>
        <span>
          <span className="word">{rest.join(' ')}</span>
        </span>
      </div>

      <div className="hero-bottom">
        <p className="hero-blurb">{site.description}</p>
        <div className="hero-mid">
          Scroll <span aria-hidden="true">↓</span>
        </div>
        <div className="hero-cta-wrap">
          <div className="hero-cta-label">
            See the
            <br />
            work.
          </div>
          <a
            href="#work"
            className="hero-cta"
            aria-label="See the work"
            onClick={(e) => {
              e.preventDefault()
              scrollToHash('#work')
            }}
          >
            <ArrowDownRight size={28} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
