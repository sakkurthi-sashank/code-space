import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import CodeMirror from '@uiw/react-codemirror'

export const Editor = () => {
  return (
    <CodeMirror
      value="console.log('Hello, World!')"
      theme={vscodeDark}
      height="calc(100vh - 60px - 50vh)"
    />
  )
}