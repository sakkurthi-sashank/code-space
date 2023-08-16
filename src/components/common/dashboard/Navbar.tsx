import { ActionIcon, Navbar as AppNavbar, Tooltip } from '@mantine/core'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconLogout } from '@tabler/icons-react'

export const Navbar = () => {
  const supabase = useSupabaseClient()

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <AppNavbar p="md" width={{ base: 70 }}>
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
