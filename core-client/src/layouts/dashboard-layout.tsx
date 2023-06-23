import { AppHeader } from '@/components/dashboard/AppHeader'
import { AppSidebar } from '@/components/dashboard/AppSidebar'
import { AppShell } from '@mantine/core'
import { useState } from 'react'

export function DashboardLayout({ children }: { children?: React.ReactNode }) {
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
