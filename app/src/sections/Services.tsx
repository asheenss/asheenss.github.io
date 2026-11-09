import { Reveal } from '@/components/Reveal'
import { SectionHeading } from '@/components/SectionHeading'
import { services, servicesHeading } from '@/data/services'

export function Services() {
  return (
    <section id="services" className="shell">
      <SectionHeading number="03" label="Services" heading={servicesHeading} />
      <div className="principles">
        {services.map((s, i) => (
          <Reveal key={s.number} className="principle" delay={(i % 3) * 0.06}>
            <div className="num">{s.number}</div>
            <h3>{s.title}.</h3>
            <p>{s.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
