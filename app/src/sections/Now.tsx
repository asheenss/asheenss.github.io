import { Reveal } from '@/components/Reveal'
import { nowContent } from '@/data/now'

export function Now() {
  const { heading } = nowContent
  return (
    <section id="now" className="shell">
      <div className="now">
        <Reveal>
          <div className="label">05 — Now</div>
          <h2>
            {heading.text} <em>{heading.emphasis}</em>
          </h2>
          <p>{nowContent.description}</p>
        </Reveal>
        <Reveal className="meta">
          <div>
            <b>Stack</b>
            <ul>
              {nowContent.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <b>Focus</b>
            <ul>
              {nowContent.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
