export type NavItem = { label: string; href: string; external?: boolean }

export type SiteContact = {
  email: string
  location: string
  linkedinUrl: string
  githubUrl: string
  resumeUrl: string
}

/** Heading split into plain text and an emphasised tail (rendered italic/muted). */
export type HeadingParts = { text: string; emphasis?: string }

export type JourneyChapter = {
  year: string
  title: string
  headline: string
  body: string
  tags: string[]
  role: string
  /** Employer(s) for this chapter. */
  company: string
  /** Human-readable date range. */
  period: string
}

export type Service = { number: string; title: string; description: string }

export type Project = {
  number: string
  /** Leave undefined when the year is not confirmed. */
  year?: string
  title: string
  description: string
  category: string
  stack: string[]
  website?: { label: string; url: string }
}
