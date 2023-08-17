import { Badge, Header } from '@mantine/core'
import { useInterval } from '@mantine/hooks'
import { useEffect, useState } from 'react'
import { SubmitTest } from './SubmitTest'

export function ModuleTestHeader({ moduleId }: { moduleId: string }) {
  const [seconds, setSeconds] = useState(7200) // Set initial value to 7200 seconds (120 minutes)
  const interval = useInterval(() => {
    if (seconds > 0) {
      setSeconds((s) => s - 1)
    } else {
      interval.stop()
    }
  }, 1000)

  useEffect(() => {
    interval.start()
    return interval.stop
  }, [interval])

  // Calculate minutes and remaining seconds
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60

  return (
    <Header height={50} className="flex items-center justify-between px-4">
      <Badge color="red" size="md" fw={600} variant="light">
        Time: {minutes}:{remainingSeconds < 10 ? '0' : ''}
        {remainingSeconds}
      </Badge>
      <SubmitTest moduleId={moduleId} />
    </Header>
  )
}
