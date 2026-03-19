import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/ui/atoms/Button'
import { Input } from '@/ui/atoms/Input'
import { Toggle } from '@/ui/atoms/Toggle'
import { FormField } from '@/ui/molecules/FormField'
import { ThemeToggle } from '@/ui/molecules/ThemeToggle'
import { Card } from '@/ui/organisms/Card'
import { useToastStore } from '@/ui/molecules/Toast'
import { mockUser } from '@/mock/users'
import styles from './SettingsPage.module.css'

type Tab = 'profile' | 'notifications' | 'security'

const TABS: { key: Tab; label: string }[] = [
  { key: 'profile', label: 'Профиль' },
  { key: 'notifications', label: 'Уведомления' },
  { key: 'security', label: 'Безопасность' },
]

export function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('profile')
  const addToast = useToastStore((s) => s.addToast)

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Настройки</h1>
      </div>

      <div className={styles.tabs}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={styles.tab}
            data-active={activeTab === tab.key || undefined}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'profile' && <ProfileTab onSave={() => addToast({ type: 'success', message: 'Профиль сохранён' })} />}
      {activeTab === 'notifications' && <NotificationsTab />}
      {activeTab === 'security' && <SecurityTab onSave={() => addToast({ type: 'success', message: 'Пароль обновлён' })} />}
    </div>
  )
}

function ProfileTab({ onSave }: { onSave: () => void }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { name: mockUser.name, email: mockUser.email, phone: '+7 (999) 123-45-67' },
  })

  return (
    <Card padding="lg">
      <form onSubmit={handleSubmit(onSave)} className={styles.form}>
        <FormField label="Имя" error={errors.name?.message} required>
          <Input {...register('name', { required: 'Обязательное поле' })} />
        </FormField>
        <FormField label="Email" error={errors.email?.message} required>
          <Input type="email" {...register('email', { required: 'Обязательное поле' })} />
        </FormField>
        <FormField label="Телефон">
          <Input type="tel" {...register('phone')} />
        </FormField>
        <div className={styles.formActions}>
          <Button type="submit">Сохранить</Button>
        </div>
      </form>
    </Card>
  )
}

function NotificationsTab() {
  return (
    <Card padding="lg">
      <div className={styles.settingsList}>
        <div className={styles.settingItem}>
          <div>
            <p className={styles.settingLabel}>Email-уведомления</p>
            <p className={styles.settingDesc}>Получать уведомления о новых заказах</p>
          </div>
          <Toggle defaultChecked />
        </div>
        <div className={styles.settingItem}>
          <div>
            <p className={styles.settingLabel}>Push-уведомления</p>
            <p className={styles.settingDesc}>Браузерные уведомления</p>
          </div>
          <Toggle />
        </div>
        <div className={styles.settingItem}>
          <div>
            <p className={styles.settingLabel}>Еженедельный отчёт</p>
            <p className={styles.settingDesc}>Сводка по понедельникам</p>
          </div>
          <Toggle defaultChecked />
        </div>
        <div className={styles.settingItem}>
          <div>
            <p className={styles.settingLabel}>Тема оформления</p>
            <p className={styles.settingDesc}>Переключение между светлой и тёмной темой</p>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </Card>
  )
}

function SecurityTab({ onSave }: { onSave: () => void }) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<{
    currentPassword: string
    newPassword: string
    confirmPassword: string
  }>()

  return (
    <Card padding="lg">
      <form onSubmit={handleSubmit(onSave)} className={styles.form}>
        <FormField label="Текущий пароль" error={errors.currentPassword?.message} required>
          <Input type="password" {...register('currentPassword', { required: 'Обязательное поле' })} />
        </FormField>
        <FormField label="Новый пароль" error={errors.newPassword?.message} required>
          <Input type="password" {...register('newPassword', { required: 'Обязательное поле', minLength: { value: 6, message: 'Минимум 6 символов' } })} />
        </FormField>
        <FormField label="Подтвердите пароль" error={errors.confirmPassword?.message} required>
          <Input type="password" {...register('confirmPassword', {
            required: 'Обязательное поле',
            validate: (v) => v === watch('newPassword') || 'Пароли не совпадают',
          })} />
        </FormField>
        <div className={styles.formActions}>
          <Button type="submit">Обновить пароль</Button>
        </div>
      </form>
    </Card>
  )
}
