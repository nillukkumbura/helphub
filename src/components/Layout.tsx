import { useState, useEffect, useRef } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'
import styles from './Layout.module.css'

export default function Layout() {
  const [scrolled, setScrolled] = useState(false)
  const mainRef = useRef<HTMLElement>(null)
  const location = useLocation()

  useEffect(() => {
    const el = mainRef.current
    if (!el) return
    const onScroll = () => setScrolled(el.scrollTop > 10)
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  // Reset scroll position when route changes
  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className={styles.wrapper}>
      <Header sticky={scrolled} />
      {scrolled && <div className={styles.headerSpacer} aria-hidden />}
      <div className={styles.body}>
        <Sidebar />
        <main ref={mainRef} className={styles.main} data-scroll-container>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
