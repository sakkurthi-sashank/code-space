import { Box, Button } from '@mantine/core'
import { useFullscreen } from '@mantine/hooks'

export const CompileAndSubmit = () => {
  const { toggle } = useFullscreen()

  return (
    <Box
      h={60}
      className="absolute bottom-0 left-0 right-0 flex w-full items-center justify-end space-x-6 bg-white px-6"
    >
      <Button
        size="xs"
        radius={'sm'}
        fw={500}
        variant="outline"
        onClick={toggle}
      >
        Run
      </Button>
      <Button size="xs" radius={'sm'} fw={500}>
        Submit
      </Button>
    </Box>
  )
}
