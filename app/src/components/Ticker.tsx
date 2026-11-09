import { technologies } from '@/data/technologies'

export function Ticker() {
  const items = [...technologies, ...technologies]
  return (
    <div className="marquee" role="region" aria-label={`Technologies: ${technologies.join(', ')}`}>
      <div className="marquee-track" aria-hidden="true">
        {items.map((t, i) => (
          <span key={`${t}-${i}`}>{t}</span>
        ))}
      </div>
    </div>
  )
}
