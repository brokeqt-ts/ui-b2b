import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '1rem',
      background: 'var(--color-bg-primary)',
      color: 'var(--color-text-primary)',
    }}>
      <h1 style={{ fontSize: 'var(--text-4xl)', fontWeight: 'var(--font-bold)' }}>404</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>Страница не найдена</p>
      <Link to="/" style={{ color: 'var(--color-text-link)' }}>Вернуться на главную</Link>
    </div>
  )
}
