import { Button } from '@mantine/core'

export function CompileAndSubmit() {
  return (
    <div className="flex justify-end w-full h-[50px] p-2 space-x-4 border">
      <Button size="xs" radius={'sm'} fw={500} variant="outline">
        Run
      </Button>
      <Button size="xs" radius={'sm'} fw={500}>
        Submit
      </Button>
    </div>
  )
}
