import { Navbar } from '@mantine/core'
import { HelpLinks } from './_helpLinks'
import { MainLinks } from './_mainLinks'

export function AppSidebar({ opened }: { opened: boolean }) {
  return (
    <Navbar width={{ base: 275 }} p="xs" hiddenBreakpoint="md" hidden={!opened}>
      <Navbar.Section grow>
        <MainLinks />
      </Navbar.Section>
      <Navbar.Section>
        <HelpLinks />
      </Navbar.Section>
    </Navbar>
  )
}
