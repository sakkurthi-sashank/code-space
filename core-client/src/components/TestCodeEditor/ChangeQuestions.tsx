import { Button, Header } from '@mantine/core'

export const ChangeQuestions = () => {
  return (
    <Header
      height={50}
      className="flex items-center justify-center rounded-md px-4"
    >
      <div className="w-full space-x-4">
        <Button
          fz={'sm'}
          radius={'sm'}
          fw={500}
          variant="light"
          size="md"
          compact
        >
          1
        </Button>
        <Button
          fz={'sm'}
          radius={'sm'}
          fw={500}
          variant="light"
          size="md"
          compact
        >
          2
        </Button>
        <Button
          fz={'sm'}
          radius={'sm'}
          fw={500}
          variant="light"
          size="md"
          compact
        >
          3
        </Button>
        <Button
          fz={'sm'}
          radius={'sm'}
          fw={500}
          variant="light"
          size="md"
          compact
        >
          4
        </Button>
        <Button
          fz={'sm'}
          radius={'sm'}
          fw={500}
          variant="light"
          size="md"
          compact
        >
          5
        </Button>
      </div>
    </Header>
  )
}
