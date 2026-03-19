import styles from './Stepper.module.css'

export interface StepperProps {
  steps: string[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={`${styles.stepper} ${className ?? ''}`}>
      {steps.map((label, i) => {
        const state = i < currentStep ? 'completed' : i === currentStep ? 'active' : 'pending'
        return (
          <div key={i} className={styles.step} data-state={state}>
            <div className={styles.indicator}>
              {state === 'completed' ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 7l3 3 5-5" />
                </svg>
              ) : (
                <span>{i + 1}</span>
              )}
            </div>
            <span className={styles.label}>{label}</span>
            {i < steps.length - 1 && <div className={styles.connector} />}
          </div>
        )
      })}
    </div>
  )
}
