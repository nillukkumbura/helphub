import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './RequestArticle.module.css'

export default function RequestArticle() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className={styles.page}>
        <div className={styles.success}>
          <h1 className={styles.successTitle}>Request received</h1>
          <p className={styles.successText}>
            Your article request has been submitted. We will review it and get back to you.
          </p>
          <Link to="/" className={styles.backLink}>Back to Help Hub</Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>Request Article</h1>
        <p className={styles.subtitle}>
          Submit a title and content for an article you would like to see in the Help Hub.
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="request-title">
            Title
          </label>
          <input
            id="request-title"
            type="text"
            className={styles.input}
            placeholder="Enter article title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label className={styles.label} htmlFor="request-content">
            Content
          </label>
          <textarea
            id="request-content"
            className={styles.textarea}
            placeholder="Enter article content or description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={8}
          />
          <div className={styles.actions}>
            <button type="submit" className={styles.submitBtn}>
              Submit request
            </button>
            <Link to="/" className={styles.cancelLink}>Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
