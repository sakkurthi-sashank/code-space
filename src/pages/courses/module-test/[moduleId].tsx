import { ChangeQuestions } from '@/components/Student/ModuleTest/ChangeQuestion'
import { CodeEditor } from '@/components/Student/ModuleTest/CodeEditor'
import { CodeEditorHeader } from '@/components/Student/ModuleTest/Header'
import { QuestionPanel } from '@/components/Student/ModuleTest/QuestionPanel'
import { CompileAndSubmit } from '@/components/Student/ModuleTest/RunAndSubmit'
import { TestCases } from '@/components/Student/ModuleTest/TestCaseResults'
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
import { useState } from 'react'

export default function ModuleTestPage() {
  const theme = useMantineTheme()
  const { fullscreen, toggle } = useFullscreen()
  const router = useRouter()

  const [currentUserSelectedQuestionId, setCurrentUserSelectedQuestionId] =
    useState<string | null>(null)

  const { moduleId } = router.query

  return (
    <Flex w={'100%'} h={'100vh'} p={'sm'}>
      <Stack w={'50%'} spacing={6}>
        <ChangeQuestions
          moduleId={moduleId as string}
          setCurrentUserSelectedQuestionId={setCurrentUserSelectedQuestionId}
        />
        <QuestionPanel
          currentUserSelectedQuestionId={currentUserSelectedQuestionId}
        />
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
