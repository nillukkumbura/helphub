import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerInner}>
        <div className={styles.footerLeft}>
          <h2 className={styles.footerTitle}>ATAS Help Hub</h2>
          <p className={styles.footerDesc}>This is the description of your portal/digital service</p>
          <nav className={styles.footerNav}>
            <a href="#report" className={styles.footerLink}>
              Report Vulnerability
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M6 3H3a2 2 0 00-2 2v6a2 2 0 002 2h6a2 2 0 002-2V8a2 2 0 00-2-2H8M10 1v4M10 1h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a href="#privacy" className={styles.footerLink}>Privacy Statement</a>
            <a href="#terms" className={styles.footerLink}>Terms of use</a>
          </nav>
        </div>
        <div className={styles.footerRight}>
          <p className={styles.copyright}>© 2026 Government of Singapore</p>
          <p className={styles.updated}>Last Updated 01 Jan 2026</p>
        </div>
      </div>
    </footer>
  )
}
