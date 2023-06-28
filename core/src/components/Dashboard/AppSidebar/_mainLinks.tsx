import { Group, Text, UnstyledButton, clsx } from '@mantine/core'
import { IconBook } from '@tabler/icons-react'
import { useRouter } from 'next/router'

const linksData = [
  { icon: <IconBook size="1rem" />, label: 'Courses', href: '/courses' },
]

export const MainLinks = () => {
  const router = useRouter()

  const isActive = (href: string) => {
    const currentPath = router.pathname.split('/')[1]
    const linkPath = href.split('/')[1]
    return currentPath === linkPath
  }

  return (
    <div className="space-y-2">
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
    </div>
  )
}
