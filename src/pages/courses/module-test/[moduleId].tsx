import { CodeEditor } from '@/components/Student/ModuleTest/CodeEditor'
import { ModuleTestHeader } from '@/components/Student/ModuleTest/Header'
import { QuestionPanel } from '@/components/Student/ModuleTest/QuestionPanel'

export default function ModuleTestPage() {
  return (
    <div className="bg-gray-100 min-h-screen space-3">
      <div className="container min-h-screen bg-white mx-auto space-y-8">
        <ModuleTestHeader />
        <div className="px-14 space-y-6">
          <QuestionPanel
            currentUserSelectedQuestionId={
              '2d96d7fc-68e7-4b8f-80ee-6e07ab993259'
            }
          />
          <CodeEditor />
        </div>
      </div>
    </div>
  )
}
