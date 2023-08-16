import { AppShell } from '@mantine/core'
import { Header } from './Header'
import { Navbar } from './Navbar'

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
