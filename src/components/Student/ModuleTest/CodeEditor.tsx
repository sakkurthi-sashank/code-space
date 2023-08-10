import { Box } from '@mantine/core'
import MonacoEditor from '@monaco-editor/react'

export function CodeEditor() {
  return (
    <Box className="w-full">
      <MonacoEditor
        height="55vh"
        language="cpp"
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
