import type { HeadingParts, Service } from '@/types'

export const servicesHeading: HeadingParts = { text: 'What I', emphasis: 'actually do.' }

export const services: Service[] = [
  { number: '01', title: 'Architecture', description: 'System design, modular monoliths, domain modelling and modernisation of legacy platforms.' },
  { number: '02', title: 'Full Stack Development', description: 'Production web applications with React, Angular and TypeScript on top of solid backends.' },
  { number: '03', title: 'Backend & API Engineering', description: 'Secure, well-documented APIs and services in .NET, Node.js and Python, backed by relational and document stores.' },
  { number: '04', title: 'Cloud & DevOps', description: 'Containerised deployments, CI/CD and cloud infrastructure on Azure and AWS.' },
  { number: '05', title: 'AI Engineering', description: 'LLM integration, retrieval, orchestration and agentic workflows that hold up in production.' },
  { number: '06', title: 'Security & Quality', description: 'Authentication, secure coding, remediation and testing practices built in, not bolted on.' },
]
