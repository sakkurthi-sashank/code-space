import { Box } from '@mantine/core'
import MonacoEditor from '@monaco-editor/react'
import { LanguageSelection } from './LanguageSelection'

export function CodeEditor({
  defaultCode,
  setCode,
}: {
  defaultCode: string
  setCode: (code: string) => void
}) {
  return (
    <Box className="w-full">
      <div className="h-12">
        <LanguageSelection />
      </div>
      <MonacoEditor
        height="60vh"
        value={defaultCode}
        language="cpp"
        onChange={(code) => setCode(code!)}
        options={{
          fontSize: 14,
          scrollBeyondLastLine: false,
          minimap: {
            enabled: false,
          },
          padding: {
            top: 10,
          },
        }}
        theme="vs-dark"
      />
    </Box>
  )
}
