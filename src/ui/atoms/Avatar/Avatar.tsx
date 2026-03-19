import { cn } from '@/shared/lib/cn'
import styles from './Avatar.module.css'

export interface AvatarProps {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({ src, name, size = 'md', className }: AvatarProps) {
  return (
    <div className={cn(styles.avatar, className)} data-size={size} title={name}>
      {src ? (
        <img src={src} alt={name} className={styles.img} />
      ) : (
        <span className={styles.initials}>{getInitials(name)}</span>
      )}
    </div>
  )
}
