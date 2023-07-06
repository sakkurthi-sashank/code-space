import MonacoEditor from '@monaco-editor/react'
import { CompileAndSubmit } from './CompileAndSubmit'

export const EditorPanel = () => {
  return (
    <div className="relative h-screen w-full">
      <MonacoEditor
        height="100vh"
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
        // language={language}
        theme="vs-dark"
        // value={code}
        // onChange={(value) => setCode(value!)}
      />
      <CompileAndSubmit />
    </div>
  )
}
