import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import { IconArchive, IconHelpCircle } from '@tabler/icons-react'
import router from 'next/router'

const helpLinks = [
  {
    label: 'Feedback',
    href: 'https://mantine.dev',
    icon: <IconArchive size="1rem" />,
  },
  {
    label: 'Help & Support',
    href: 'https://discord.gg/eUZpPbpxb4',
    icon: <IconHelpCircle size="1rem" />,
  },
]

export const HelpLinks = () => {
  return (
    <div>
      {helpLinks.map((link) => (
        <UnstyledButton
          key={link.href}
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color: theme.black,
            '&:hover': {
              backgroundColor: theme.colors.gray[0],
            },
          })}
          onClick={() => router.push(link.href)}
        >
          <Group>
            <ThemeIcon size="sm" color="gray" variant="light">
              {link.icon}
            </ThemeIcon>
            <Text size="xs" className="text-gray-700">
              {link.label}
            </Text>
          </Group>
        </UnstyledButton>
      ))}
    </div>
  )
}
