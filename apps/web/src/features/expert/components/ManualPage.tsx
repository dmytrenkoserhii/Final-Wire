import type { ReactNode } from 'react'
import { Group, Paper, Stack, Text, Title } from '@mantine/core'
import classes from './ManualPage.module.css'

interface Props {
  chapter: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function ManualPage({ chapter, title, subtitle, children }: Props) {
  return (
    <Paper component="article" radius="md" p="xl" className={classes.page}>
      <Stack gap="xs" mb="md" pb="sm" className={classes.head}>
        <Text ff="var(--fw-font-mono)" fz={11} lts="0.24em" style={{ opacity: 0.7 }}>
          CHAPTER {chapter}
        </Text>
        <Title order={2} className={classes.title}>
          {title}
        </Title>
        {subtitle && (
          <Text fz="sm" fs="italic" style={{ opacity: 0.75 }}>
            {subtitle}
          </Text>
        )}
      </Stack>
      <div className={classes.content}>{children}</div>
      <Group justify="space-between" pt="md" mt="lg" className={classes.foot}>
        <Text fz={10} ff="var(--fw-font-mono)" lts="0.18em" tt="uppercase" style={{ opacity: 0.6 }}>
          FINAL WIRE · OPERATIONS MANUAL · MVP-1
        </Text>
        <Text fz={10} ff="var(--fw-font-mono)" lts="0.18em" tt="uppercase" style={{ opacity: 0.6 }}>
          PAGE — / —
        </Text>
      </Group>
    </Paper>
  )
}
