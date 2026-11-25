// Single source of truth for identity, links and SEO copy.
// Edit here first — pages, meta tags and JSON-LD all read from this file.

export const SITE = {
  url: 'https://mohamedazouz.com',
  name: 'Mohamed Azouz',
  locale: 'en_GB',
  lang: 'en-GB',
  ogImage: '/og.png',
  ogImageAlt: 'Mohamed Azouz · Engineering Leader · Streaming & Agentic AI · London',
} as const;

export const PERSON = {
  name: 'Mohamed Azouz',
  givenName: 'Mohamed',
  familyName: 'Azouz',
  headline: 'Senior Engineering Manager · Engineering Leader · London',
  jobTitle: 'Senior Engineering Manager',
  description:
    'Engineering leader in London building large-scale streaming platforms and championing AI-driven development and agentic AI. People and culture first.',
  email: 'me@mohamedazouz.com',
  city: 'London',
  country: 'GB',
  employer: { name: 'Skydance', url: 'https://www.skydance.com' },
  alumniOf: { name: 'Cairo University', url: 'https://cu.edu.eg' },
  knowsAbout: [
    'Engineering Leadership',
    'Engineering Management',
    'Team Building',
    'Mentoring',
    'Agentic AI',
    'AI Agents',
    'AI-Driven Development',
    'Large Language Models',
    'Video Streaming',
    'Content Delivery Networks',
    'Platform Engineering',
    'Distributed Systems',
    'Cloud Infrastructure',
    'Amazon Web Services',
    'Kubernetes',
    'Site Reliability Engineering',
    'Observability',
    'Go',
    'Python',
  ],
} as const;

export const LINKS = {
  github: 'https://github.com/mohamedazouz',
  linkedin: 'https://www.linkedin.com/in/mohamedazouz/',
  email: `mailto:${PERSON.email}`,
  awsVideo: 'https://www.youtube.com/watch?v=pOsngPbuzrU',
} as const;

// Per-page SEO copy. Titles < 60 chars, descriptions 150–160 chars.
export const PAGES = {
  home: {
    title: 'Mohamed Azouz · Engineering Leader & AI, London',
    description:
      'Mohamed Azouz is a London-based engineering leader and senior engineering manager building large-scale streaming platforms and championing agentic AI.',
  },
  about: {
    title: 'About Mohamed Azouz · Senior Engineering Manager',
    description:
      'Engineering leader with 15+ years across Skydance, Delivery Hero and Zalando. People-first leadership, streaming at scale and agentic AI in engineering.',
  },
  articles: {
    title: 'Articles · Mohamed Azouz',
    description:
      'Notes by Mohamed Azouz on engineering leadership, streaming platforms at scale, AI-driven development and building with agentic AI. First post coming soon.',
  },
  notFound: {
    title: 'Page not found · Mohamed Azouz',
    description:
      'This page does not exist. Head back to the home page of Mohamed Azouz, engineering leader in London working on streaming platforms and agentic AI.',
  },
} as const;

export const NAV = [
  { href: '/about/', label: 'About' },
  { href: '/articles/', label: 'Articles' },
] as const;

export const CAREER = [
  { years: '2022 — now', role: 'Engineering Manager', org: 'Skydance (formerly Warner Bros. Discovery)' },
  { years: '2018 — 2022', role: 'Engineering Manager / Staff Engineer', org: 'Delivery Hero' },
  { years: '2016 — 2018', role: 'Software Engineer', org: 'Zalando' },
  { years: '2015 — 2016', role: 'Full Stack Engineer', org: 'Parlio (acquired by Quora)' },
  { years: '2010 — 2015', role: 'Engineer', org: 'HP Enterprise Services & others' },
] as const;
