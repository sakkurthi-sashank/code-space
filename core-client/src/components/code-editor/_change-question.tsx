import { Button } from '@mantine/core'

export const ChangeQuestion = () => {
  return (
    <div className="grid h-fit w-36 grid-cols-2 gap-4 p-4">
      <Button radius={'sm'} fw={500} size="md" compact>
        1
      </Button>
      <Button radius={'sm'} fw={500} size="md" compact>
        2
      </Button>
      <Button radius={'sm'} fw={500} size="md" compact>
        3
      </Button>
      <Button radius={'sm'} fw={500} size="md" compact>
        4
      </Button>
      <Button radius={'sm'} fw={500} size="md" compact>
        5
      </Button>
    </div>
  )
}
