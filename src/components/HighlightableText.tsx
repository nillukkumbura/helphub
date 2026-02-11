import { useState, useRef, useEffect, useId } from 'react'
import styles from './HighlightableText.module.css'

const TOOLTIP_OPENED_EVENT = 'help-hub-tooltip-opened'

interface HighlightableTextProps {
  text: string
  popoverContent: React.ReactNode
}

export default function HighlightableText({ text, popoverContent }: HighlightableTextProps) {
  const id = useId()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!open) return
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [open])

  useEffect(() => {
    const onOtherOpened = (e: Event) => {
      const ev = e as CustomEvent<string>
      if (ev.detail !== id) setOpen(false)
    }
    window.addEventListener(TOOLTIP_OPENED_EVENT, onOtherOpened)
    return () => window.removeEventListener(TOOLTIP_OPENED_EVENT, onOtherOpened)
  }, [id])

  const handleToggle = () => {
    setOpen((v) => {
      const next = !v
      if (next) window.dispatchEvent(new CustomEvent(TOOLTIP_OPENED_EVENT, { detail: id }))
      return next
    })
  }

  return (
    <span ref={ref} className={styles.wrapper}>
      <span
        role="button"
        tabIndex={0}
        className={styles.highlight}
        onClick={(e) => { e.stopPropagation(); handleToggle() }}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle() } }}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        {text}
      </span>
      {open && (
        <div className={styles.popover} role="dialog" aria-label="Definition">
          <div className={styles.popoverArrow} />
          <div className={styles.popoverContent}>{popoverContent}</div>
        </div>
      )}
    </span>
  )
}
