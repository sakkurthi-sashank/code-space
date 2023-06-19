import {
  Badge,
  Button,
  Divider,
  Flex,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { InstructionModel } from './instruction-model'

export const CourseContentCard = () => {
  const theme = useMantineTheme()
  const [opened, { close, open }] = useDisclosure(false)
  return (
    <>
      <Paper p="md" radius={'md'} mih={130} withBorder>
        <div className="flex flex-wrap items-center justify-between">
          <div className="text-xl font-medium text-gray-800">
            Introduction to Data Structures
          </div>
          <Badge color="cyan" size="sm" my={4}>
            10 days Ago
          </Badge>
        </div>
        <Flex justify="start" mt={4} gap={10}>
          <Text size={12} align="center">
            Starts At: 20 Jun 24
          </Text>
          <Divider color={theme.colors.gray[2]} orientation="vertical" />
          <Text size={12} align="center">
            Ends At: 20 Aug 24
          </Text>
        </Flex>
        <div className="space-x-4">
          <Button size="xs" mt={16} onClick={open}>
            Continue
          </Button>
          <Button size="xs" disabled mt={16} variant="outline">
            View Result
          </Button>
        </div>
      </Paper>
      <InstructionModel opened={opened} close={close} />
    </>
  )
}
