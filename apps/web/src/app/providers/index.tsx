import { MantineProvider, localStorageColorSchemeManager } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { ReactNode } from 'react'
import { theme, cssVariablesResolver } from '../../shared/styles/theme'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '../../shared/styles/global.css'

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'fw.color-scheme',
})

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      colorSchemeManager={colorSchemeManager}
      cssVariablesResolver={cssVariablesResolver}
    >
      <Notifications position="top-right" />
      {children}
    </MantineProvider>
  )
}
