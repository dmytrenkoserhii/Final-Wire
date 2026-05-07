import type { ReactNode } from 'react'
import { Group, Paper, Stack, Text, Title } from '@mantine/core'
import { NeonBadge } from '../../../shared/ui/NeonBadge'
import classes from './ModuleShell.module.css'

interface Props {
  title: string
  index: string
  status?: ReactNode
  children: ReactNode
  footer?: ReactNode
}

export function ModuleShell({ title, index, status, children, footer }: Props) {
  return (
    <Paper
      component="section"
      radius="md"
      className={classes.shell}
    >
      <Group justify="space-between" align="center" gap="md" p="md" className={classes.header}>
        <Stack gap={4}>
          <Text ff="var(--fw-font-mono)" fz={11} lts="0.24em" tt="uppercase" c="var(--fw-text-dim)">
            {index}
          </Text>
          <Title order={3} className={classes.title}>
            {title}
          </Title>
        </Stack>
        <div>
          {status ?? (
            <NeonBadge tone="cyan" size="sm" pulse>
              LIVE
            </NeonBadge>
          )}
        </div>
      </Group>
      <Stack gap="md" p="lg" className={classes.body}>
        {children}
      </Stack>
      {footer && (
        <Group justify="space-between" align="center" gap="md" p="md" className={classes.footer}>
          {footer}
        </Group>
      )}
    </Paper>
  )
}
