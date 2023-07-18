import {
  Box,
  Breadcrumbs,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core'
import { useRouter } from 'next/router'

export const ModuleHeader = ({ courseId }: { courseId: string }) => {
  const theme = useMantineTheme()
  const router = useRouter()

  const items = [
    { title: 'Courses', href: '/courses' },
    { title: 'Course Module', href: `/courses/module/${courseId}` },
  ].map((item, index) => (
    <UnstyledButton key={index} onClick={() => router.push(item.href)}>
      <span className="text-gray-600 font-medium text-sm">{item.title}</span>
    </UnstyledButton>
  ))

  return (
    <Box
      className="h-10 bg-white w-full flex items-center px-4"
      sx={{
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      }}
    >
      <Breadcrumbs separator="→">{items}</Breadcrumbs>
    </Box>
  )
}
