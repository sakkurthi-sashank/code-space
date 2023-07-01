import { ActionIcon, Modal } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlus } from '@tabler/icons-react'

export const AddNewCourseModel = () => {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <div className="fixed bottom-16 right-16">
        <ActionIcon
          variant="filled"
          size="xl"
          color="indigo"
          radius={'xl'}
          onClick={open}
        >
          <IconPlus size={'1.6rem'} stroke={1.5} />
        </ActionIcon>
      </div>
      <Modal opened={opened} onClose={close} title="Authentication">
        {/* Modal content */}
      </Modal>
    </div>
  )
}
