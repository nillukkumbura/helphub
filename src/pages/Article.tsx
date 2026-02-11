import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { articles } from '../data/articles'
import { systemLifecycleSteps, type LifecycleStepId } from '../data/systemLifecycle'
import HighlightableText from '../components/HighlightableText'
import styles from './Article.module.css'

function scrollToHeading(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const getAccessContent = (
  <div className={styles.articleBody}>
    <h2 id="system-owner">I am a System Owner (DSM)</h2>
    <ol>
      <li>
        Register and complete governance by identifying an <HighlightableText
          text="Agency Coordinator"
          popoverContent="An Agency Coordinator is the designated gatekeeper for your agency in ATAS. They manage user access requests, approve system registrations, and ensure compliance with agency policies. Contact your IT or governance team to find your Agency Coordinator."
        /> and submitting your request.
      </li>
      <li>Complete the system registration form with required details.</li>
      <li>Await approval from your Agency Coordinator.</li>
    </ol>

    <h2 id="team-member">I am a Team Member</h2>
    <ol>
      <li>
        Obtain access by requesting your System Owner or <HighlightableText
          text="Agency Coordinator"
          popoverContent="An Agency Coordinator is the designated gatekeeper for your agency in ATAS. They manage user access requests, approve system registrations, and ensure compliance with agency policies. Contact your IT or governance team to find your Agency Coordinator."
        /> to add you to the system.
      </li>
      <li>Use the system for data entry and uploads as assigned.</li>
    </ol>

    <h2 id="agency-coordinator">I am an Agency Coordinator</h2>
    <p>
      As an <HighlightableText
        text="Agency Coordinator"
        popoverContent="An Agency Coordinator is the designated gatekeeper for your agency in ATAS. They manage user access requests, approve system registrations, and ensure compliance with agency policies. Contact your IT or governance team to find your Agency Coordinator."
      />, you act as the gatekeeper for your agency. Follow these steps to add users:
    </p>
    <ul>
      <li>
        <strong>System Owner</strong> – Full control over the system and its governance.
      </li>
      <li>
        <strong>System Contributor</strong> – Can edit and submit data for the system.
      </li>
      <li>
        <strong>Appointment (CIO/CISO)</strong> – For chief-level appointments and approvals.
      </li>
    </ul>

    <h2 id="vendor">Vendor</h2>
    <p>Vendors and external parties should request access through the System Owner or Agency Coordinator of the system they are supporting.</p>
  </div>
)

const defaultContent = (
  <div className={styles.articleBody}>
    <p>This article provides guidance and steps specific to this topic. Content can be expanded here.</p>
  </div>
)

function SystemLifecycleContent() {
  const [selectedStep, setSelectedStep] = useState<LifecycleStepId>('poc')
  const step = systemLifecycleSteps.find((s) => s.id === selectedStep) ?? systemLifecycleSteps[0]

  return (
    <div className={styles.lifecycleWrap}>
      <nav className={styles.stepper} aria-label="Lifecycle phases">
        {systemLifecycleSteps.map((s, index) => (
          <button
            key={s.id}
            type="button"
            className={`${styles.stepperStep} ${selectedStep === s.id ? styles.stepperStepActive : ''}`}
            onClick={() => setSelectedStep(s.id)}
            aria-current={selectedStep === s.id ? 'step' : undefined}
            aria-label={`${s.label} phase`}
          >
            <span className={styles.stepperNumber}>{index + 1}</span>
            <span className={styles.stepperLabel}>{s.label}</span>
          </button>
        ))}
      </nav>
      <div className={styles.lifecycleContent}>
        <h2 className={styles.lifecyclePhaseTitle}>{step.label}</h2>
        <p className={styles.lifecyclePhaseDesc}>
          Criteria and governance requirements for the <strong>{step.label}</strong> phase:
        </p>
        <ul className={styles.criteriaList}>
          {step.criteria.map((criterion, i) => (
            <li key={i}>{criterion}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function Article() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? articles.find((a) => a.slug === slug) : null
  const headings = article?.slug === 'system-lifecycle' ? [] : (article?.headings ?? [])
  const firstHeadingId = headings[0]?.id ?? null
  const [activeHeadingId, setActiveHeadingId] = useState<string | null>(firstHeadingId)

  // Sync TOC active state when user scrolls (Intersection Observer)
  useEffect(() => {
    if (headings.length === 0) return
    const root = document.querySelector('[data-scroll-container]')
    if (!root) return
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id
            if (id) setActiveHeadingId(id)
            break
          }
        }
      },
      { root, rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    )
    headings.forEach((h) => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [slug, headings])

  useEffect(() => {
    const hash = window.location.hash.slice(1)
    if (!hash) return
    scrollToHeading(hash)
  }, [slug])

  if (!article) {
    return (
      <div className={styles.page}>
        <p>Article not found.</p>
        <Link to="/">Back to Home</Link>
      </div>
    )
  }

  const content =
    article.slug === 'get-access'
      ? getAccessContent
      : article.slug === 'system-lifecycle'
        ? <SystemLifecycleContent />
        : defaultContent

  const handleTocClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    setActiveHeadingId(id)
    scrollToHeading(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <div className={styles.page}>
      <div className={styles.articleLayout}>
        <div className={styles.articleMain}>
          <h1 className={styles.articleTitle}>{article.title}</h1>
          <p className={styles.articleSubtitle}>Find guides, tutorials, and answers to your questions.</p>
          {content}
        </div>
        {headings.length > 0 && (
          <nav className={styles.toc} aria-label="Table of contents">
            <div className={styles.tocSticky}>
              <h3 className={styles.tocTitle}>On this page</h3>
              <ul className={styles.tocList}>
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className={`${styles.tocLink} ${activeHeadingId === h.id ? styles.tocLinkActive : ''}`}
                      onClick={(e) => handleTocClick(e, h.id)}
                      aria-current={activeHeadingId === h.id ? 'location' : undefined}
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        )}
      </div>
    </div>
  )
}
