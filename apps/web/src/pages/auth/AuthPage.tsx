import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Group, Loader, Stack, Text } from '@mantine/core'
import { Logo } from '../../shared/ui/Logo'
import { SciFiButton } from '../../shared/ui/SciFiButton'
import { ThemeToggle } from '../../shared/ui/ThemeToggle'
import { NeonBadge } from '../../shared/ui/NeonBadge'
import { useAuth } from '../../app/providers/auth.provider'
import classes from './AuthPage.module.css'

export function AuthPage() {
  const { signInWithGoogle } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signInWithGoogle()
      navigate('/home', { replace: true })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={classes.shell}>
      <Box pos="absolute" top={20} right={24} style={{ zIndex: 5 }}>
        <ThemeToggle />
      </Box>

      <div className={classes.gridBg} aria-hidden="true" />
      <div className={classes.particles} aria-hidden="true">
        {Array.from({ length: 24 }).map((_, i) => (
          <span key={i} style={{ '--i': i } as React.CSSProperties} />
        ))}
      </div>

      <Stack component="main" gap="lg" align="center" justify="center" flex={1} p="xl" pos="relative" style={{ zIndex: 1, animation: 'fw-fade-in 0.6s ease both' }}>
        <Group gap="sm">
          <NeonBadge tone="amber" pulse>
            REACTOR OFFLINE
          </NeonBadge>
          <NeonBadge tone="muted">PROTOCOL v1.0</NeonBadge>
        </Group>

        <Logo size="lg" />

        <Text maw={580} ta="center" c="var(--fw-text-dim)" fz={16} lh={1.6}>
          A cooperative real-time browser puzzle game where one player sees the failing reactor — while the others hold the manual.
        </Text>

        <Stack align="center" gap="sm" mt="md">
          <SciFiButton
            tone="primary"
            size="lg"
            onClick={handleSignIn}
            disabled={loading}
            leftSection={loading ? <Loader size="xs" color="dark" /> : <GoogleGlyph />}
          >
            {loading ? 'Authenticating' : 'Sign in with Google'}
          </SciFiButton>

          <Text ff="var(--fw-font-mono)" fz={11} c="var(--fw-text-dim)" lts="0.08em" tt="uppercase">
            Google identity is required to host or join a reactor session.
          </Text>
        </Stack>
      </Stack>

      <Box component="footer" ta="center" p="md" pos="relative" style={{ zIndex: 1, borderTop: '1px solid var(--fw-border)' }}>
        <Text ff="var(--fw-font-mono)" fz={11} c="var(--fw-text-dim)" lts="0.16em" tt="uppercase">
          SECTOR 7 · NODE 003 · ENCRYPTED CHANNEL
        </Text>
      </Box>
    </div>
  )
}

function GoogleGlyph() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.6 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.5 29.3 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 16.1 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.1 6.5 29.3 4.5 24 4.5 16.3 4.5 9.7 8.6 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-1.9 13.4-5.1l-6.2-5.1c-2 1.5-4.5 2.4-7.2 2.4-5.2 0-9.6-3.3-11.2-7.9l-6.6 5C9.6 38.9 16.2 43.5 24 43.5z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.1C41.3 35.4 43.5 30 43.5 24c0-1.2-.1-2.4-.4-3.5z" />
    </svg>
  )
}
