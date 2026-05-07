import { useState } from 'react'
import { NavLink, Paper, Stack, Text } from '@mantine/core'
import { WiresSection } from '../../features/expert/sections/WiresSection'
import { GlyphSection } from '../../features/expert/sections/GlyphSection'
import { PressureSection } from '../../features/expert/sections/PressureSection'
import { KeypadSection } from '../../features/expert/sections/KeypadSection'
import type { ModuleKey } from '../../shared/types/game.types'
import { useGame } from '../../features/game/context/game.context'
import classes from './ExpertView.module.css'

const TABS: { key: ModuleKey; chapter: string; title: string }[] = [
  { key: 'WIRES', chapter: 'I', title: 'Coolant Wires' },
  { key: 'GLYPHS', chapter: 'II', title: 'Glyph Sequence' },
  { key: 'PRESSURE', chapter: 'III', title: 'Pressure Switches' },
  { key: 'KEYPAD', chapter: 'IV', title: 'Keypad Code' },
]

export function ExpertView() {
  const { game } = useGame()
  const [active, setActive] = useState<ModuleKey>('WIRES')

  return (
    <div className={classes.shell}>
      <Paper
        component="aside"
        radius="md"
        p="md"
        className={classes.sidebar}
      >
        <Stack gap="xs" pb="sm" mb="sm" className={classes.sidebarHead}>
          <Text ff="var(--fw-font-display)" fz={12} lts="0.18em" c="var(--fw-accent)">
            FIELD MANUAL
          </Text>
          <Text ff="var(--fw-font-mono)" fz={10} lts="0.18em" c="var(--fw-text-dim)">
            v.MVP-1
          </Text>
        </Stack>

        <Stack gap={4}>
          {TABS.map((t) => {
            const m = game.modules.find((mod) => mod.moduleKey === t.key)
            const solved = m?.state === 'SOLVED'
            return (
              <NavLink
                key={t.key}
                active={active === t.key}
                onClick={() => setActive(t.key)}
                label={t.title}
                description={`CH. ${t.chapter}`}
                rightSection={
                  <Text ff="var(--fw-font-mono)" c={solved ? 'var(--fw-success)' : 'var(--fw-text-dim)'}>
                    {solved ? '✓' : m?.state === 'IN_PROGRESS' ? '…' : '·'}
                  </Text>
                }
                classNames={{
                  root: classes.navLink,
                  label: classes.navLabel,
                  description: classes.navDesc,
                }}
              />
            )
          })}
        </Stack>

        <Paper radius="sm" p="sm" mt="md" className={classes.tip} withBorder>
          <Text ff="var(--fw-font-mono)" fz={10} lts="0.18em" c="var(--fw-warning)" mb={6}>
            HANDLER NOTE
          </Text>
          <Text fz={12} c="var(--fw-text-dim)" lh={1.5}>
            Communicate clearly. Operator cannot see this manual. Do not assume — read the page.
          </Text>
        </Paper>
      </Paper>

      <main className={classes.content}>
        {active === 'WIRES' && <WiresSection />}
        {active === 'GLYPHS' && <GlyphSection />}
        {active === 'PRESSURE' && <PressureSection />}
        {active === 'KEYPAD' && <KeypadSection />}
      </main>
    </div>
  )
}
