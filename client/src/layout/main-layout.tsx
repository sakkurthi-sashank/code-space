import { AppHeader } from '@/components/Dashboard/app-header'
import { AppShell } from '@mantine/core'
import React, { useState } from 'react'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [opened, setOpened] = useState(false)

  return (
    <AppShell
      padding={0}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
      header={<AppHeader />}
    >
      {children}
    </AppShell>
  )
}
