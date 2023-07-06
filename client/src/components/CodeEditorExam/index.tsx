import { ScrollArea } from '@mantine/core'
import { EditorPanel } from './EditorPanel'
import { QuestionPanel } from './QuestionPanel'

export const CodeEditor = () => {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <EditorPanel />
      <div className="h-full w-full">
        <ScrollArea h={'100vh'} w={'full'}>
          <QuestionPanel />
        </ScrollArea>
      </div>
    </div>
  )
}
