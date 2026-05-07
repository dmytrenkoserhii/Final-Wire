import { useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { SciFiCard } from '../../shared/ui/SciFiCard'
import { SciFiButton } from '../../shared/ui/SciFiButton'
import { NeonBadge } from '../../shared/ui/NeonBadge'
import { buildMockResult } from '../../shared/lib/mock-data'
import classes from './ResultPage.module.css'

export function ResultPage() {
  const navigate = useNavigate()
  const [search] = useSearchParams()

  const won = search.get('result') !== 'loss'
  const result = useMemo(() => buildMockResult(won), [won])

  return (
    <Container size="lg" py="xl">
      <Paper radius="md" p="xl" className={[classes.hero, won ? classes.heroWin : classes.heroLoss].join(' ')}>
        <Text ff="var(--fw-font-mono)" fz={12} lts="0.24em" tt="uppercase" c={won ? 'var(--fw-success)' : 'var(--fw-danger)'} className={classes.heroLabel}>
          {won ? 'REACTOR STABILIZED' : 'CONTAINMENT FAILURE'}
        </Text>
        <Title order={1} className={classes.heroTitle}>
          {won ? 'VICTORY' : 'TERMINATED'}
        </Title>
        <Text fz="md" c="var(--fw-text-dim)" ta="center" maw={520} mx="auto">
          {won
            ? 'All required modules solved before timer expiry.'
            : 'Stability dropped to zero. The reactor is offline.'}
        </Text>
      </Paper>

      <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md" mt="xl">
        <StatBox label="Score" value={result.score} accent />
        <StatBox label="Time left" value={`${result.timeRemainingSec}s`} />
        <StatBox label="Final stability" value={`${result.finalStability}%`} />
        <StatBox label="Mistakes" value={result.mistakes} />
      </SimpleGrid>

      <SciFiCard variant="panel" className={classes.breakdown}>
        <Text ff="var(--fw-font-display)" fz={12} lts="0.18em" tt="uppercase" c="var(--fw-text-dim)" mb="md">
          Module breakdown
        </Text>
        <Stack gap="xs">
          {result.modules.map((m) => (
            <Paper key={m.moduleKey} radius="sm" p="sm" className={classes.modRow}>
              <Text ff="var(--fw-font-display)" fz={14} lts="0.1em" tt="uppercase" fw={600} className={classes.modName}>
                {m.moduleKey}
              </Text>
              <NeonBadge tone={modTone(m.state)} size="sm">{m.state}</NeonBadge>
              <Text ff="var(--fw-font-mono)" fz={12} c="var(--fw-text-dim)">
                {m.mistakes} {m.mistakes === 1 ? 'error' : 'errors'}
              </Text>
            </Paper>
          ))}
        </Stack>
      </SciFiCard>

      <Group justify="center" mt="xl" gap="md">
        <SciFiButton tone="ghost" size="lg" onClick={() => navigate('/home')}>Return to terminal</SciFiButton>
        <SciFiButton tone="primary" size="lg" onClick={() => navigate('/home')}>Run again</SciFiButton>
      </Group>
    </Container>
  )
}

function StatBox({ label, value, accent }: { label: string; value: string | number; accent?: boolean }) {
  return (
    <SciFiCard variant="default">
      <Stack gap={4}>
        <Text ff="var(--fw-font-mono)" fz={11} lts="0.18em" tt="uppercase" c="var(--fw-text-dim)">{label}</Text>
        <Text ff="var(--fw-font-display)" fz={28} fw={700} c={accent ? 'var(--fw-accent)' : 'var(--fw-text)'} className={accent ? classes.statValueAccent : undefined}>
          {value}
        </Text>
      </Stack>
    </SciFiCard>
  )
}

function modTone(state: string): 'green' | 'red' | 'amber' | 'muted' {
  if (state === 'SOLVED') return 'green'
  if (state === 'FAILED') return 'red'
  if (state === 'IN_PROGRESS') return 'amber'
  return 'muted'
}
