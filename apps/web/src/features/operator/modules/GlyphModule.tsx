import { useState } from 'react'
import { Group, Paper, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import { ModuleShell } from '../components/ModuleShell'
import { SciFiButton } from '../../../shared/ui/SciFiButton'
import { useGame } from '../../game/context/game.context'
import classes from './GlyphModule.module.css'

const GLYPHS = ['Ψ', 'Δ', 'Φ', 'Ω', 'Λ', 'Ξ', 'Σ', 'Θ', '∮', '⌬', '⌖', '⌘', '◬', '◈', '◉', '⟁']
const TARGET = ['Ψ', 'Δ', 'Φ']

export function GlyphModule() {
  const { setModuleState, applyPenalty } = useGame()
  const [sequence, setSequence] = useState<string[]>([])

  const handlePick = (g: string) => {
    console.info('[op] glyph picked', g)
    const expected = TARGET[sequence.length]
    if (g !== expected) {
      applyPenalty(-10)
      setSequence([])
      return
    }
    const next = [...sequence, g]
    setSequence(next)
    if (next.length === TARGET.length) {
      setModuleState('GLYPHS', 'SOLVED')
    }
  }

  return (
    <ModuleShell title="Glyph Sequence" index="MODULE 02 · GLYPHS">
      <Text ff="var(--fw-font-mono)" fz={12} c="var(--fw-text-dim)">
        Press the glyphs in the order specified by the runic key in your manual.
      </Text>

      <Paper radius="md" p="sm" className={classes.progress}>
        <Group gap="md" justify="center">
          {Array.from({ length: TARGET.length }).map((_, i) => (
            <Paper
              key={i}
              radius="sm"
              className={[classes.slot, sequence[i] ? classes.slotFilled : ''].join(' ')}
            >
              <Text ff="var(--fw-font-display)" fz={28} ta="center">
                {sequence[i] ?? '_'}
              </Text>
            </Paper>
          ))}
        </Group>
      </Paper>

      <SimpleGrid cols={4} spacing="sm">
        {GLYPHS.map((g) => (
          <UnstyledButton key={g} className={classes.cell} onClick={() => handlePick(g)}>
            <Text ff="var(--fw-font-display)" fz={28}>
              {g}
            </Text>
          </UnstyledButton>
        ))}
      </SimpleGrid>

      <SciFiButton tone="ghost" onClick={() => setSequence([])}>
        Reset sequence
      </SciFiButton>
    </ModuleShell>
  )
}
