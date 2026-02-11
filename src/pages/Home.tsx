import { useSearchParams, Link } from 'react-router-dom'
import { searchArticles, homeArticleCards } from '../data/articles'
import SearchResults from '../components/SearchResults'
import homeBanner from '../images/home-banner.png'
import assessmentImg from '../images/assessment.png'
import atasLogo from '../images/quick-links/atas.png'
import im8Logo from '../images/quick-links/im8.png'
import cloudscapeLogo from '../images/quick-links/cloudscape.png'
import vmsLogo from '../images/quick-links/vms.svg'
import wogaaLogo from '../images/quick-links/wogaa.png'
import styles from './Home.module.css'

const quickLinks = [
  { name: 'ATAS System Registration', logo: atasLogo, url: '#' },
  { name: 'IM8 Catalog', logo: im8Logo, url: '#' },
  { name: 'CloudSCAPE', logo: cloudscapeLogo, url: '#' },
  { name: 'VMS', logo: vmsLogo, url: '#' },
  { name: 'WOGAA', logo: wogaaLogo, url: '#' },
]

export default function Home() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') ?? ''
  const results = searchQuery.trim() ? searchArticles(searchQuery) : null

  if (results !== null) {
    return (
      <div className={styles.page}>
        <SearchResults query={searchQuery} results={results} />
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1 className={styles.heroTitle}>ATAS Help Hub</h1>
          <p className={styles.heroTagline}>
            Find guides, tutorials, and answers to your questions.
          </p>
        </div>
        <div className={styles.heroImage}>
          <img
            src={homeBanner}
            alt=""
            width={400}
            height={280}
          />
        </div>
      </section>

      <section className={styles.articles}>
      <h2 className={styles.articlesTitle}>Popular Articles</h2>
        <div className={styles.cardGrid}>
          {homeArticleCards.map((card) => (
            <article key={card.slug} className={styles.card}>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardDesc}>{card.description}</p>
              <Link to={`/article/${card.slug}`} className={styles.cardLink}>
                View Article
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.assessmentBanner}>
        <div className={styles.assessmentContent}>
          <div className={styles.assessmentText}>
            <h2 className={styles.assessmentTitle}>Assess your system</h2>
            <p className={styles.assessmentDesc}>
              Complete a quick self-assessment to see which governance standards apply to your digital system.
            </p>
            <Link to="/assessment" className={styles.assessmentBtn}>
              Start Assessment
            </Link>
          </div>
          <div className={styles.assessmentGraphic}>
            <img src={assessmentImg} alt="" />
          </div>
        </div>
      </section>

      <section id="quick-links" className={styles.quickLinks}>
        <h2 className={styles.quickLinksTitle}>Quick Links</h2>
        <div className={styles.quickLinksGrid}>
          {quickLinks.map((item) => (
            <a
              key={item.name}
              href={item.url}
              className={styles.quickLinkCard}
              target={item.url.startsWith('http') ? '_blank' : undefined}
              rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <div className={styles.quickLinkLogo}>
                <img src={item.logo} alt="" />
              </div>
              <span className={styles.quickLinkName}>{item.name}</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  )
}
