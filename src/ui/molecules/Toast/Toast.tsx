import { useToastStore, type ToastItem } from './toastStore'
import styles from './Toast.module.css'

function ToastCard({ toast }: { toast: ToastItem }) {
  const { removeToast } = useToastStore()

  return (
    <div className={styles.toast} data-type={toast.type}>
      <span className={styles.message}>{toast.message}</span>
      <button className={styles.close} onClick={() => removeToast(toast.id)} aria-label="Close">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M3 3l8 8M11 3l-8 8" />
        </svg>
      </button>
    </div>
  )
}

export function ToastContainer() {
  const { toasts } = useToastStore()

  if (toasts.length === 0) return null

  return (
    <div className={styles.container}>
      {toasts.map((t) => (
        <ToastCard key={t.id} toast={t} />
      ))}
    </div>
  )
}
