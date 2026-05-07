import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Container, CopyButton, Grid, Group, SegmentedControl, SimpleGrid, Stack, Text, Title, Tooltip } from '@mantine/core'
import { SciFiCard } from '../../shared/ui/SciFiCard'
import { SciFiButton } from '../../shared/ui/SciFiButton'
import { NeonBadge } from '../../shared/ui/NeonBadge'
import { useRoom } from '../../features/room/context/room.context'
import { useAuth } from '../../app/providers/auth.provider'
import { PlayerSlot } from '../../features/room/components/PlayerSlot'
import type { Difficulty } from '../../shared/types/game.types'
import { buildMockRoom } from '../../shared/lib/mock-data'
import classes from './RoomPage.module.css'

export function RoomPage() {
  const { code = '' } = useParams()
  const { room, joinRoom, setReady, setDifficulty, leaveRoom } = useRoom()
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!code) return
    if (!room || room.roomCode !== code.toUpperCase()) joinRoom(code)
  }, [room, code, joinRoom])

  const current = room ?? buildMockRoom(code)
  const me = current.players.find((p) => p.playerId === user?.id) ?? current.players[0]
  const isHost = me?.isHost ?? false
  const allReady = current.players.every((p) => p.isReady)
  const inviteLink = `${window.location.origin}/room/${current.roomCode}`

  const handleStart = () => {
    console.info('[room] startGame', current.roomCode)
    navigate(`/game/${current.roomCode}`)
  }

  return (
    <Container size="xl" py="xl">
      <Stack gap="md" mb="xl">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <Stack gap={6}>
            <NeonBadge tone="cyan" pulse>LOBBY · STANDBY</NeonBadge>
            <Group gap="xs" align="baseline">
              <Text ff="var(--fw-font-mono)" fz={12} lts="0.18em" tt="uppercase" c="var(--fw-text-dim)">ROOM</Text>
              <Title order={1} className={classes.code}>{current.roomCode}</Title>
            </Group>
          </Stack>
          <Stack gap={8} align="flex-end">
            <CopyButton value={inviteLink}>
              {({ copied, copy }) => (
                <Tooltip label={copied ? 'Copied' : 'Copy invite link'}>
                  <SciFiButton tone="ghost" onClick={copy}>
                    {copied ? 'LINK COPIED' : 'COPY INVITE'}
                  </SciFiButton>
                </Tooltip>
              )}
            </CopyButton>
            <SciFiButton tone="ghost" size="xs" onClick={() => { leaveRoom(); navigate('/home') }}>
              Leave room
            </SciFiButton>
          </Stack>
        </Group>
      </Stack>

      <Grid gap="xl">
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <SciFiCard variant="panel">
            <Text ff="var(--fw-font-display)" fz={12} lts="0.18em" tt="uppercase" c="var(--fw-text-dim)" mb="md">
              Operatives ({current.players.length}/{current.maxPlayers})
            </Text>
            <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
              {Array.from({ length: current.maxPlayers }).map((_, i) => (
                <PlayerSlot key={i} index={i} player={current.players[i]} />
              ))}
            </SimpleGrid>
          </SciFiCard>
        </Grid.Col>

        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Stack gap="lg">
            <SciFiCard variant="panel">
              <Text ff="var(--fw-font-display)" fz={12} lts="0.18em" tt="uppercase" c="var(--fw-text-dim)" mb="md">
                Difficulty
              </Text>
              <SegmentedControl
                fullWidth
                disabled={!isHost}
                value={current.difficulty}
                onChange={(v) => setDifficulty(v as Difficulty)}
                data={[
                  { value: 'EASY', label: 'Easy' },
                  { value: 'NORMAL', label: 'Normal' },
                  { value: 'HARD', label: 'Hard' },
                ]}
              />
              <Text ff="var(--fw-font-mono)" fz={11} lts="0.06em" c="var(--fw-text-dim)" mt="sm">
                {!isHost && 'Only the host can change difficulty.'}
                {isHost && difficultyHint(current.difficulty)}
              </Text>
            </SciFiCard>

            <SciFiCard variant="panel">
              <Text ff="var(--fw-font-display)" fz={12} lts="0.18em" tt="uppercase" c="var(--fw-text-dim)" mb="md">
                Your status
              </Text>
              <Stack gap="md">
                <SciFiButton tone={me?.isReady ? 'danger' : 'primary'} size="lg" fullWidth onClick={() => setReady(!me?.isReady)}>
                  {me?.isReady ? 'Cancel ready' : 'Mark ready'}
                </SciFiButton>
                {isHost && (
                  <SciFiButton tone="primary" size="lg" fullWidth disabled={!allReady} onClick={handleStart}>
                    {allReady ? 'Initiate Run' : 'Awaiting all ready…'}
                  </SciFiButton>
                )}
              </Stack>
            </SciFiCard>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  )
}

function difficultyHint(d: Difficulty) {
  switch (d) {
    case 'EASY': return '8 minute timer · −5 stability per mistake'
    case 'NORMAL': return '6 minute timer · −10 stability per mistake'
    case 'HARD': return '4 minute timer · −15 stability and −10s per mistake'
    default: return ''
  }
}
