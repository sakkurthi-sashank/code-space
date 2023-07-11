import { Box } from '@mantine/core'
import MonacoEditor from '@monaco-editor/react'

export const EditorPanel = () => {
  return (
    <Box
      sx={{
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <MonacoEditor
        height="60vh"
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
