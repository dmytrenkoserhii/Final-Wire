import { useState } from 'react'
import { Group, Paper, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import { ModuleShell } from '../components/ModuleShell'
import { SciFiButton } from '../../../shared/ui/SciFiButton'
import { useGame } from '../../game/context/game.context'
import classes from './KeypadModule.module.css'

const TARGET = '4815'
const MAX = 4

export function KeypadModule() {
  const { setModuleState, applyPenalty } = useGame()
  const [code, setCode] = useState('')

  const press = (k: string) => {
    if (code.length >= MAX) return
    setCode((c) => c + k)
  }

  const clear = () => setCode('')
  const back = () => setCode((c) => c.slice(0, -1))

  const submit = () => {
    console.info('[op] keypad submit', code)
    if (code === TARGET) setModuleState('KEYPAD', 'SOLVED')
    else applyPenalty(-10)
    setCode('')
  }

  return (
    <ModuleShell title="Keypad Code" index="MODULE 04 · KEYPAD">
      <Text ff="var(--fw-font-mono)" fz={12} c="var(--fw-text-dim)">
        Enter the 4-digit override code dictated by your manual operator.
      </Text>

      <Paper radius="md" p="md" className={classes.display}>
        <Group gap="sm" justify="center">
          {Array.from({ length: MAX }).map((_, i) => (
            <Paper
              key={i}
              radius="sm"
              className={[classes.digit, code[i] ? classes.digitOn : ''].join(' ')}
            >
              <Text ff="var(--fw-font-display)" fz={38} ta="center" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {code[i] ?? '–'}
              </Text>
            </Paper>
          ))}
        </Group>
      </Paper>

      <SimpleGrid cols={3} spacing="sm">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((k) => (
          <UnstyledButton key={k} className={classes.key} onClick={() => press(k)}>
            <Text ff="var(--fw-font-display)" fz={28}>{k}</Text>
          </UnstyledButton>
        ))}
        <UnstyledButton className={[classes.key, classes.kAlt].join(' ')} onClick={back}>
          <Text ff="var(--fw-font-display)" fz={28}>←</Text>
        </UnstyledButton>
        <UnstyledButton className={classes.key} onClick={() => press('0')}>
          <Text ff="var(--fw-font-display)" fz={28}>0</Text>
        </UnstyledButton>
        <UnstyledButton className={[classes.key, classes.kAlt].join(' ')} onClick={clear}>
          <Text ff="var(--fw-font-display)" fz={28}>C</Text>
        </UnstyledButton>
      </SimpleGrid>

      <SciFiButton tone="primary" size="lg" fullWidth disabled={code.length !== MAX} onClick={submit}>
        Submit code
      </SciFiButton>
    </ModuleShell>
  )
}
