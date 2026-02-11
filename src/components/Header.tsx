import { Link } from 'react-router-dom'
import logoImg from '../images/logo.png'
import sgCrest from '../images/sg-crest.svg'
import styles from './Header.module.css'

interface HeaderProps {
  sticky: boolean
}

export default function Header({ sticky }: HeaderProps) {
  return (
    <>
      <div className={styles.topBanner}>
        <span className={styles.bannerText}>
          <img src={sgCrest} alt="" className={styles.crestImg} />
          A Singapore Government Agency Website
        </span>
        <button type="button" className={styles.identifyBtn}>
          How to identify
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
            <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
      <header className={`${styles.header} ${sticky ? styles.sticky : ''}`} role="banner">
        <div className={styles.headerInner}>
          <Link to="/" className={styles.logo}>
            <img src={logoImg} alt="GovTech Singapore" className={styles.logoImg} />
          </Link>
          <Link to="/request-article" className={styles.requestBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Request Article
          </Link>
        </div>
      </header>
    </>
  )
}
