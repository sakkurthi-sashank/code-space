import { ChangeQuestions } from '@/components/student/ModuleTest/ChangeQuestion'
import { CodeEditor } from '@/components/student/ModuleTest/CodeEditor'
import { CompileAndSubmit } from '@/components/student/ModuleTest/CompileAndSubmit'
import { DisplayTestCase } from '@/components/student/ModuleTest/DisplayTestCase'
import { ModuleTestHeader } from '@/components/student/ModuleTest/Header'
import { QuestionPanel } from '@/components/student/ModuleTest/QuestionPanel'
import { ScrollArea } from '@mantine/core'
import { useRouter } from 'next/router'

export default function ModuleTestPage() {
  const router = useRouter()
  const { moduleId } = router.query

  return (
    <div className="bg-gray-100">
      <div className="bg-white mx-auto h-full">
        <ModuleTestHeader />
        <div className="h-full flex">
          <div className="w-5/12">
            <ScrollArea
              type="never"
              className="px-10 py-4 w-full h-[calc(100vh-100px)] border-r"
            >
              <QuestionPanel
                currentUserSelectedQuestionId={
                  '2d96d7fc-68e7-4b8f-80ee-6e07ab993259'
                }
              />
            </ScrollArea>
            <CompileAndSubmit />
          </div>
          <div className="w-6/12 flex flex-col">
            <CodeEditor />
            <DisplayTestCase />
          </div>
          <div className="w-1/12 border-l flex flex-col h-[calc(100vh-50px)] border-gray-200">
            <ChangeQuestions
              setCurrentUserSelectedQuestionId={() => {}}
              moduleId={moduleId as string}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
