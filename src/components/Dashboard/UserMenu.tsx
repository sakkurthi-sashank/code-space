import { supabase } from '@/lib/supabase'
import { Avatar, Menu } from '@mantine/core'
import { IconLogout, IconUserCircle } from '@tabler/icons-react'
import { useRouter } from 'next/router'

export const UserMenu = () => {
  const router = useRouter()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <Menu shadow="md" width={180} withArrow>
      <Menu.Target>
        <Avatar
          className="cursor-pointer"
          size="sm"
          src="https://avatars.githubusercontent.com/u/4060187?v=4"
        />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          color="gray"
          icon={<IconUserCircle size="1.125rem" />}
          onClick={() => router.push('/profile')}
        >
          Profile
        </Menu.Item>
        <Menu.Item
          color="red"
          icon={<IconLogout size="1.125rem" />}
          onClick={() => handleSignOut()}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
