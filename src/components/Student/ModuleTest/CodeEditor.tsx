import { Box } from '@mantine/core'
import MonacoEditor from '@monaco-editor/react'

export const CodeEditor = () => {
  return (
    <Box
      sx={{
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
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
