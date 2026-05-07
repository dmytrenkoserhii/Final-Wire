import { useNavigate, useParams } from 'react-router-dom'
import { Group, Paper, Stack, Text } from '@mantine/core'
import { Timer } from './Timer'
import { StabilityBar } from './StabilityBar'
import { NeonBadge } from '../../../shared/ui/NeonBadge'
import { SciFiButton } from '../../../shared/ui/SciFiButton'
import { useGame } from '../context/game.context'
import { Logo } from '../../../shared/ui/Logo'
import classes from './StatusHeader.module.css'

export function StatusHeader() {
  const role = useGame((s) => s.game.role)
  const endsAt = useGame((s) => s.game.endsAt)
  const status = useGame((s) => s.game.status)
  const stability = useGame((s) => s.game.stability)
  const modules = useGame((s) => s.game.modules)
  const mistakes = useGame((s) => s.game.mistakes)
  const { code } = useParams()
  const navigate = useNavigate()

  return (
    <Paper component="header" radius={0} className={classes.header}>
      <Group gap="md" align="center">
        <Logo size="sm" withText={false} />
        <Stack gap={2}>
          <Text ff="var(--fw-font-mono)" fz={9} lts="0.24em" tt="uppercase" c="var(--fw-text-dim)">
            CHANNEL
          </Text>
          <Text ff="var(--fw-font-display)" fz={18} lts="0.18em" c="var(--fw-text)">
            {code}
          </Text>
        </Stack>
        <NeonBadge tone={role === 'OPERATOR' ? 'cyan' : 'amber'}>{role}</NeonBadge>
      </Group>

      <Timer endsAt={endsAt} paused={status !== 'ACTIVE'} />

      <Stack gap={6} miw={280}>
        <StabilityBar value={stability} />
        <Group gap="xs">
          <NeonBadge tone="muted" size="sm">
            {modules.filter((m) => m.state === 'SOLVED').length}/{modules.length} SOLVED
          </NeonBadge>
          <NeonBadge tone="red" size="sm">
            {mistakes} MISTAKES
          </NeonBadge>
        </Group>
      </Stack>

      <SciFiButton tone="ghost" size="xs" onClick={() => navigate('/home')}>
        Abort
      </SciFiButton>
    </Paper>
  )
}
