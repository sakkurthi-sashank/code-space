import {
  Group,
  Navbar,
  Text,
  ThemeIcon,
  UnstyledButton,
  clsx,
} from '@mantine/core'
import { IconArchive, IconBook, IconHelpCircle } from '@tabler/icons-react'
import { useRouter } from 'next/router'

const linksData = [
  { icon: <IconBook size="1rem" />, label: 'Courses', href: '/courses' },
]

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

export const AppSidebar = ({ opened }: { opened: boolean }) => {
  const router = useRouter()

  const isActive = (href: string) => {
    const currentPath = router.pathname.split('/')[1]
    const linkPath = href.split('/')[1]
    return currentPath === linkPath
  }

  return (
    <Navbar width={{ base: 275 }} p="xs" hiddenBreakpoint="md" hidden={!opened}>
      <Navbar.Section grow className="space-y-2">
        {linksData.map((link) => (
          <UnstyledButton
            key={link.href}
            className={clsx(
              'my-1.5 block w-full rounded-md px-4 py-2.5 hover:bg-gray-100',
              isActive(link.href)
                ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-50 hover:text-indigo-700'
                : 'bg-transparent text-gray-500 hover:bg-indigo-50 hover:text-indigo-700',
            )}
            onClick={() => router.push(link.href)}
          >
            <Group>
              {link.icon}
              <Text size="sm" fw={500}>
                {link.label}
              </Text>
            </Group>
          </UnstyledButton>
        ))}
      </Navbar.Section>
      <Navbar.Section>
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
      </Navbar.Section>
    </Navbar>
  )
}
