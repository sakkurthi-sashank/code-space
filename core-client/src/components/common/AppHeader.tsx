import { UserButton } from '@clerk/nextjs'
import {
  ActionIcon,
  Burger,
  Header,
  MediaQuery,
  useMantineTheme,
} from '@mantine/core'
import { IconBell, IconSearch } from '@tabler/icons-react'
import Image from 'next/image'

interface AppHeaderProps {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}

export const AppHeader = ({ opened, setOpened }: AppHeaderProps) => {
  const theme = useMantineTheme()

  return (
    <Header
      height={{ base: 55 }}
      p="md"
      className="flex items-center justify-between"
    >
      <div className="flex items-center space-x-3">
        {/* Burger Button (Responsive) */}
        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
          />
        </MediaQuery>

        {/* Brand Logo */}
        <Image
          src="/images/brand-logo.svg"
          priority={false}
          alt="Logo"
          width={28}
          height={28}
        />
      </div>

      <div className="flex space-x-6">
        {/* Search Button */}
        <ActionIcon variant="light">
          <IconSearch size="1.125rem" />
        </ActionIcon>

        {/* Notification Button */}
        <ActionIcon variant="light">
          <IconBell size="1.125rem" />
        </ActionIcon>

        {/* Clerk User Profile */}
        <UserButton />
      </div>
    </Header>
  )
}
