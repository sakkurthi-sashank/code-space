import { ActionIcon } from '@mantine/core'
import {
  SpotlightAction,
  SpotlightProvider,
  spotlight,
} from '@mantine/spotlight'
import { IconSearch } from '@tabler/icons-react'

export const Search = () => {
  return (
    <div>
      <SpotlightProvider
        actions={actions}
        searchIcon={<IconSearch size="1.2rem" />}
        searchPlaceholder="Search..."
        shortcut="mod + shift + 1"
        nothingFoundMessage="Nothing found..."
      >
        <ActionIcon
          variant="light"
          onClick={() => {
            spotlight.open()
          }}
        >
          <IconSearch size="1.125rem" />
        </ActionIcon>
      </SpotlightProvider>
    </div>
  )
}

const actions: SpotlightAction[] = []
