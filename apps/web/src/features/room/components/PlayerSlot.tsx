import { Avatar, Group, Paper, Stack, Text } from '@mantine/core'
import { NeonBadge } from '../../../shared/ui/NeonBadge'
import type { MockPlayer } from '../../../shared/types/game.types'
import classes from './PlayerSlot.module.css'

interface Props {
  player?: MockPlayer
  index: number
}

export function PlayerSlot({ player, index }: Props) {
  if (!player) {
    return (
      <Paper radius="md" p="md" className={[classes.slot, classes.empty].join(' ')}>
        <Text ff="var(--fw-font-mono)" fz={10} lts="0.18em" tt="uppercase" c="var(--fw-text-dim)">
          SLOT {String(index + 1).padStart(2, '0')}
        </Text>
        <Text ff="var(--fw-font-mono)" fz={12} lts="0.08em" tt="uppercase" c="var(--fw-text-dim)" className={classes.placeholder}>
          Awaiting connection…
        </Text>
      </Paper>
    )
  }

  return (
    <Paper radius="md" p="md" className={[classes.slot, player.isReady ? classes.ready : ''].join(' ')}>
      <Text ff="var(--fw-font-mono)" fz={10} lts="0.18em" tt="uppercase" c="var(--fw-text-dim)">
        SLOT {String(index + 1).padStart(2, '0')}
      </Text>
      <Group gap="md" mt="sm">
        <Avatar src={player.avatarUrl} radius="xl" size="lg">
          {player.displayName.slice(0, 1)}
        </Avatar>
        <Stack gap={6}>
          <Text fw={600} ff="var(--fw-font-display)" fz={15} lts="0.06em" c="var(--fw-text)" truncate>
            {player.displayName}
          </Text>
          <Group gap={6} wrap="wrap">
            {player.isHost && (
              <NeonBadge tone="cyan" size="sm">
                HOST
              </NeonBadge>
            )}
            <NeonBadge tone={player.isReady ? 'green' : 'amber'} size="sm" pulse={!player.isReady}>
              {player.isReady ? 'READY' : 'STANDBY'}
            </NeonBadge>
          </Group>
        </Stack>
      </Group>
    </Paper>
  )
}
