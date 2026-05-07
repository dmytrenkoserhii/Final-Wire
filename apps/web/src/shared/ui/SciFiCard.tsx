import { Paper, type PaperProps } from '@mantine/core'
import type { CSSProperties, ReactNode } from 'react'
import classes from './SciFiCard.module.css'

interface Props extends PaperProps {
  children: ReactNode
  variant?: 'default' | 'panel' | 'paper'
  glow?: boolean
  className?: string
  style?: CSSProperties
}

export function SciFiCard({
  children,
  variant = 'default',
  glow = false,
  className,
  ...rest
}: Props) {
  return (
    <Paper
      radius="md"
      {...rest}
      classNames={{
        root: [classes.card, classes[variant], glow ? classes.glow : '', className]
          .filter(Boolean)
          .join(' '),
      }}
    >
      <span className={classes.cornerTL} />
      <span className={classes.cornerTR} />
      <span className={classes.cornerBL} />
      <span className={classes.cornerBR} />
      {children}
    </Paper>
  )
}
