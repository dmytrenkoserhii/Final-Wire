import { useState } from 'react'
import { Avatar, Container, Grid, Group, Paper, SimpleGrid, Stack, Text, TextInput, Title } from '@mantine/core'
import { notifications } from '@mantine/notifications'
import { SciFiCard } from '../../shared/ui/SciFiCard'
import { SciFiButton } from '../../shared/ui/SciFiButton'
import { NeonBadge } from '../../shared/ui/NeonBadge'
import { useAuth } from '../../app/providers/auth.provider'
import classes from './ProfilePage.module.css'

const MOCK_STATS = [
  { label: 'Games played', value: 27 },
  { label: 'Wins', value: 18 },
  { label: 'Win rate', value: '67%' },
  { label: 'Best score', value: 3120 },
  { label: 'Modules solved', value: 92 },
  { label: 'Avg. mistakes', value: 2.4 },
]

const MOCK_HISTORY = [
  { id: 'r1', date: '2026-05-04', won: true, score: 2480, role: 'OPERATOR' },
  { id: 'r2', date: '2026-05-03', won: false, score: 720, role: 'EXPERT' },
  { id: 'r3', date: '2026-05-01', won: true, score: 3120, role: 'OPERATOR' },
  { id: 'r4', date: '2026-04-29', won: true, score: 1980, role: 'EXPERT' },
]

export function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const [name, setName] = useState(user?.displayName ?? '')
  const [editing, setEditing] = useState(false)

  if (!user) return null

  const handleSave = () => {
    if (name.trim().length < 2) {
      notifications.show({ color: 'red', title: 'Invalid name', message: 'Display name must be at least 2 characters.' })
      return
    }
    updateProfile({ displayName: name.trim() })
    setEditing(false)
    notifications.show({ color: 'teal', title: 'Saved', message: 'Profile updated.' })
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xs" mb="xl">
        <NeonBadge tone="cyan">PERSONNEL FILE</NeonBadge>
        <Title order={1} className={classes.heading}>Operator Profile</Title>
      </Stack>

      <Grid gap="xl">
        <Grid.Col span={{ base: 12, md: 5 }}>
          <SciFiCard variant="panel">
            <Stack align="center" gap="md">
              <div className={classes.avatarFrame}>
                <Avatar src={user.avatarUrl} size={140} radius="50%" />
              </div>

              {editing ? (
                <Stack gap="xs" w="100%">
                  <TextInput
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    size="md"
                    styles={{
                      input: {
                        fontFamily: 'var(--fw-font-display)',
                        textAlign: 'center',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                      },
                    }}
                  />
                  <Group grow>
                    <SciFiButton tone="ghost" onClick={() => { setName(user.displayName); setEditing(false) }}>Cancel</SciFiButton>
                    <SciFiButton tone="primary" onClick={handleSave}>Save</SciFiButton>
                  </Group>
                </Stack>
              ) : (
                <Stack gap={4} align="center">
                  <Title order={2} className={classes.name}>{user.displayName}</Title>
                  <Text ff="var(--fw-font-mono)" fz={12} c="var(--fw-text-dim)">{user.email}</Text>
                  <SciFiButton tone="ghost" size="xs" onClick={() => setEditing(true)} mt={8}>
                    Edit name
                  </SciFiButton>
                </Stack>
              )}

              <NeonBadge tone="cyan" size="sm">ID · {user.id}</NeonBadge>
            </Stack>
          </SciFiCard>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 7 }}>
          <Stack gap="lg">
            <SciFiCard variant="panel">
              <Text ff="var(--fw-font-display)" fz={13} lts="0.16em" tt="uppercase" c="var(--fw-text-dim)" mb="md">
                Career stats
              </Text>
              <SimpleGrid cols={3} spacing="md">
                {MOCK_STATS.map((s) => (
                  <Paper key={s.label} radius="sm" p="sm" className={classes.stat}>
                    <Text ff="var(--fw-font-display)" fz={22} fw={700} c="var(--fw-accent)">
                      {s.value}
                    </Text>
                    <Text ff="var(--fw-font-mono)" fz={11} tt="uppercase" lts="0.1em" c="var(--fw-text-dim)">
                      {s.label}
                    </Text>
                  </Paper>
                ))}
              </SimpleGrid>
            </SciFiCard>

            <SciFiCard variant="panel">
              <Text ff="var(--fw-font-display)" fz={13} lts="0.16em" tt="uppercase" c="var(--fw-text-dim)" mb="md">
                Recent runs
              </Text>
              <Stack gap="xs">
                {MOCK_HISTORY.map((h) => (
                  <Paper key={h.id} radius="sm" p="sm" className={classes.historyRow}>
                    <Text ff="var(--fw-font-mono)" fz={12} c="var(--fw-text-dim)">{h.date}</Text>
                    <NeonBadge tone={h.won ? 'green' : 'red'} size="sm">{h.won ? 'WIN' : 'LOSS'}</NeonBadge>
                    <NeonBadge tone="muted" size="sm">{h.role}</NeonBadge>
                    <Text ff="var(--fw-font-display)" fz={14} fw={600} c="var(--fw-text)" ta="right" lts="0.04em">
                      {h.score} pts
                    </Text>
                  </Paper>
                ))}
              </Stack>
            </SciFiCard>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  )
}
