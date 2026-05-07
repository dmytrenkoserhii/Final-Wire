import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { ActionIcon, Badge, Button, Group, Paper, Stack, Text } from '@mantine/core'
import { useGame } from '../features/game/context/game.context'
import { useAuth } from '../app/providers/auth.provider'
import { useRoom } from '../features/room/context/room.context'
import classes from './DevToolbar.module.css'

const PAGES = [
  { label: 'Auth', path: '/auth' },
  { label: 'Home', path: '/home' },
  { label: 'Profile', path: '/profile' },
  { label: 'Room', path: '/room/DEV001' },
  { label: 'Game', path: '/game/DEV001' },
  { label: 'Result | Win', path: '/result/sess_mock?result=win' },
  { label: 'Result | Loss', path: '/result/sess_mock?result=loss' },
]

export function DevToolbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const role = useGame((s) => s.game.role)
  const stability = useGame((s) => s.game.stability)
  const setRole = useGame((s) => s.setRole)
  const applyPenalty = useGame((s) => s.applyPenalty)
  const forceWin = useGame((s) => s.forceWin)
  const forceLoss = useGame((s) => s.forceLoss)
  const reset = useGame((s) => s.reset)
  const isAuthenticated = useAuth((s) => s.isAuthenticated)
  const signInWithGoogle = useAuth((s) => s.signInWithGoogle)
  const signOut = useAuth((s) => s.signOut)
  const roomCode = useRoom((s) => s.room?.roomCode)
  const [open, setOpen] = useState(true)

  const onGame = location.pathname.startsWith('/game')

  return (
    <Paper
      radius="md"
      p={open ? 'sm' : 0}
      className={[classes.root, open ? classes.open : classes.closed].join(' ')}
    >
      <ActionIcon
        variant="filled"
        color="dark"
        size="sm"
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle dev panel"
        className={classes.toggle}
      >
        {open ? 'x' : 'D'}
      </ActionIcon>

      {open && (
        <Stack gap="sm" className={classes.body}>
          <DevSection label="NAVIGATE">
            <Group gap={4} wrap="wrap">
              {PAGES.map((p) => (
                <Button
                  key={p.path}
                  size="compact-xs"
                  variant={location.pathname + location.search === p.path ? 'filled' : 'default'}
                  color="gray"
                  onClick={() => navigate(p.path)}
                  fz={10}
                >
                  {p.label}
                </Button>
              ))}
            </Group>
          </DevSection>

          {onGame && (
            <DevSection label="GAME | ROLE">
              <Group gap={4} wrap="wrap">
                <Button
                  size="compact-xs"
                  variant={role === 'OPERATOR' ? 'filled' : 'default'}
                  color="gray"
                  onClick={() => setRole('OPERATOR')}
                  fz={10}
                >
                  Operator
                </Button>
                <Button
                  size="compact-xs"
                  variant={role === 'EXPERT' ? 'filled' : 'default'}
                  color="gray"
                  onClick={() => setRole('EXPERT')}
                  fz={10}
                >
                  Expert
                </Button>
              </Group>
              <Text ff="var(--fw-font-mono)" fz={9} lts="0.18em" tt="uppercase" c="dimmed" mt={6}>
                MOCK EVENTS
              </Text>
              <Group gap={4} wrap="wrap">
                <Button size="compact-xs" variant="default" color="gray" onClick={() => applyPenalty(-10)} fz={10}>-10 stab</Button>
                <Button size="compact-xs" variant="default" color="gray" onClick={() => applyPenalty(-30, -10)} fz={10}>-30 stab / -10s</Button>
                <Button size="compact-xs" variant="default" color="gray" onClick={forceWin} fz={10}>Win</Button>
                <Button size="compact-xs" variant="default" color="gray" onClick={forceLoss} fz={10}>Loss</Button>
                <Button size="compact-xs" variant="default" color="gray" onClick={() => reset(role)} fz={10}>Reset</Button>
              </Group>
            </DevSection>
          )}

          <DevSection label="AUTH">
            <Button
              size="compact-xs"
              variant="default"
              color="gray"
              fz={10}
              onClick={() => (isAuthenticated ? signOut() : signInWithGoogle())}
            >
              {isAuthenticated ? 'Sign out' : 'Sign in (mock)'}
            </Button>
          </DevSection>

          <Stack gap={2} mt={6}>
            <MetaRow k="route" v={location.pathname} />
            <MetaRow k="auth" v={isAuthenticated ? 'on' : 'off'} />
            <MetaRow k="room" v={roomCode ?? '-'} />
            <MetaRow k="stab" v={`${stability}%`} />
          </Stack>
        </Stack>
      )}
    </Paper>
  )
}

function DevSection({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Stack gap={4}>
      <Badge variant="outline" color="gray" size="xs" radius="sm">
        {label}
      </Badge>
      {children}
    </Stack>
  )
}

function MetaRow({ k, v }: { k: string; v: string }) {
  return (
    <Group gap={6} wrap="nowrap">
      <Text ff="var(--fw-font-mono)" fz={9} lts="0.12em" c="dimmed" w={40}>
        {k}
      </Text>
      <Text ff="var(--fw-font-mono)" fz={10} c="var(--fw-text-dim)" truncate>
        {v}
      </Text>
    </Group>
  )
}
