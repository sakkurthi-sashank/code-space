import { ChangeQuestion } from '@/components/CodeEditorExam/ChangeQuestion'
import { CompileAndSubmit } from '@/components/CodeEditorExam/CompileAndSubmit'
import { EditorOptions } from '@/components/CodeEditorExam/EditorOptions'
import { EditorPanel } from '@/components/CodeEditorExam/EditorPanel'
import { QuestionPanel } from '@/components/CodeEditorExam/QuestionPanel'
import { TestCase } from '@/components/CodeEditorExam/TestCases'

import { Divider, Flex, Stack, useMantineTheme } from '@mantine/core'

export default function TestPage() {
  const theme = useMantineTheme()

  return (
    <Flex w={'100%'} h={'100vh'} p={'sm'}>
      <Stack w={'50%'} spacing={'xs'}>
        <EditorOptions />
        <ChangeQuestion />
        <QuestionPanel />
      </Stack>
      <Divider color={theme.colors.gray[1]} mx={10} orientation="vertical" />
      <Stack w={'50%'} spacing={'xs'}>
        <EditorPanel />
        <TestCase />
        <CompileAndSubmit />
      </Stack>
    </Flex>
  )
}
