import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/ui/atoms/Button'
import { Input } from '@/ui/atoms/Input'
import { FormField } from '@/ui/molecules/FormField'
import { Checkbox } from '@/ui/atoms/Checkbox'
import { useAuthStore } from '@/features/auth/store'
import styles from './AuthPages.module.css'

interface RegisterFormData {
  name: string
  email: string
  password: string
  confirmPassword: string
}

export function RegisterPage() {
  const navigate = useNavigate()
  const registerUser = useAuthStore((s) => s.register)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>()

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true)
    const ok = await registerUser(data.email, data.password, data.name)
    setLoading(false)
    if (ok) navigate('/')
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h1 className={styles.title}>Регистрация</h1>
        <p className={styles.subtitle}>Создайте аккаунт для начала работы</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <FormField label="Имя" error={errors.name?.message} required>
          <Input
            placeholder="Иван Иванов"
            error={!!errors.name}
            {...register('name', { required: 'Введите имя' })}
          />
        </FormField>

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

        <FormField label="Подтвердите пароль" error={errors.confirmPassword?.message} required>
          <Input
            type="password"
            placeholder="••••••••"
            error={!!errors.confirmPassword}
            {...register('confirmPassword', {
              required: 'Подтвердите пароль',
              validate: (v) => v === watch('password') || 'Пароли не совпадают',
            })}
          />
        </FormField>

        <Checkbox label="Я согласен с условиями использования" />

        <Button type="submit" loading={loading} size="lg" style={{ width: '100%' }}>
          Создать аккаунт
        </Button>
      </form>

      <p className={styles.footer}>
        Уже есть аккаунт? <Link to="/auth/login" className={styles.link}>Войти</Link>
      </p>
    </div>
  )
}
