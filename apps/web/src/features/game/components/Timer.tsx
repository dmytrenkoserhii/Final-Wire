import { useEffect, useState } from 'react'
import { Paper, Text } from '@mantine/core'
import classes from './Timer.module.css'

interface Props {
  endsAt: number
  paused?: boolean
}

const fmt = (totalMs: number) => {
  const total = Math.max(0, Math.ceil(totalMs / 1000))
  const m = Math.floor(total / 60)
  const s = total % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

export function Timer({ endsAt, paused }: Props) {
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setNow(Date.now()), 250)
    return () => clearInterval(id)
  }, [paused])

  const remaining = endsAt - now
  const seconds = Math.max(0, Math.ceil(remaining / 1000))

  let tone: 'normal' | 'warn' | 'crit' = 'normal'
  if (seconds <= 30) tone = 'crit'
  else if (seconds <= 120) tone = 'warn'

  return (
    <Paper radius="md" p="sm" className={[classes.root, classes[tone]].join(' ')}>
      <Text ff="var(--fw-font-mono)" fz={11} lts="0.24em" tt="uppercase" c="var(--fw-text-dim)">
        T-MINUS
      </Text>
      <Text ff="var(--fw-font-display)" fz={44} fw={700} lts="0.06em" lh={1} className={classes.value}>
        {fmt(remaining)}
      </Text>
    </Paper>
  )
}
