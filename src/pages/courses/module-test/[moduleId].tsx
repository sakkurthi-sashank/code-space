import { ChangeQuestions } from '@/components/ModuleTest/ChangeQuestions'
import { CodeEditor } from '@/components/ModuleTest/CodeEditor'
import { CodeEditorHeader } from '@/components/ModuleTest/CodeEditorHeader'
import { CompileAndSubmit } from '@/components/ModuleTest/CompileAndSubmit'
import { QuestionPanel } from '@/components/ModuleTest/QuestionPanel'
import { TestCases } from '@/components/ModuleTest/TestCases'
import { useTestStore } from '@/store/TestStore'
import {
  Button,
  Divider,
  Flex,
  Modal,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core'
import { useFullscreen } from '@mantine/hooks'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function ModuleTestPage() {
  const theme = useMantineTheme()
  const { fullscreen, toggle } = useFullscreen()
  const router = useRouter()

  const { fetchCodingQuestionIds, codingQuestionIds } = useTestStore(
    (state) => ({
      fetchCodingQuestionIds: state.fetchCodingQuestionIds,
      codingQuestionIds: state.codingQuestionIds,
    }),
  )

  const { moduleId } = router.query

  useEffect(() => {
    if (moduleId) {
      fetchCodingQuestionIds(moduleId as string)
    }
  }, [moduleId])

  return (
    <Flex w={'100%'} h={'100vh'} p={'sm'}>
      <Stack w={'50%'} spacing={6}>
        <ChangeQuestions />
        <QuestionPanel />
        <CompileAndSubmit />
      </Stack>
      <Divider color={theme.colors.gray[1]} mx={10} orientation="vertical" />
      <Stack w={'50%'} spacing={'xs'}>
        <CodeEditorHeader />
        <CodeEditor />
        <TestCases />
      </Stack>
      <Modal opened={false} onClose={toggle} withCloseButton={false}>
        <Paper
          shadow="md"
          radius="md"
          withBorder
          className="max-w-md sm:px-10 p-5 py-10 w-full flex-col flex justify-center"
        >
          <Text align="center">
            You Need to enable fullscreen to continue the test. Click the button
            below to enable
          </Text>
          <div className="flex items-center justify-center mt-10 w-full">
            <Button onClick={toggle} fw={500}>
              Enable Fullscreen
            </Button>
          </div>
        </Paper>
      </Modal>
    </Flex>
  )
}
