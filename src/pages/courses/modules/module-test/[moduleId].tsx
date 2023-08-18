import { ChangeQuestions } from '@/components/user/module-test/ChangeQuestion'
import { CodeEditor } from '@/components/user/module-test/CodeEditor'
import { CompileAndSubmit } from '@/components/user/module-test/CompileAndSubmit'
import { ModuleTestHeader } from '@/components/user/module-test/Header'
import { QuestionPanel } from '@/components/user/module-test/QuestionPanel'
import { CodingQuestion, TestCase } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { ScrollArea } from '@mantine/core'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

type Question = CodingQuestion & { test_case: TestCase[] }

export default function ModuleTestPage() {
  const router = useRouter()
  const { moduleId } = router.query
  const supabaseClient = useSupabaseClient<Database>()

  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>()
  const [questionIds, setQuestionIds] = useState<
    (string | undefined)[] | undefined
  >()
  const [allQuestions, setAllQuestions] = useState<Question[] | undefined>()
  const [code, setCode] = useState<string>('')

  const { data, error, isLoading } = useQuery<Question[], Error>(
    'questions',
    async () => {
      const { data, error } = await supabaseClient
        .from('coding_question')
        .select(`*,test_case(*)`)
        .order('created_at', { ascending: false })
      return error ? [] : data || []
    },
    {
      enabled: !!moduleId,
    },
  )

  useEffect(() => {
    if (data) {
      const questionIds = data.map((question) => question.id)
      setQuestionIds(questionIds)
      setCurrentQuestion(data[0])
      setAllQuestions(data)
    }
    if (error) {
      console.log(error)
    }
  }, [data, error])

  return (
    <div className="bg-gray-100">
      <div className="bg-white mx-auto h-full">
        <ModuleTestHeader moduleId={moduleId as string} />
        <div className="h-full flex">
          <div className="w-5/12">
            <ScrollArea
              type="never"
              className="px-4 py-4 w-full h-[calc(100vh-100px)] border-r"
            >
              <QuestionPanel currentQuestion={currentQuestion!} />
            </ScrollArea>
            <CompileAndSubmit />
          </div>

          <div className="w-6/12 flex flex-col">
            <CodeEditor
              defaultCode={currentQuestion?.default_code!}
              setCode={setCode}
            />
          </div>

          <div className="w-1/12 border-l flex flex-col h-[calc(100vh-50px)] border-gray-200">
            <ChangeQuestions
              questionIds={questionIds}
              allQuestions={allQuestions}
              setCurrentQuestion={setCurrentQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
