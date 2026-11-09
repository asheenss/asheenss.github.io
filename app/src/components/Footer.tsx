import { navItems } from '@/config/navigation'
import { contact, site } from '@/config/site'
import { scrollToHash } from '@/lib/scroll'

export function Footer() {
  return (
    <footer className="shell">
      <div>
        <b>{site.name}</b>
        {site.role}. End-to-end software engineering for enterprise, government and AI-powered products.
      </div>
      <div>
        <b>Contact</b>
        <ul>
          <li>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </li>
          <li>{contact.location}</li>
          <li>
            <a href={contact.linkedinUrl} target="_blank" rel="noopener noreferrer">
              LinkedIn
            </a>
          </li>
          <li>
            <a href={contact.githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </li>
        </ul>
      </div>
      <div>
        <b>Index</b>
        <ul>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                {...(item.external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {
                      onClick: (e: React.MouseEvent) => {
                        e.preventDefault()
                        scrollToHash(item.href)
                      },
                    })}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="colophon">
        © 2026 {site.name}
        <br />
        Built with Visual Studio, Visual Studio Code.
        <br />
        10+ years · Hand-coded.
      </div>
    </footer>
  )
}
