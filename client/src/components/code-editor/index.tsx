import { EditorPanel } from './editor-panel'
import { QuestionPanel } from './question-panel'

export const CodeEditor = () => {
  return (
    <div className="flex h-screen w-full space-x-2 bg-gray-100 p-2">
      <QuestionPanel />
      <EditorPanel />
    </div>
  )
}
