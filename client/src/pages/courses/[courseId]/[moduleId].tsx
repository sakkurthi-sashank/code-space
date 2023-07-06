import { ChangeQuestion } from '@/components/CodeEditorExam/ChangeQuestion'
import { EditorPanel } from '@/components/CodeEditorExam/EditorPanel'
import { QuestionPanel } from '@/components/CodeEditorExam/QuestionPanel'
import { TestCase } from '@/components/CodeEditorExam/TestCases'
import { Divider, Flex, Stack, useMantineTheme } from '@mantine/core'
import { useFullscreen } from '@mantine/hooks'

export default function TestPage() {
  const theme = useMantineTheme()

  const { toggle } = useFullscreen()

  return (
    <Flex w={'100%'} h={'100vh'} p={'sm'}>
      <Stack w={'50%'} spacing={'xs'}>
        <ChangeQuestion />
        <QuestionPanel />
      </Stack>
      <Divider color={theme.colors.gray[1]} mx={10} orientation="vertical" />
      <Stack w={'50%'} spacing={'xs'}>
        <EditorPanel />
        <TestCase />
      </Stack>
    </Flex>
  )
}
