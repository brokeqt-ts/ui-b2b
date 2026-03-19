import { useState, useCallback } from 'react'
import { Input } from '@/ui/atoms/Input'
import { useDebounce } from '@/shared/hooks/useDebounce'
import { useEffect } from 'react'

interface SearchInputProps {
  value?: string
  onSearch: (value: string) => void
  placeholder?: string
  delay?: number
  className?: string
}

const SearchIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
    <circle cx="7" cy="7" r="4.5" />
    <path d="M10.5 10.5L14 14" />
  </svg>
)

export function SearchInput({ value: controlledValue, onSearch, placeholder = 'Поиск...', delay = 300, className }: SearchInputProps) {
  const [value, setValue] = useState(controlledValue ?? '')
  const debounced = useDebounce(value, delay)

  useEffect(() => {
    onSearch(debounced)
  }, [debounced, onSearch])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }, [])

  return (
    <Input
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      iconLeft={SearchIcon}
      className={className}
    />
  )
}
