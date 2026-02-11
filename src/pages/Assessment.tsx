import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  lifecycleStages,
  questionsByPhase,
  type LifecycleStage,
  type AssessmentAnswers,
} from '../data/assessment'
import styles from './Assessment.module.css'

export default function Assessment() {
  const navigate = useNavigate()
  const [lifecycleStage, setLifecycleStage] = useState<LifecycleStage | ''>('')
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const questions = lifecycleStage ? questionsByPhase[lifecycleStage] : []
  const allQuestionsAnswered = questions.every((q) => answers[q.id]?.trim())

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!lifecycleStage || !allQuestionsAnswered) return
    const payload: AssessmentAnswers = {
      lifecycleStage,
      ...answers,
    }
    navigate('/assessment/result', { state: { answers: payload } })
  }

  const handleChange = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  return (
    <div className={styles.page}>
      <div className={styles.formWrapper}>
        <h1 className={styles.title}>System self-assessment</h1>
        <p className={styles.subtitle}>
          Answer a few questions to see which governance standards apply to your system.
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="lifecycle-stage">
            What is your system's lifecycle stage?
          </label>
          <select
            id="lifecycle-stage"
            className={styles.select}
            value={lifecycleStage}
            onChange={(e) => {
              setLifecycleStage(e.target.value as LifecycleStage)
              setAnswers({})
            }}
            required
          >
            <option value="">Select lifecycle stage</option>
            {lifecycleStages.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          {questions.length > 0 && (
            <div className={styles.questions}>
              <h2 className={styles.questionsTitle}>Follow-up questions</h2>
              {questions.map((q) => (
                <div key={q.id} className={styles.field}>
                  <label className={styles.label} htmlFor={q.id}>
                    {q.label}
                  </label>
                  {q.type === 'dropdown' ? (
                    <select
                      id={q.id}
                      className={styles.select}
                      value={answers[q.id] ?? ''}
                      onChange={(e) => handleChange(q.id, e.target.value)}
                      required
                    >
                      <option value="">Select...</option>
                      {q.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <div className={styles.radioGroup} role="group" aria-label={q.label}>
                      {q.options.map((opt) => (
                        <label key={opt.value} className={styles.radioLabel}>
                          <input
                            type="radio"
                            name={q.id}
                            value={opt.value}
                            checked={(answers[q.id] ?? '') === opt.value}
                            onChange={() => handleChange(q.id, opt.value)}
                          />
                          <span>{opt.label}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!lifecycleStage || !allQuestionsAnswered}
            >
              See my results
            </button>
            <button
              type="button"
              className={styles.cancelBtn}
              onClick={() => navigate('/')}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
