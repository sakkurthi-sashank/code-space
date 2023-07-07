import { ActionIcon, Box, Button, Modal, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'

export const EnrollNewCourse = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Box className="fixed bottom-8 right-8">
        <ActionIcon
          variant="filled"
          size="xl"
          color="indigo"
          radius={'xl'}
          onClick={open}
        >
          <IconPlus size={'1.6rem'} />
        </ActionIcon>
      </Box>
      <Modal opened={opened} onClose={close} title="Course Enrollment">
        <TextInput
          placeholder="Enter Course ID"
          description="Enter the course ID as specified by the professor"
          radius={'md'}
          mt={6}
        />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '1rem',
          }}
        >
          <Button size="xs" fw={500}>
            Enroll Course
          </Button>
        </Box>
      </Modal>
    </>
  )
}
