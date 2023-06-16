import { Box, Header } from '@mantine/core'
import { vscodeDark } from '@uiw/codemirror-theme-vscode'
import CodeMirror from '@uiw/react-codemirror'

export default function CourseTestPage() {
  return (
    <Box>
      <Header height={60}>{}</Header>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
        }}
      >
        <Box
          sx={{
            width: '50%',
          }}
        ></Box>
        <Box
          sx={{
            width: '50%',
          }}
        >
          <CodeMirror height="350px" theme={vscodeDark} />
        </Box>
      </Box>
    </Box>
  )
}
