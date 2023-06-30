import { Paper } from '@mantine/core'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import CodeMirror from '@uiw/react-codemirror'

export const EditorPanel = () => {
  return (
    <div className="h-full w-full space-y-2">
      <Paper h={50} radius={'md'}></Paper>
      <div className="w-full overflow-hidden rounded-md">
        <CodeMirror theme={vscodeDark} height="50vh" />
      </div>
    </div>
  )
}
