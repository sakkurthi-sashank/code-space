import { ChangeQuestion } from '@/components/code-editor/_change-question'
import { Editor } from '@/components/code-editor/_editor'
import { CodeEditorHeader } from '@/components/code-editor/_header'
import { Question } from '@/components/code-editor/_question'
import { Result } from '@/components/code-editor/result'
import { Divider, useMantineTheme } from '@mantine/core'

export default function CourseTestPage() {
  const theme = useMantineTheme()

  return (
    <div>
      <CodeEditorHeader />
      <div className="flex h-[calc(100vh-60px)]">
        <div className="flex w-full">
          <ChangeQuestion />
          <Divider orientation="vertical" color={theme.colors.gray[2]} />
          <Question />
        </div>
        <Divider orientation="vertical" color={theme.colors.gray[2]} />
        <div className="w-full">
          <Editor />
          <Result />
        </div>
      </div>
    </div>
  )
}
