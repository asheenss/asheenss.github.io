import type { SiteContact } from '@/types'

export const site = {
  name: 'Asheen Shams',
  brand: 'ASHEEN SHAMS',
  role: 'Senior Full Stack Developer',
  location: 'Abu Dhabi, UAE',
  year: '2026',
  availability: 'Open to opportunities',
  description:
    'End-to-end software engineering. 10+ years building enterprise applications, government platforms, scalable backend systems and AI-powered solutions.',
  /** Optional. Set to a real URL to show "Blog" in the navigation; leave null to hide it. */
  blogUrl: null as string | null,
}

export const contact: SiteContact = {
  email: 'asheenshams@gmail.com',
  location: 'Abu Dhabi, UAE',
  linkedinUrl: 'https://www.linkedin.com/in/asheens/',
  githubUrl: 'https://github.com/asheenss',
  resumeUrl: '/resume.pdf',
}
