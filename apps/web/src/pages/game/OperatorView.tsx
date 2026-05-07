import { useState } from 'react'
import { Paper, SimpleGrid, Stack, Text } from '@mantine/core'
import { useGame } from '../../features/game/context/game.context'
import { ModuleCard } from '../../features/operator/components/ModuleCard'
import { WiresModule } from '../../features/operator/modules/WiresModule'
import { GlyphModule } from '../../features/operator/modules/GlyphModule'
import { PressureModule } from '../../features/operator/modules/PressureModule'
import { KeypadModule } from '../../features/operator/modules/KeypadModule'
import type { ModuleKey } from '../../shared/types/game.types'
import classes from './OperatorView.module.css'

export function OperatorView() {
  const { game } = useGame()
  const [active, setActive] = useState<ModuleKey | null>(null)

  return (
    <div className={classes.shell}>
      <div className={classes.gridSection}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg">
          {game.modules.map((m) => (
            <ModuleCard key={m.moduleId} module={m} isActive={active === m.moduleKey} onActivate={() => setActive(m.moduleKey)} />
          ))}
        </SimpleGrid>
      </div>

      <div className={classes.detailSection}>
        {active === 'WIRES' && <WiresModule />}
        {active === 'GLYPHS' && <GlyphModule />}
        {active === 'PRESSURE' && <PressureModule />}
        {active === 'KEYPAD' && <KeypadModule />}
        {active === null && (
          <Paper radius="md" p="xl" className={classes.prompt}>
            <Stack align="center" gap="sm">
              <Text ff="var(--fw-font-mono)" fz={11} lts="0.24em" tt="uppercase" c="var(--fw-text-dim)">
                SYSTEM IDLE
              </Text>
              <Text fz="sm" c="var(--fw-text-dim)" ta="center">
                Select a module from the panel to begin diagnostics.
              </Text>
            </Stack>
          </Paper>
        )}
      </div>
    </div>
  )
}
