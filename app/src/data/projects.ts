import type { HeadingParts, Project } from '@/types'

export const workHeading: HeadingParts = {
  text: 'Built with engineering,',
  emphasis: 'designed for real-world impact.',
}

// Add `website` only for publicly available, verified URLs. Keep descriptions non-confidential.
// `year` is omitted where it has not been confirmed.
export const projects: Project[] = [
  {
    number: '01',
    year: '2026',
    title: 'AWQAF Quran LMS',
    description: 'Learning management platform with student and family registration, enrollment, examinations and identity integrations.',
    category: 'Government / Education',
    stack: ['.NET', 'Node.js', 'PostgreSQL', 'UAE Pass SSO'],
  },
  {
    number: '02',
    year: '2026',
    title: 'National Zakat Platform (NPZ)',
    description: 'Enterprise platform development and security improvements for a national Zakat payment platform.',
    category: 'Government / FinTech',
    stack: ['.NET Core', 'C#', 'Angular', 'SQL Server'],
  },
  {
    number: '03',
    title: 'Awqaf Service Management System',
    description: 'Enterprise service-request platform for car, flight, hotel and hospitality management, with multi-level approval workflows, role-based access control, resource allocation and request tracking across departments.',
    category: 'Government / Enterprise',
    stack: ['React', 'TypeScript', 'ASP.NET Core', 'Entity Framework Core', 'SQL Server'],
  },
  {
    number: '04',
    title: 'NextGenERP',
    description: 'Modernisation of a legacy enterprise resource planning platform using a modular architecture.',
    category: 'Enterprise / ERP',
    stack: ['.NET', 'React', 'TypeScript', 'SQL Server'],
  },
  {
    number: '05',
    title: 'NexusOps AI',
    description: 'An enterprise AI operating system concept built around modular infrastructure and intelligent orchestration.',
    category: 'Artificial Intelligence',
    stack: ['Python', 'FastAPI', 'LLMs', 'Docker'],
  },
  {
    number: '06',
    title: 'AI Coding Workspace',
    description: 'An AI-assisted coding workspace designed to support developer productivity.',
    category: 'AI / Developer Productivity',
    stack: ['Python', 'FastAPI', 'React', 'MongoDB'],
  },
  {
    number: '07',
    year: '2025',
    title: 'MT5 Python Trading Backend',
    description: 'Production-ready Python trading infrastructure for professional forex and crypto operations, with comprehensive risk management and automated protection systems.',
    category: 'FinTech / Trading',
    stack: ['Python', 'MetaTrader 5', 'Risk Management'],
  },
  {
    number: '08',
    year: '2025',
    title: 'MT5 Data Engine',
    description: 'FastAPI microservice that fetches trading-account data from an ingestor API, applies management strategies and serves results through REST endpoints with scheduled daily refreshes.',
    category: 'FinTech / Data',
    stack: ['Python', 'FastAPI', 'REST APIs', 'JSON'],
  },
  {
    number: '09',
    year: '2025',
    title: 'MT5 Overview',
    description: 'FastAPI service that collects portfolio data from multiple trading accounts, monitors server health, exposes equity-curve queries and sends Telegram alerts.',
    category: 'FinTech / Monitoring',
    stack: ['Python', 'FastAPI', 'REST APIs', 'Telegram'],
  },
  {
    number: '10',
    title: 'ESAT ERP Web Application',
    description: 'Full-scale ERP for small and medium businesses, designed and implemented end to end and hosted on Oracle Cloud.',
    category: 'Enterprise / ERP',
    stack: ['.NET Core', 'AngularJS', 'Angular', 'Oracle'],
  },
  {
    number: '11',
    title: 'Smart ERP — HR & Payroll',
    description: 'HR and employee management system with payroll processing, attendance tracking and performance evaluation.',
    category: 'Enterprise / HR',
    stack: ['ASP.NET MVC', 'C#', 'SQL Server'],
  },
  {
    number: '12',
    title: 'IMS-POS Modernisation',
    description: 'Migration of legacy inventory and point-of-sale systems to an open frontend and PostgreSQL backend, with reports moved from Crystal Reports to SSRS.',
    category: 'Retail / Modernisation',
    stack: ['.NET Core', 'PostgreSQL', 'SSRS', 'Azure Service Fabric'],
  },
  {
    number: '13',
    title: 'SOSPES Parking Permits',
    description: 'Microservice that reads vehicle number plates for residential parking permits, plus a document management system.',
    category: 'Government / Municipal',
    stack: ['.NET Core', 'Microservices', 'REST APIs'],
  },
]
