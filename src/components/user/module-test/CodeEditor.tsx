import { Box } from '@mantine/core'
import MonacoEditor from '@monaco-editor/react'

export function CodeEditor({
  defaultCode,
  setCode,
}: {
  defaultCode: string
  setCode: (code: string) => void
}) {
  return (
    <Box className="w-full">
      <MonacoEditor
        height="calc(100vh - 50px)"
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
