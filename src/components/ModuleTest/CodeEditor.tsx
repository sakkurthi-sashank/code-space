import { useTestStore } from '@/store/TestStore'
import { Box } from '@mantine/core'
import MonacoEditor from '@monaco-editor/react'

export const CodeEditor = () => {
  const { codingQuestionOnUserSelectedId } = useTestStore((state) => ({
    codingQuestionOnUserSelectedId: state.codingQuestionOnUserSelectedId,
  }))

  return (
    <Box
      sx={{
        borderRadius: '5px',
        overflow: 'hidden',
      }}
    >
      <MonacoEditor
        height="55vh"
        value={codingQuestionOnUserSelectedId?.default_code ?? ''}
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
