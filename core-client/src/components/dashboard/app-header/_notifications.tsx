import { ActionIcon } from '@mantine/core'
import { IconBell } from '@tabler/icons-react'

export const Notifications = () => {
  return (
    <div>
      <ActionIcon variant="light">
        <IconBell size="1.125rem" />
      </ActionIcon>
    </div>
  )
}
