import { AppHeader } from '@/components/dashboard/app-header'
import { AppSidebar } from '@/components/dashboard/app-sidebar'
import { AppShell } from '@mantine/core'
import Image from 'next/image'
import { useState } from 'react'

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = useState(false)

  return (
    <AppShell
      padding={0}
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
      navbarOffsetBreakpoint="md"
      navbar={<AppSidebar opened={opened} />}
      header={<AppHeader opened={opened} setOpened={setOpened} />}
    >
      {children ? (
        children
      ) : (
        <div className="flex h-full flex-col items-center justify-center space-y-10">
          <Image
            src="/images/not-found.svg"
            width={250}
            height={250}
            alt="NotFoundImage"
          />
          <span className="text-base font-normal text-indigo-500 antialiased sm:text-xl">
            Nothing here go to the courses page
          </span>
        </div>
      )}
    </AppShell>
  )
}
