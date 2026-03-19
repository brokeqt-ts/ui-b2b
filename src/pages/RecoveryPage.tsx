import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { Button } from '@/ui/atoms/Button'
import { Input } from '@/ui/atoms/Input'
import { FormField } from '@/ui/molecules/FormField'
import styles from './AuthPages.module.css'

interface RecoveryFormData {
  email: string
}

export function RecoveryPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm<RecoveryFormData>()

  const onSubmit = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 800))
    setLoading(false)
    setSent(true)
  }

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h1 className={styles.title}>Восстановление пароля</h1>
        <p className={styles.subtitle}>Введите email для получения ссылки на сброс пароля</p>
      </div>

      {sent ? (
        <div className={styles.successMsg}>
          Ссылка для восстановления отправлена на ваш email. Проверьте почту.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <FormField label="Email" error={errors.email?.message} required>
            <Input
              type="email"
              placeholder="name@company.ru"
              error={!!errors.email}
              {...register('email', { required: 'Введите email' })}
            />
          </FormField>

          <Button type="submit" loading={loading} size="lg" style={{ width: '100%' }}>
            Отправить ссылку
          </Button>
        </form>
      )}

      <p className={styles.footer}>
        <Link to="/auth/login" className={styles.link}>Вернуться к входу</Link>
      </p>
    </div>
  )
}
