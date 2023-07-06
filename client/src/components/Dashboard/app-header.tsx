import { ActionIcon, Avatar, Flex, Header } from '@mantine/core'
import { IconBell, IconSearch } from '@tabler/icons-react'
import Image from 'next/image'

export const AppHeader = () => {
  return (
    <Header
      height={{ base: 55 }}
      p="md"
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
        <Avatar
          size="sm"
          src="https://avatars.githubusercontent.com/u/51054900?v=4"
        />
      </Flex>
    </Header>
  )
}
