import { useRouteError, Link } from 'react-router-dom'

export function ErrorPage() {
  const error = useRouteError() as Error | undefined

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
      <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)' }}>Что-то пошло не так</h1>
      <p style={{ color: 'var(--color-text-secondary)' }}>
        {error?.message || 'Произошла непредвиденная ошибка'}
      </p>
      <Link to="/" style={{ color: 'var(--color-text-link)' }}>Вернуться на главную</Link>
    </div>
  )
}
