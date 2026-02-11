export interface ArticleSection {
  id: string
  title: string
  paragraphs: string[]
  bullets?: string[]
}

export interface ArticleItem {
  slug: string
  title: string
  description: string
  category: 'onboarding' | 'register' | 'reference'
  content?: string
  /** Searchable full text body for content search */
  body?: string
  headings?: { id: string; text: string }[]
  /** Structured content sections (from PDF / docs) */
  sections?: ArticleSection[]
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
    body: 'Invite users to your system. Add team members, assign roles, and manage access. Use the invite flow to send invitations by email. Users can be invited as System Owner, System Contributor, or other roles.',
    sections: [
      {
        id: 'invite-users',
        title: 'Invite Users',
        paragraphs: [
          'System Owners can invite users to collaborate on a registered system.',
          'To invite users:',
        ],
        bullets: [
          'Open your system record.',
          'Navigate to the Access & Roles section.',
          'Click Invite User.',
          'Enter the user\'s official email address.',
          'Assign a role: Editor, Viewer, Risk Contributor, or System Owner (if applicable).',
          'Click Send Invite.',
        ],
      },
      {
        id: 'invite-notification',
        title: '',
        paragraphs: ['Invited users will receive a notification once access is granted.'],
      },
    ],
  },
  { slug: 'create-system', title: 'Create System', description: 'Register a new system.', category: 'register',
    body: 'Create and register a new system in ATAS. Fill in system details, name, and classification. Register your system to start governance tracking.',
    sections: [
      {
        id: 'create-system',
        title: 'Create System',
        paragraphs: [
          'A System represents a complete digital product, application, or service.',
          'To create:',
        ],
        bullets: [
          'Click Create New System',
          'Complete mandatory fields: System Name, Owning Agency, Business Owner, Technical Owner, Purpose / Description, Deployment Model (On-prem / Cloud / SaaS)',
          'Save draft or Submit.',
        ],
      },
      {
        id: 'create-system-workflow',
        title: '',
        paragraphs: ['Once submitted, the system enters review workflow.'],
      },
    ],
  },
  { slug: 'create-sub-system', title: 'Create Sub System', description: 'Create a subsystem under a system.', category: 'register',
    body: 'Create a sub system under an existing parent system. Sub systems inherit settings and can have their own components and dependencies.',
    sections: [
      {
        id: 'create-sub-system',
        title: 'Create Sub-System',
        paragraphs: [
          'A Sub-System represents a module, component, or independently managed application under a parent system.',
          'Use Sub-Systems when:',
        ],
        bullets: [
          'Architecture is modular',
          'Risk profiles differ',
          'Separate hosting environments exist',
          'Lifecycle phases differ',
        ],
      },
      {
        id: 'create-sub-system-steps',
        title: 'To create',
        paragraphs: [],
        bullets: [
          'Open the Parent System.',
          'Select Add Sub-System.',
          'Provide: Name, Hosting model, Risk attributes.',
          'Save.',
        ],
      },
      {
        id: 'create-sub-system-inherit',
        title: '',
        paragraphs: ['Sub-Systems inherit certain data from parent systems but allow independent risk assessment.'],
      },
    ],
  },
  { slug: 'system-lifecycle', title: 'System Lifecycle', description: 'System lifecycle stages and governance criteria from POC to Removed.', category: 'register',
    body: 'System lifecycle stages POC POV Scale Decommissioning Removed. Each phase has governance and compliance criteria. Proof of concept, proof of value, scale, decommissioning, removed.' },
  { slug: 'rml', title: 'RML', description: 'Determining Your System\'s Risk Materiality Level (RML)', category: 'reference',
    body: 'Risk Materiality Level RML determines how critical your system is. Assess risk materiality based on impact and likelihood. RML affects governance and reporting requirements.',
    sections: [
      {
        id: 'rml',
        title: 'RML',
        paragraphs: [
          'RML indicates the overall governance risk of a system.',
          'It is derived based on:',
        ],
        bullets: [
          'Security Classification',
          'Information Sensitivity',
          'System Criticality',
          'Dependencies',
        ],
      },
      {
        id: 'rml-requirements',
        title: 'Higher RML systems require',
        paragraphs: [],
        bullets: [
          'Stronger controls',
          'Additional approvals',
          'More frequent reviews',
        ],
      },
      {
        id: 'rml-auto',
        title: '',
        paragraphs: ['RML may auto-calculate depending on configuration.'],
      },
    ],
  },
  { slug: 'security-classification', title: 'Security Classification', description: 'Assigning Security Classifications to your system.', category: 'reference',
    body: 'Security classification defines how sensitive your system and data are. Assign security classifications based on data sensitivity and regulatory requirements.',
    sections: [
      {
        id: 'security-classification',
        title: 'Security Classification',
        paragraphs: [
          'Security Classification defines the government classification level of system data.',
          'Common levels:',
        ],
        bullets: [
          'Unclassified',
          'Restricted',
          'Confidential',
          'Secret',
        ],
      },
      {
        id: 'security-determines',
        title: 'Classification determines',
        paragraphs: [],
        bullets: [
          'Hosting controls',
          'Access control requirements',
          'Network zoning',
          'Encryption obligations',
        ],
      },
      {
        id: 'security-select',
        title: '',
        paragraphs: ['Select the highest applicable classification handled by the system.'],
      },
    ],
  },
  { slug: 'information-sensitivity', title: 'Information Sensitivity', description: 'How to Categorize Your Information', category: 'reference',
    body: 'Information sensitivity and data classification. Categorize your information by sensitivity level. Use labels and classifications for data handling.',
    sections: [
      {
        id: 'information-sensitivity',
        title: 'Information Sensitivity',
        paragraphs: [
          'Information Sensitivity reflects the impact if data is disclosed, altered, or unavailable.',
          'Consider:',
        ],
        bullets: [
          'Personal data',
          'Financial data',
          'National security implications',
          'Reputational risk',
        ],
      },
      {
        id: 'sensitivity-impacts',
        title: '',
        paragraphs: ['Sensitivity impacts governance and RML scoring.'],
      },
    ],
  },
  { slug: 'system-criticality', title: 'System Criticality', description: 'Defining System Criticality what it means to your system.', category: 'reference',
    body: 'System criticality defines how important the system is to operations. Critical systems have higher availability and resilience requirements.',
    sections: [
      {
        id: 'system-criticality',
        title: 'System Criticality',
        paragraphs: [
          'System Criticality measures business impact if the system becomes unavailable.',
          'Categories may include:',
        ],
        bullets: [
          'Low',
          'Moderate',
          'High',
          'Mission Critical',
        ],
      },
      {
        id: 'criticality-factors',
        title: 'Factors',
        paragraphs: [],
        bullets: [
          'Number of users',
          'Citizen impact',
          'Operational dependency',
          'Regulatory consequences',
        ],
      },
    ],
  },
  { slug: 'dependencies', title: 'Dependencies', description: 'How to map Dependencies, it\'s importance and benefit.', category: 'reference',
    body: 'Map dependencies between systems and components. Dependencies show what your system relies on. Document upstream and downstream dependencies.',
    sections: [
      {
        id: 'dependencies',
        title: 'Dependencies',
        paragraphs: [
          'Dependencies refer to systems or services relied upon.',
          'Examples:',
        ],
        bullets: [
          'Identity management',
          'Payment gateway',
          'External APIs',
          'Databases',
          'Shared infrastructure',
        ],
      },
      {
        id: 'dependencies-documenting',
        title: 'Documenting dependencies enables',
        paragraphs: [],
        bullets: [
          'Risk propagation analysis',
          'Resiliency assessment',
          'Impact simulation',
        ],
      },
    ],
  },
  { slug: 'components', title: 'Components', description: 'Defining System Components and what they mean.', category: 'reference',
    body: 'System components are the building blocks of your system. Define components, their roles, and how they connect. Components can be applications, services, or infrastructure.',
    sections: [
      {
        id: 'components',
        title: 'Components',
        paragraphs: [
          'Components represent technical building blocks within a system.',
          'Examples:',
        ],
        bullets: [
          'Application server',
          'Database',
          'API layer',
          'Frontend portal',
          'Middleware',
        ],
      },
      {
        id: 'component-tracking',
        title: 'Component tracking supports',
        paragraphs: [],
        bullets: [
          'Architectural transparency',
          'Risk tracing',
          'Asset management alignment',
        ],
      },
    ],
  },
  { slug: 'resiliency', title: 'Resiliency', description: 'System resiliency and availability.', category: 'reference',
    body: 'Resiliency and availability requirements. Plan for failure and recovery. Document backup, redundancy, and recovery procedures.',
    sections: [
      {
        id: 'resiliency',
        title: 'Resiliency',
        paragraphs: [
          'Resiliency captures system ability to recover from disruptions.',
          'Include:',
        ],
        bullets: [
          'Backup strategy',
          'Disaster Recovery plan',
          'RTO (Recovery Time Objective)',
          'RPO (Recovery Point Objective)',
          'High Availability setup',
        ],
      },
      {
        id: 'resiliency-impacts',
        title: 'Resiliency impacts',
        paragraphs: [],
        bullets: [
          'Risk acceptance',
          'Criticality validation',
          'Policy compliance',
        ],
      },
    ],
  },
  { slug: 'hosting', title: 'Hosting', description: 'Hosting and infrastructure.', category: 'reference',
    body: 'Hosting and infrastructure details. Where your system is hosted, cloud or on-premise. Document hosting environment and infrastructure.',
    sections: [
      {
        id: 'hosting',
        title: 'Hosting',
        paragraphs: [
          'Identify where the system is hosted:',
        ],
        bullets: [
          'On-Premise',
          'GovCloud',
          'Commercial Cloud',
          'SaaS Vendor',
          'Hybrid',
        ],
      },
      {
        id: 'hosting-include',
        title: 'Include',
        paragraphs: [],
        bullets: [
          'Data location',
          'Vendor details',
          'Security certifications (if applicable)',
        ],
      },
      {
        id: 'hosting-influences',
        title: 'Hosting choice influences',
        paragraphs: [],
        bullets: [
          'Security review requirements',
          'Data residency validation',
          'Compliance obligations',
        ],
      },
    ],
  },
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
