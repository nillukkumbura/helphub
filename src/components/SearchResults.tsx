import { Link } from 'react-router-dom'
import type { ArticleItem } from '../data/articles'
import styles from './SearchResults.module.css'

interface SearchResultsProps {
  query: string
  results: ArticleItem[]
}

export default function SearchResults({ query, results }: SearchResultsProps) {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Search results</h1>
      <p className={styles.subtitle}>
        {results.length === 0
          ? `No articles found for "${query}".`
          : `Found ${results.length} article${results.length === 1 ? '' : 's'} for "${query}".`}
      </p>
      <div className={styles.grid}>
        {results.map((article) => (
          <article key={article.slug} className={styles.card}>
            <div className={styles.cardIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="var(--primary-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 2v6h6" stroke="var(--primary-purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2 className={styles.cardTitle}>{article.title}</h2>
            <p className={styles.cardDesc}>{article.description}</p>
            <Link to={`/article/${article.slug}`} className={styles.cardLink}>
              View Article
            </Link>
          </article>
        ))}
      </div>
    </div>
  )
}
