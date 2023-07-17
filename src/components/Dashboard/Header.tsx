import { useUserAuth } from '@/hooks/userAuthContext'
import {
  ActionIcon,
  Header as AppHeader,
  Avatar,
  Flex,
  TextInput,
  Title,
  useMantineTheme,
} from '@mantine/core'
import { IconBell, IconSearch } from '@tabler/icons-react'

export const Header = () => {
  const { user } = useUserAuth()
  const theme = useMantineTheme()

  return (
    <AppHeader
      height={50}
      className="px-4 flex items-center justify-between w-full"
    >
      <div className="w-full">
        <Title color={theme.colors.indigo[7]} order={4} mb={6} ff="Monaco">
          codespace
        </Title>
      </div>

      <Flex align="center" gap="lg" w={'100%'} justify={'end'}>
        {/* Search Button */}
        <TextInput
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          radius="xl"
          size="xs"
          placeholder="Search"
          w={'50%'}
        />

        {/* Notification Button */}
        <ActionIcon variant="light">
          <IconBell size="1.125rem" />
        </ActionIcon>

        {/* Clerk User Profile */}
        <Avatar
          size="sm"
          radius="xl"
          src={user?.user_metadata?.avatar_url as string}
          alt="User Profile"
        />
      </Flex>
    </AppHeader>
  )
}
