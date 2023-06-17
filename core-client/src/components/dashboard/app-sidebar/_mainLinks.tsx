import { Group, Text, ThemeIcon, UnstyledButton } from '@mantine/core'
import {
  IconBook,
  IconBuildingSkyscraper,
  IconSettings,
  IconTrophy,
  IconUser,
} from '@tabler/icons-react'
import { useRouter } from 'next/router'

interface MainLinkProps {
  icon: React.ReactNode
  label: string
  href: string
}

function MainLink({ icon, label, href }: MainLinkProps) {
  const router = useRouter()
  const active = isActive(router, href)

  function isActive(router: any, href: string) {
    const currentPath = router.pathname.split('/')[1]
    const linkPath = href.split('/')[1]
    return currentPath === linkPath
  }

  return (
    <UnstyledButton
      my={6}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.black,
        backgroundColor: active ? theme.colors.gray[0] : 'transparent',

        '&:hover': {
          backgroundColor: theme.colors.gray[0],
        },
      })}
      onClick={() => router.push(href)}
    >
      <Group>
        <ThemeIcon variant="light">{icon}</ThemeIcon>
        <Text size="sm">{label}</Text>
      </Group>
    </UnstyledButton>
  )
}

const linksData = [
  { icon: <IconBook size="1rem" />, label: 'Courses', href: '/courses' },
  {
    icon: <IconTrophy size="1rem" />,
    label: 'Competitions',
    href: '/competitions',
  },
  {
    icon: <IconBuildingSkyscraper size="1rem" />,
    label: 'Job Profile',
    href: '/job-profiles',
  },
  {
    icon: <IconUser size="1rem" />,
    label: 'My Profile',
    href: '/profile',
  },
  {
    icon: <IconSettings size="1rem" />,
    label: 'Settings',
    href: '/settings',
  },
]

export function MainLinks() {
  const links = linksData.map((link) => <MainLink {...link} key={link.label} />)

  return <div>{links}</div>
}
