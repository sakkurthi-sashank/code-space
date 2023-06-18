import { useUser } from '@clerk/nextjs'
import { rem, useMantineTheme } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

export function User() {
  const theme = useMantineTheme()
  const { user } = useUser()

  return (
    <div
      className="p-1"
      style={{
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <div className="rounded-md px-2 py-2 hover:bg-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm text-gray-800">{user?.firstName}</span>
            <span className="text-xs text-gray-600">
              {user?.emailAddresses[0]?.emailAddress}
            </span>
          </div>
          <IconChevronRight size={rem(18)} />
        </div>
      </div>
    </div>
  )
}
