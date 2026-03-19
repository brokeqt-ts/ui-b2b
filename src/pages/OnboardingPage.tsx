import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/ui/atoms/Button'
import { Input } from '@/ui/atoms/Input'
import { Select } from '@/ui/atoms/Select'
import { Checkbox } from '@/ui/atoms/Checkbox'
import { FormField } from '@/ui/molecules/FormField'
import { Stepper } from '@/ui/molecules/Stepper'
import { Card } from '@/ui/organisms/Card'
import { useToastStore } from '@/ui/molecules/Toast'
import styles from './OnboardingPage.module.css'

const STEPS = ['Компания', 'Контакты', 'Документы', 'Проверка']

interface OnboardingForm {
  companyName: string
  inn: string
  industry: string
  contactName: string
  contactEmail: string
  contactPhone: string
  hasContract: boolean
  notes: string
}

export function OnboardingPage() {
  const navigate = useNavigate()
  const addToast = useToastStore((s) => s.addToast)
  const [step, setStep] = useState(0)
  const { register, handleSubmit, watch, formState: { errors }, trigger } = useForm<OnboardingForm>({
    defaultValues: { industry: '', hasContract: false, notes: '' },
  })

  const values = watch()

  const nextStep = async () => {
    let fields: (keyof OnboardingForm)[] = []
    if (step === 0) fields = ['companyName', 'inn', 'industry']
    if (step === 1) fields = ['contactName', 'contactEmail', 'contactPhone']
    const valid = await trigger(fields)
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1))
  }

  const prevStep = () => setStep((s) => Math.max(s - 1, 0))

  const onSubmit = () => {
    addToast({ type: 'success', message: 'Онбординг завершён успешно!' })
    navigate('/')
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Онбординг</h1>
        <p className={styles.subtitle}>Заполните данные для начала работы</p>
      </div>

      <Stepper steps={STEPS} currentStep={step} className={styles.stepper} />

      <Card padding="lg" className={styles.formCard}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 0 && (
            <div className={styles.fields}>
              <FormField label="Название компании" error={errors.companyName?.message} required>
                <Input error={!!errors.companyName} placeholder='ООО "Пример"' {...register('companyName', { required: 'Обязательное поле' })} />
              </FormField>
              <FormField label="ИНН" error={errors.inn?.message} required>
                <Input error={!!errors.inn} placeholder="1234567890" {...register('inn', { required: 'Обязательное поле', pattern: { value: /^\d{10,12}$/, message: '10 или 12 цифр' } })} />
              </FormField>
              <FormField label="Отрасль" error={errors.industry?.message} required>
                <Select
                  error={!!errors.industry}
                  placeholder="Выберите отрасль"
                  options={[
                    { value: 'it', label: 'IT и технологии' },
                    { value: 'manufacturing', label: 'Производство' },
                    { value: 'retail', label: 'Розничная торговля' },
                    { value: 'logistics', label: 'Логистика' },
                    { value: 'other', label: 'Другое' },
                  ]}
                  {...register('industry', { required: 'Выберите отрасль' })}
                />
              </FormField>
            </div>
          )}

          {step === 1 && (
            <div className={styles.fields}>
              <FormField label="Контактное лицо" error={errors.contactName?.message} required>
                <Input error={!!errors.contactName} placeholder="Иван Иванов" {...register('contactName', { required: 'Обязательное поле' })} />
              </FormField>
              <FormField label="Email" error={errors.contactEmail?.message} required>
                <Input type="email" error={!!errors.contactEmail} placeholder="ivan@company.ru" {...register('contactEmail', { required: 'Обязательное поле' })} />
              </FormField>
              <FormField label="Телефон" error={errors.contactPhone?.message} required>
                <Input type="tel" error={!!errors.contactPhone} placeholder="+7 (999) 123-45-67" {...register('contactPhone', { required: 'Обязательное поле' })} />
              </FormField>
            </div>
          )}

          {step === 2 && (
            <div className={styles.fields}>
              <Checkbox label="Договор подписан" {...register('hasContract')} />
              <FormField label="Примечания" hint="Необязательно">
                <Input placeholder="Доп. информация" {...register('notes')} />
              </FormField>
            </div>
          )}

          {step === 3 && (
            <div className={styles.review}>
              <h3 className={styles.reviewTitle}>Проверьте данные</h3>
              <dl className={styles.reviewList}>
                <div className={styles.reviewRow}><dt>Компания</dt><dd>{values.companyName}</dd></div>
                <div className={styles.reviewRow}><dt>ИНН</dt><dd>{values.inn}</dd></div>
                <div className={styles.reviewRow}><dt>Отрасль</dt><dd>{values.industry}</dd></div>
                <div className={styles.reviewRow}><dt>Контакт</dt><dd>{values.contactName}</dd></div>
                <div className={styles.reviewRow}><dt>Email</dt><dd>{values.contactEmail}</dd></div>
                <div className={styles.reviewRow}><dt>Телефон</dt><dd>{values.contactPhone}</dd></div>
                <div className={styles.reviewRow}><dt>Договор</dt><dd>{values.hasContract ? 'Да' : 'Нет'}</dd></div>
                {values.notes && <div className={styles.reviewRow}><dt>Примечания</dt><dd>{values.notes}</dd></div>}
              </dl>
            </div>
          )}

          <div className={styles.buttons}>
            {step > 0 && <Button type="button" variant="secondary" onClick={prevStep}>Назад</Button>}
            <div style={{ flex: 1 }} />
            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={nextStep}>Далее</Button>
            ) : (
              <Button type="submit">Завершить</Button>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
