import { AppHeader } from '@/components/common/app-header'
import { AppSidebar } from '@/components/common/app-sidebar'
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
      navbarOffsetBreakpoint="md"
      navbar={<AppSidebar opened={opened} />}
      header={<AppHeader opened={opened} setOpened={setOpened} />}
    >
      {children}
    </AppShell>
  )
}
