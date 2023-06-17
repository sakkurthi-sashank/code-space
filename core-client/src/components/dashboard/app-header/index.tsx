import { Burger, Header, MediaQuery, useMantineTheme } from '@mantine/core'
import { Brand } from './_brand'
import { Notifications } from './_notifications'
import { Search } from './_search'
import { User } from './_user'

export const AppHeader = ({
  opened,
  setOpened,
}: {
  opened: boolean
  setOpened: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const theme = useMantineTheme()
  return (
    <Header
      height={{ base: 55 }}
      p="md"
      className="flex items-center justify-between"
    >
      <div className="flex items-center space-x-3">
        <MediaQuery largerThan="md" styles={{ display: 'none' }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            color={theme.colors.gray[6]}
          />
        </MediaQuery>
        <Brand />
      </div>
      <div className="flex space-x-6">
        <Search />
        <Notifications />
        <User />
      </div>
    </Header>
  )
}
