import { ChangeQuestion } from './_change-question'
import { Editor } from './_editor'
import { CodeEditorHeader } from './_header'
import { Question } from './_question'
import { Submission } from './_submission'

export const CodeEditor = () => {
  return (
    <div>
      <CodeEditorHeader />
      <div className="mx-auto flex max-w-5xl flex-col">
        <div className="flex w-full flex-col">
          <ChangeQuestion />
          <Question />
        </div>
        <div className="w-full p-6">
          <Editor />
          <Submission />
        </div>
      </div>
    </div>
  )
}
