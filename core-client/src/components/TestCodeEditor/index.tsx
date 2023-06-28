import { Divider } from '@mantine/core'

import { ChangeQuestions } from './ChangeQuestions'
import { DisplayQuestion } from './DisplayQuestion'
import { EditorOptions } from './EditorOptions'
import { EditorWindow } from './EditorWindow'
import { SubmissionWindow } from './SubmissionWindow'

export const CodeEditor = () => {
  return (
    <div className="h-screen w-full space-y-2 bg-gray-100 p-2">
      <div className="flex h-full w-full space-x-2">
        <div className="h-full w-full space-y-2">
          <ChangeQuestions />
          <DisplayQuestion />
        </div>
        <Divider />
        <div className="h-full w-full space-y-2">
          <EditorOptions />
          <EditorWindow />
          <SubmissionWindow />
        </div>
      </div>
    </div>
  )
}
