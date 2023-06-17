import { EditorWindow } from '@/components/code-editor/editor-window'
import { ActionIcon, Box, Drawer, Header } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconChevronRight } from '@tabler/icons-react'
import { useRouter } from 'next/router'

export default function CourseTestPage() {
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Box
        sx={{
          position: 'relative',
        }}
      >
        <Header height={60}>{}</Header>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
          }}
        >
          <Box
            sx={{
              width: '50%',
            }}
          ></Box>
          <Box
            sx={{
              width: '50%',
            }}
          >
            <EditorWindow />
          </Box>
        </Box>
        <div className="absolute bottom-0 left-2">
          <ActionIcon
            color="violet"
            size="lg"
            radius="lg"
            variant="light"
            onClick={open}
          >
            <IconChevronRight size="1.625rem" />
          </ActionIcon>
        </div>
      </Box>
      <Drawer
        size={'xs'}
        opened={opened}
        onClose={close}
        withCloseButton={false}
        overlayProps={{ opacity: 0.5, blur: 4 }}
      ></Drawer>
    </>
  )
}
