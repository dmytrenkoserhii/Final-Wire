import { Badge, type BadgeProps } from '@mantine/core'
import type { ReactNode } from 'react'
import classes from './NeonBadge.module.css'

const TONE_COLORS = {
  cyan: 'cyan',
  amber: 'yellow',
  red: 'red',
  green: 'teal',
  muted: 'gray',
} as const

interface Props extends Omit<BadgeProps, 'color' | 'size'> {
  children: ReactNode
  tone?: keyof typeof TONE_COLORS
  size?: 'sm' | 'md'
  pulse?: boolean
}

export function NeonBadge({ children, tone = 'cyan', size = 'md', pulse, className, ...rest }: Props) {
  return (
    <Badge
      variant="dot"
      color={TONE_COLORS[tone]}
      size={size === 'sm' ? 'sm' : 'md'}
      radius="xl"
      {...rest}
      classNames={{
        root: [classes.badge, classes[tone], pulse ? classes.pulse : '', className]
          .filter(Boolean)
          .join(' '),
        label: classes.label,
      }}
    >
      {children}
    </Badge>
  )
}
