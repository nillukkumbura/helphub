import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useSearchParams, useLocation } from 'react-router-dom'
import styles from './Sidebar.module.css'

const navStructure = [
  {
    heading: 'Get Started',
    groups: [
      {
        label: 'Onboarding',
        links: [
          { slug: 'get-access', label: 'Get Access' },
          { slug: 'invite-users', label: 'Invite Users' },
        ],
      },
      {
        label: 'Register Your System',
        links: [
          { slug: 'create-system', label: 'Create System' },
          { slug: 'create-sub-system', label: 'Create Sub System' },
          { slug: 'system-lifecycle', label: 'System Lifecycle' },
        ],
      },
    ],
  },
  {
    heading: 'References',
    links: [
      { slug: 'rml', label: 'RML' },
      { slug: 'security-classification', label: 'Security Classification' },
      { slug: 'information-sensitivity', label: 'Information Sensitivity' },
      { slug: 'system-criticality', label: 'System Criticality' },
      { slug: 'dependencies', label: 'Dependencies' },
      { slug: 'components', label: 'Components' },
      { slug: 'resiliency', label: 'Resiliency' },
      { slug: 'hosting', label: 'Hosting' },
      { slug: 'glossary', label: 'Glossary' },
    ],
  },
]

export default function Sidebar() {
  const [searchParams] = useSearchParams()
  const urlSearch = searchParams.get('search') ?? ''
  const [searchQuery, setSearchQuery] = useState(urlSearch)
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    'Onboarding': true,
    'Register Your System': true,
  })
  const { slug } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setSearchQuery(urlSearch)
  }, [urlSearch])

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarScroll}>
        <form className={styles.searchForm} onSubmit={handleSearchSubmit}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Start searching...."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search articles"
          />
          <button type="submit" className={styles.searchBtn} aria-label="Search">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
              <path d="M9 15A6 6 0 1 0 9 3a6 6 0 0 0 0 12zM18 18l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </form>

        <div className={styles.homeLinkWrap}>
          <Link
            to="/"
            className={`${styles.navItem} ${styles.navItemHome} ${isHome ? styles.navItemActive : ''}`}
          >
            Home
          </Link>
        </div>

        <>
            {navStructure.map((section) => (
              <div key={section.heading} className={styles.section}>
                <h2 className={styles.heading}>{section.heading}</h2>
                {'groups' in section && section.groups ? (
                  section.groups.map((group) => (
                    <div key={group.label} className={styles.group}>
                      <button
                        type="button"
                        className={styles.groupLabel}
                        onClick={() => toggleGroup(group.label)}
                        aria-expanded={openGroups[group.label] !== false}
                      >
                        {group.label}
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          className={styles.chevron}
                          style={{ transform: openGroups[group.label] !== false ? 'rotate(0deg)' : 'rotate(-90deg)' }}
                        >
                          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                      <div
                        className={styles.groupContent}
                        data-open={openGroups[group.label] !== false}
                      >
                        <ul className={styles.linkList}>
                          {group.links.map((link) => (
                            <li key={link.slug}>
                              <Link
                                to={`/article/${link.slug}`}
                                className={`${styles.navItem} ${slug === link.slug ? styles.navItemActive : ''}`}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <ul className={styles.linkList}>
                    {'links' in section && section.links.map((link) => (
                      <li key={link.slug}>
                        <Link
                          to={`/article/${link.slug}`}
                          className={`${styles.navItem} ${slug === link.slug ? styles.navItemActive : ''}`}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </>
      </div>
    </aside>
  )
}
