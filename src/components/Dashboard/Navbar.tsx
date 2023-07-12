import { supabase } from '@/libs/supabase'
import { ActionIcon, Navbar as AppNavbar, Tooltip } from '@mantine/core'
import { IconLogout } from '@tabler/icons-react'

export const Navbar = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AppNavbar p="md" width={{ base: 80 }}>
      <AppNavbar.Section>{}</AppNavbar.Section>
      <AppNavbar.Section grow>{}</AppNavbar.Section>
      <AppNavbar.Section className="flex items-center justify-center">
        <Tooltip label="Logout" color="red" position="right" withArrow>
          <ActionIcon
            variant="light"
            color="red"
            size={'md'}
            radius="md"
            onClick={handleLogout}
          >
            <IconLogout size={'0.9rem'} />
          </ActionIcon>
        </Tooltip>
      </AppNavbar.Section>
    </AppNavbar>
  )
}
