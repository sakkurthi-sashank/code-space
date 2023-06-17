import { useUser } from '@clerk/nextjs'
import {
  Box,
  Group,
  Text,
  UnstyledButton,
  rem,
  useMantineTheme,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'

export function User() {
  const theme = useMantineTheme()
  const { user } = useUser()

  return (
    <Box
      sx={{
        paddingTop: theme.spacing.sm,
        borderTop: `${rem(1)} solid ${
          theme.colorScheme === 'dark'
            ? theme.colors.dark[4]
            : theme.colors.gray[2]
        }`,
      }}
    >
      <UnstyledButton
        mb={theme.spacing.xs}
        sx={{
          display: 'block',
          width: '100%',
          padding: theme.spacing.xs,
          borderRadius: theme.radius.sm,
          color:
            theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

          '&:hover': {
            backgroundColor:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[6]
                : theme.colors.gray[0],
          },
        }}
      >
        <Group>
          <Box sx={{ flex: 1 }}>
            <Text size="sm" className="text-gray-700" weight={500}>
              {user?.firstName}
            </Text>
            <Text color="dimmed" size="xs">
              {user?.emailAddresses[0]?.emailAddress}
            </Text>
          </Box>
          <IconChevronRight size={rem(18)} />
        </Group>
      </UnstyledButton>
    </Box>
  )
}
