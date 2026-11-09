import { Download, Mail } from 'lucide-react'

import { Reveal } from '@/components/Reveal'
import { contact } from '@/config/site'
import { contactContent } from '@/data/contact'

export function Contact() {
  const { heading } = contactContent
  return (
    <section id="contact" className="cta shell">
      <Reveal>
        <h2>
          {heading.text} <em>{heading.emphasis}</em>
        </h2>
        <p className="lede">{contactContent.description}</p>
      </Reveal>
      <Reveal className="row">
        <a className="btn btn-primary" href={`mailto:${contact.email}`}>
          <Mail size={16} aria-hidden="true" />
          {contact.email}
        </a>
        <a className="btn btn-ghost" href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="btn btn-ghost" href={contact.githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a className="btn btn-ghost" href={contact.resumeUrl} download>
          <Download size={16} aria-hidden="true" />
          Download CV
        </a>
      </Reveal>
      <div className="loc">{contact.location}</div>
    </section>
  )
}
