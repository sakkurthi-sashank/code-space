import { javascript } from '@codemirror/lang-javascript'
import { tags as t } from '@lezer/highlight'
import { draculaInit } from '@uiw/codemirror-theme-dracula'
import CodeMirror from '@uiw/react-codemirror'
import { Source_Code_Pro } from 'next/font/google'

const roboto_mono = Source_Code_Pro({
  subsets: ['latin'],
  weight: ['500'],
})

export const EditorWindow = () => {
  return (
    <div className="w-full overflow-hidden rounded-md">
      <CodeMirror
        value="console.log('Hello, World!')"
        theme={draculaInit({
          settings: {
            caret: '#c6c6c6',
            fontFamily: roboto_mono.style.fontFamily,
          },
          styles: [{ tag: t.comment, color: '#6272a4' }],
        })}
        height="50vh"
        extensions={[javascript({ jsx: true })]}
      />
    </div>
  )
}
