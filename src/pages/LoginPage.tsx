import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/ui/atoms/Button'
import { Input } from '@/ui/atoms/Input'
import { FormField } from '@/ui/molecules/FormField'
import { useAuthStore } from '@/features/auth/store'
import styles from './AuthPages.module.css'

interface LoginFormData {
  email: string
  password: string
}

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const login = useAuthStore((s) => s.login)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true)
    const ok = await login(data.email, data.password)
    setLoading(false)
    if (ok) navigate(location.state?.from?.pathname ?? '/', { replace: true })
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h1 className={styles.title}>Вход в систему</h1>
        <p className={styles.subtitle}>Введите свои данные для авторизации</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormField label="Email" error={errors.email?.message} required>
          <Input
            type="email"
            placeholder="name@company.ru"
            error={!!errors.email}
            {...register('email', { required: 'Введите email' })}
          />
        </FormField>

        <FormField label="Пароль" error={errors.password?.message} required>
          <Input
            type="password"
            placeholder="••••••••"
            error={!!errors.password}
            {...register('password', { required: 'Введите пароль', minLength: { value: 6, message: 'Минимум 6 символов' } })}
          />
        </FormField>

        <div className={styles.actions}>
          <Link to="/auth/recovery" className={styles.link}>Забыли пароль?</Link>
        </div>

        <Button type="submit" loading={loading} size="lg" style={{ width: '100%' }}>
          Войти
        </Button>
      </form>

      <p className={styles.footer}>
        Нет аккаунта? <Link to="/auth/register" className={styles.link}>Зарегистрироваться</Link>
      </p>
    </div>
  )
}
