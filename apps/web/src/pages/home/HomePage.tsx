import { Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { SciFiCard } from '../../shared/ui/SciFiCard'
import { NeonBadge } from '../../shared/ui/NeonBadge'
import { CreateRoomForm } from '../../features/room/components/CreateRoomForm'
import { JoinRoomForm } from '../../features/room/components/JoinRoomForm'
import { useAuth } from '../../app/providers/auth.provider'
import classes from './HomePage.module.css'

export function HomePage() {
  const { user } = useAuth()

  return (
    <Container size="lg" py="xl">
      <Stack gap="xs" mb="xl">
        <NeonBadge tone="cyan" pulse>
          MAIN TERMINAL
        </NeonBadge>
        <Title order={1} className={classes.heading}>
          Welcome back, <Text span c="var(--fw-accent)" inherit className={classes.accent}>{user?.displayName}</Text>
        </Title>
        <Text c="var(--fw-text-dim)">Host a new reactor or connect to an existing run.</Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        <SciFiCard variant="panel">
          <Group gap="md" align="flex-start" mb="lg">
            <Text ff="var(--fw-font-display)" fz={32} fw={700} c="var(--fw-accent)" lh={1} className={classes.accent}>
              01
            </Text>
            <Stack gap={4}>
              <Title order={3} className={classes.cardTitle}>Host a Run</Title>
              <Text fz={13} c="var(--fw-text-dim)">Spin up a new reactor and invite up to 3 experts.</Text>
            </Stack>
          </Group>
          <CreateRoomForm />
        </SciFiCard>

        <SciFiCard variant="panel">
          <Group gap="md" align="flex-start" mb="lg">
            <Text ff="var(--fw-font-display)" fz={32} fw={700} c="var(--fw-accent)" lh={1} className={classes.accent}>
              02
            </Text>
            <Stack gap={4}>
              <Title order={3} className={classes.cardTitle}>Join a Run</Title>
              <Text fz={13} c="var(--fw-text-dim)">Got a code? Patch into your team's session.</Text>
            </Stack>
          </Group>
          <JoinRoomForm />
        </SciFiCard>
      </SimpleGrid>
    </Container>
  )
}
