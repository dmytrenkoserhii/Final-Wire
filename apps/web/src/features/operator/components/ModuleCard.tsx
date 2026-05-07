import { Group, Paper, Stack, Text, Title, UnstyledButton } from '@mantine/core'
import { NeonBadge } from '../../../shared/ui/NeonBadge'
import type { ModuleSnapshot } from '../../../shared/types/game.types'
import classes from './ModuleCard.module.css'

interface Props {
  module: ModuleSnapshot
  isActive: boolean
  onActivate: () => void
}

const KEY_META = {
  WIRES: { name: 'Coolant Wires', icon: '⌇⌇⌇', desc: 'Cut the correct cooling line.' },
  GLYPHS: { name: 'Glyph Sequence', icon: '◈◇◆', desc: 'Match the runic sequence.' },
  PRESSURE: { name: 'Pressure Switches', icon: '⇅ ⇅', desc: 'Set the valve configuration.' },
  KEYPAD: { name: 'Keypad Code', icon: '▮▮▮', desc: 'Enter the override code.' },
} as const

const STATE_TONE = {
  PENDING: 'amber',
  IN_PROGRESS: 'cyan',
  SOLVED: 'green',
  FAILED: 'red',
} as const

export function ModuleCard({ module, isActive, onActivate }: Props) {
  const meta = KEY_META[module.moduleKey]
  const tone = STATE_TONE[module.state]
  const disabled = module.state === 'SOLVED' || module.state === 'FAILED'

  return (
    <UnstyledButton
      onClick={onActivate}
      disabled={disabled}
      className={[
        classes.card,
        isActive ? classes.active : '',
        classes[`state_${module.state}`],
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <Paper
        radius="md"
        p="md"
        className={classes.inner}
      >
        <Group justify="space-between" align="center" mb="sm">
          <Text ff="var(--fw-font-mono)" fz={22} lts="0.2em" c="var(--fw-accent)" className={classes.icon}>
            {meta.icon}
          </Text>
          <NeonBadge tone={tone} size="sm" pulse={module.state === 'IN_PROGRESS'}>
            {module.state}
          </NeonBadge>
        </Group>
        <Stack gap={4}>
          <Title order={4} className={classes.name}>
            {meta.name}
          </Title>
          <Text fz="xs" c="var(--fw-text-dim)">
            {meta.desc}
          </Text>
        </Stack>
        {module.mistakes > 0 && (
          <Text ff="var(--fw-font-mono)" fz={10} lts="0.18em" c="var(--fw-danger)" className={classes.mistakes}>
            ERR · {module.mistakes}
          </Text>
        )}
      </Paper>
    </UnstyledButton>
  )
}
