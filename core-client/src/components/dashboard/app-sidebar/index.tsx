import { Navbar } from '@mantine/core'
import { MainLinks } from './_mainLinks'
import { User } from './_user'

export function AppSidebar({ opened }: { opened: boolean }) {
  return (
    <Navbar width={{ base: 275 }} p="xs" hiddenBreakpoint="md" hidden={!opened}>
      <Navbar.Section grow>
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <User />
      </Navbar.Section>
    </Navbar>
  )
}
