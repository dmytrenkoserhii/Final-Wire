import { Group, Paper, Progress, Text } from '@mantine/core'
import classes from './StabilityBar.module.css'

interface Props {
  value: number
}

export function StabilityBar({ value }: Props) {
  let tone: 'ok' | 'warn' | 'crit' = 'ok'
  let color: string = 'teal'
  if (value < 30) { tone = 'crit'; color = 'red' }
  else if (value < 60) { tone = 'warn'; color = 'yellow' }

  return (
    <Paper radius="md" p="sm" className={[classes.root, classes[tone]].join(' ')}>
      <Group justify="space-between" align="baseline">
        <Text ff="var(--fw-font-mono)" fz={11} lts="0.18em" tt="uppercase" c="var(--fw-text-dim)">
          REACTOR STABILITY
        </Text>
        <Text ff="var(--fw-font-display)" fz={22} fw={700} className={classes.value}>
          {Math.round(value)}%
        </Text>
      </Group>
      <div className={classes.trackWrapper}>
        <Progress
          value={Math.max(0, Math.min(100, value))}
          size="md"
          color={color}
          radius="xs"
          animated={tone === 'crit'}
          classNames={{
            root: classes.track,
            section: classes.fill,
          }}
        />
        <div className={classes.ticks} aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <span key={i} />
          ))}
        </div>
      </div>
    </Paper>
  )
}
