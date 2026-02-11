export interface ArticleItem {
  slug: string
  title: string
  description: string
  category: 'onboarding' | 'register' | 'reference'
  content?: string
  /** Searchable full text body for content search */
  body?: string
  headings?: { id: string; text: string }[]
}

export const articles: ArticleItem[] = [
  { slug: 'get-access', title: 'Get Access', description: 'Find guides, tutorials, and answers to your questions.', category: 'onboarding',
    body: 'Get Access to ATAS. Register and complete governance by identifying an Agency Coordinator and submitting your request. System Owner DSM can register. Team Members need to request access from System Owner or Agency Coordinator. Agency Coordinator acts as gatekeeper. Role profiles include System Owner, System Contributor, and Appointment CIO CISO. Vendors request access through System Owner or Agency Coordinator.',
    headings: [
      { id: 'system-owner', text: 'System Owner' },
      { id: 'team-member', text: 'Team Member' },
      { id: 'agency-coordinator', text: 'Agency Coordinator' },
      { id: 'vendor', text: 'Vendor' },
    ],
    content: 'get-access' },
  { slug: 'invite-users', title: 'Invite Users', description: 'How to invite users to your system.', category: 'onboarding',
    body: 'Invite users to your system. Add team members, assign roles, and manage access. Use the invite flow to send invitations by email. Users can be invited as System Owner, System Contributor, or other roles.' },
  { slug: 'create-system', title: 'Create System', description: 'Register a new system.', category: 'register',
    body: 'Create and register a new system in ATAS. Fill in system details, name, and classification. Register your system to start governance tracking.' },
  { slug: 'create-sub-system', title: 'Create Sub System', description: 'Create a subsystem under a system.', category: 'register',
    body: 'Create a sub system under an existing parent system. Sub systems inherit settings and can have their own components and dependencies.' },
  { slug: 'system-lifecycle', title: 'System Lifecycle', description: 'System lifecycle stages and governance criteria from POC to Removed.', category: 'register',
    body: 'System lifecycle stages POC POV Scale Decommissioning Removed. Each phase has governance and compliance criteria. Proof of concept, proof of value, scale, decommissioning, removed.' },
  { slug: 'rml', title: 'RML', description: 'Determining Your System\'s Risk Materiality Level (RML)', category: 'reference',
    body: 'Risk Materiality Level RML determines how critical your system is. Assess risk materiality based on impact and likelihood. RML affects governance and reporting requirements.' },
  { slug: 'security-classification', title: 'Security Classification', description: 'Assigning Security Classifications to your system.', category: 'reference',
    body: 'Security classification defines how sensitive your system and data are. Assign security classifications based on data sensitivity and regulatory requirements.' },
  { slug: 'information-sensitivity', title: 'Information Sensitivity', description: 'How to Categorize Your Information', category: 'reference',
    body: 'Information sensitivity and data classification. Categorize your information by sensitivity level. Use labels and classifications for data handling.' },
  { slug: 'system-criticality', title: 'System Criticality', description: 'Defining System Criticality what it means to your system.', category: 'reference',
    body: 'System criticality defines how important the system is to operations. Critical systems have higher availability and resilience requirements.' },
  { slug: 'dependencies', title: 'Dependencies', description: 'How to map Dependencies, it\'s importance and benefit.', category: 'reference',
    body: 'Map dependencies between systems and components. Dependencies show what your system relies on. Document upstream and downstream dependencies.' },
  { slug: 'components', title: 'Components', description: 'Defining System Components and what they mean.', category: 'reference',
    body: 'System components are the building blocks of your system. Define components, their roles, and how they connect. Components can be applications, services, or infrastructure.' },
  { slug: 'resiliency', title: 'Resiliency', description: 'System resiliency and availability.', category: 'reference',
    body: 'Resiliency and availability requirements. Plan for failure and recovery. Document backup, redundancy, and recovery procedures.' },
  { slug: 'hosting', title: 'Hosting', description: 'Hosting and infrastructure.', category: 'reference',
    body: 'Hosting and infrastructure details. Where your system is hosted, cloud or on-premise. Document hosting environment and infrastructure.' },
  { slug: 'glossary', title: 'Glossary', description: 'Terms and definitions.', category: 'reference',
    body: 'Glossary of terms and definitions. ATAS terminology, acronyms, and key concepts. RML, DSM, Agency Coordinator, System Owner, and more.' },
]

export const homeArticleCards = [
  { slug: 'rml', title: 'RML', description: 'Determining Your System\'s Risk Materiality Level (RML)' },
  { slug: 'information-sensitivity', title: 'Data Classification', description: 'How to Categorize Your Information' },
  { slug: 'security-classification', title: 'Security Classification', description: 'Assigning Security Classifications to your system.' },
  { slug: 'system-criticality', title: 'System Criticality', description: 'Defining System Criticality what it means to your system.' },
  { slug: 'dependencies', title: 'Dependencies', description: 'How to map Dependencies, it\'s importance and benefit.' },
  { slug: 'components', title: 'Components', description: 'Defining System Components and what they mean.' },
]

/** Score: title match = 3, description/slug = 2, body/content = 1. Higher first. */
export function searchArticles(query: string): ArticleItem[] {
  const q = query.toLowerCase().trim()
  if (!q) return []

  const scored = articles
    .map((a) => {
      let score = 0
      const titleLower = a.title.toLowerCase()
      const descLower = a.description.toLowerCase()
      const slugLower = a.slug.toLowerCase()
      const bodyLower = (a.body ?? '').toLowerCase()

      if (titleLower.includes(q)) score += 3
      if (descLower.includes(q) || slugLower.includes(q)) score += 2
      if (bodyLower.includes(q)) score += 1

      return { article: a, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)

  return scored.map(({ article }) => article)
}
