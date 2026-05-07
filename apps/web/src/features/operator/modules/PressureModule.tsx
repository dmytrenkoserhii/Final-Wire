import { useState } from 'react'
import { Group, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import { ModuleShell } from '../components/ModuleShell'
import { SciFiButton } from '../../../shared/ui/SciFiButton'
import { useGame } from '../../game/context/game.context'
import classes from './PressureModule.module.css'

const SWITCHES = ['α', 'β', 'γ', 'δ', 'ε']
const TARGET = [true, false, true, true, false]

export function PressureModule() {
  const { setModuleState, applyPenalty } = useGame()
  const [state, setState] = useState<boolean[]>([false, false, false, false, false])

  const toggle = (i: number) => {
    setState((s) => s.map((v, idx) => (idx === i ? !v : v)))
  }

  const submit = () => {
    console.info('[op] pressure submit', state)
    const ok = state.every((v, i) => v === TARGET[i])
    if (ok) setModuleState('PRESSURE', 'SOLVED')
    else applyPenalty(-10)
  }

  return (
    <ModuleShell title="Pressure Switches" index="MODULE 03 · PRESSURE">
      <Text ff="var(--fw-font-mono)" fz={12} c="var(--fw-text-dim)">
        Configure the valve switches as instructed by the manual, then commit.
      </Text>

      <SimpleGrid cols={5} spacing="md">
        {SWITCHES.map((label, i) => (
          <UnstyledButton
            key={label}
            onClick={() => toggle(i)}
            className={[classes.switch, state[i] ? classes.on : classes.off].join(' ')}
          >
            <span className={classes.knob} />
            <Text ff="var(--fw-font-display)" fz={18} lts="0.1em" c="var(--fw-text)">
              {label}
            </Text>
            <Text ff="var(--fw-font-mono)" fz={10} lts="0.18em" tt="uppercase" c={state[i] ? 'var(--fw-accent)' : 'var(--fw-text-dim)'}>
              {state[i] ? 'OPEN' : 'SHUT'}
            </Text>
          </UnstyledButton>
        ))}
      </SimpleGrid>

      <Group justify="space-between" gap="md">
        <SciFiButton tone="ghost" onClick={() => setState([false, false, false, false, false])}>
          Reset
        </SciFiButton>
        <SciFiButton tone="primary" onClick={submit}>
          Commit configuration
        </SciFiButton>
      </Group>
    </ModuleShell>
  )
}
