import { ActionIcon, Box, Button, Modal, Text, TextInput } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'

export const AddNewCourseModel = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <div className="fixed bottom-12 right-12">
        <ActionIcon
          variant="filled"
          size="xl"
          color="dark"
          radius={'xl'}
          onClick={open}
        >
          <IconPlus size={'1.6rem'} stroke={1.5} />
        </ActionIcon>
      </div>
      <Modal opened={opened} onClose={close}>
        <Box p={'md'}>
          <Text
            size={'xl'}
            pb={'xl'}
            className="text-gray-700"
            weight={700}
            align="center"
          >
            Course Enrollment
          </Text>
          <TextInput
            placeholder="Enter Course ID"
            description="Enter the course ID as specified by the professor"
          />
          <div className="flex justify-end pt-6">
            <Button size="xs" fw={400}>
              Enroll Course
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}
