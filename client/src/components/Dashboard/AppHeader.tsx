import { supabase } from '@/lib/supabase'
import { ActionIcon, Flex, Header } from '@mantine/core'
import { User } from '@supabase/supabase-js'
import { IconBell, IconSearch } from '@tabler/icons-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { UserMenu } from './UserMenu'

export const AppHeader = () => {
  const [userData, setUserData] = useState<User | null>(null)

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUserData(user)
    }
    fetchUser()
  }, [])

  return (
    <Header
      height={{ base: 55 }}
      className="px-6"
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Image
        src="/images/brand-logo.svg"
        priority={false}
        alt="Logo"
        width={28}
        height={28}
      />

      <Flex align="center" gap="lg">
        {/* Search Button */}
        <ActionIcon variant="light">
          <IconSearch size="1.125rem" />
        </ActionIcon>

        {/* Notification Button */}
        <ActionIcon variant="light">
          <IconBell size="1.125rem" />
        </ActionIcon>

        {/* Clerk User Profile */}
        <UserMenu />
      </Flex>
    </Header>
  )
}
