import { Header } from '@/components/Student/Dashboard/Header'
import { Navbar } from '@/components/Student/Dashboard/Navbar'
import { AppShell } from '@mantine/core'

export const Dashboard = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppShell
      padding={0}
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
      header={<Header />}
      navbar={<Navbar />}
    >
      {children}
    </AppShell>
  )
}
