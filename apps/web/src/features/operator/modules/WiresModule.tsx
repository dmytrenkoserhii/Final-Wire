import { useState } from 'react'
import { Group, Paper, SimpleGrid, Text, UnstyledButton } from '@mantine/core'
import { ModuleShell } from '../components/ModuleShell'
import { useGame } from '../../game/context/game.context'
import classes from './WiresModule.module.css'

const COLORS = [
  { id: 'red', label: 'Red', hex: '#ff1744' },
  { id: 'amber', label: 'Amber', hex: '#ffb300' },
  { id: 'cyan', label: 'Cyan', hex: '#00e5ff' },
  { id: 'green', label: 'Green', hex: '#00e676' },
  { id: 'violet', label: 'Violet', hex: '#b388ff' },
]

export function WiresModule() {
  const { setModuleState, applyPenalty } = useGame()
  const [cut, setCut] = useState<Set<string>>(new Set())

  const handleCut = (id: string) => {
    if (cut.has(id)) return
    console.info('[op] cut wire', id)
    setCut((s) => new Set(s).add(id))
    if (id === 'cyan') setModuleState('WIRES', 'SOLVED')
    else applyPenalty(-10)
  }

  return (
    <ModuleShell title="Coolant Wires" index="MODULE 01 · WIRES">
      <Text ff="var(--fw-font-mono)" fz={12} c="var(--fw-text-dim)">
        Five coolant lines. Cut exactly one — your team's manual identifies it.
      </Text>
      <Paper radius="md" p="md" className={classes.board}>
        <SimpleGrid cols={3} spacing="md" className={classes.boardGrid}>
          <div className={classes.portCol}>
            {COLORS.map((c) => (
              <span key={`l-${c.id}`} className={classes.port} style={{ background: c.hex }} />
            ))}
          </div>

          <svg className={classes.svg} viewBox="0 0 400 240" preserveAspectRatio="none">
            {COLORS.map((c, i) => {
              const y = 24 + i * 48
              const isCut = cut.has(c.id)
              return (
                <g key={c.id} onClick={() => handleCut(c.id)} style={{ cursor: isCut ? 'default' : 'pointer' }}>
                  <path
                    d={`M 0 ${y} C 120 ${y - 10}, 280 ${y + 10}, 400 ${y}`}
                    stroke={c.hex}
                    strokeWidth="6"
                    fill="none"
                    strokeLinecap="round"
                    opacity={isCut ? 0.25 : 1}
                    style={{ filter: isCut ? 'none' : `drop-shadow(0 0 6px ${c.hex})` }}
                  />
                  {isCut && (
                    <line x1="190" y1={y - 10} x2="210" y2={y + 10} stroke="#fff" strokeWidth="2" />
                  )}
                </g>
              )
            })}
          </svg>

          <div className={classes.portCol}>
            {COLORS.map((c) => (
              <span key={`r-${c.id}`} className={classes.port} style={{ background: c.hex }} />
            ))}
          </div>
        </SimpleGrid>
      </Paper>

      <Group gap="md" wrap="wrap">
        {COLORS.map((c) => (
          <UnstyledButton key={c.id} className={classes.legendItem} disabled>
            <span className={classes.swatch} style={{ background: c.hex, boxShadow: `0 0 8px ${c.hex}` }} />
            <Text fz={12} ff="var(--fw-font-mono)" tt="uppercase" c="var(--fw-text-dim)">
              {c.label}
            </Text>
          </UnstyledButton>
        ))}
      </Group>
    </ModuleShell>
  )
}
