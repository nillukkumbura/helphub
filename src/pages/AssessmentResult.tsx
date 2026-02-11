import { useLocation, Link } from 'react-router-dom'
import { getChecklist, type AssessmentAnswers } from '../data/assessment'
import styles from './AssessmentResult.module.css'

export default function AssessmentResult() {
  const location = useLocation()
  const answers = location.state?.answers as AssessmentAnswers | undefined

  if (!answers) {
    return (
      <div className={styles.page}>
        <p className={styles.empty}>No assessment data found. Please complete the assessment first.</p>
        <Link to="/assessment" className={styles.link}>Start Assessment</Link>
      </div>
    )
  }

  const checklist = getChecklist(answers)

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Your governance checklist</h1>
        <p className={styles.subtitle}>
          Based on your system lifecycle (<strong>{answers.lifecycleStage}</strong>) and answers, complete the following to meet governance requirements.
        </p>

        <ul className={styles.checklist}>
          {checklist.map((item, index) => (
            <li key={item.id} className={styles.checklistItem}>
              <span className={styles.checklistNumber}>{index + 1}</span>
              <div className={styles.checklistContent}>
                <span className={styles.checklistLabel}>{item.label}</span>
                {item.note && <span className={styles.checklistNote}>{item.note}</span>}
              </div>
            </li>
          ))}
        </ul>

        <div className={styles.actions}>
          <Link to="/assessment" className={styles.primaryBtn}>
            Retake assessment
          </Link>
          <Link to="/" className={styles.secondaryBtn}>
            Back to Help Hub
          </Link>
        </div>
      </div>
    </div>
  )
}
