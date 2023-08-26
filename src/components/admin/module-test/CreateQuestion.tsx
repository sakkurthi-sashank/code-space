import { CodingQuestion } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { Button, Drawer, NumberInput, Textarea } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import MonacoEditor from '@monaco-editor/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconPlus } from '@tabler/icons-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function CreateQuestion({ moduleId }: { moduleId: string }) {
  const [opened, { open, close }] = useDisclosure(false)
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const supabaseClient = useSupabaseClient<Database>()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<CodingQuestion>({
    defaultValues: {
      problem_name: '',
      problem_statement: '',
      input_format: '',
      output_format: '',
      default_code: '',
      marks: 10,
    },
  })

  const createCourse = async (values: CodingQuestion) => {
    setLoading(true)

    const { data, error } = await supabaseClient
      .from('coding_question')
      .insert({
        problem_name: values.problem_name!,
        problem_statement: values.problem_statement!,
        input_format: values.input_format!,
        output_format: values.output_format!,
        default_code: values.default_code!,
        module_id: moduleId,
        marks: values.marks!,
      })
      .select('*')

    if (error) {
      setLoading(false)
      setError('root', { message: error.message })
    }

    if (data) {
      setLoading(false)
      reset()
      queryClient.invalidateQueries('admin-coding-questions')
      close()
    }
  }

  return (
    <>
      <Button
        onClick={open}
        variant="light"
        color="indigo"
        fw={500}
        size="xs"
        leftIcon={<IconPlus size={16} stroke={1.75} />}
      >
        Create Question
      </Button>
      <Drawer
        opened={opened}
        size={'100%'}
        position="right"
        onClose={close}
        title="Create Course"
      >
        <form onSubmit={handleSubmit(createCourse)} className="space-y-4">
          <Textarea
            description="Problem Statement"
            placeholder="Problem Statement"
            radius={'md'}
            autosize
            minRows={2}
            {...register('problem_name', {
              required: 'Course Name is required',
            })}
          />

          <Textarea
            description="Problem Statement"
            placeholder="Problem Statement"
            radius={'md'}
            autosize
            minRows={4}
            {...register('problem_statement', {
              required: 'Course Name is required',
            })}
          />

          <NumberInput
            description="Marks"
            placeholder="Marks"
            radius={'md'}
            error={errors.marks?.message}
            defaultValue={10}
            onChange={(value) => setValue('marks', Number(value))}
          />

          <Textarea
            description="Input Format"
            placeholder="Input Format"
            radius={'md'}
            autosize
            minRows={2}
            {...register('input_format', {
              required: 'Course Name is required',
            })}
          />

          <Textarea
            description="Output Format"
            placeholder="Output Format"
            radius={'md'}
            autosize
            minRows={2}
            {...register('output_format', {
              required: 'Course Name is required',
            })}
          />

          <div className="rounded-md overflow-hidden">
            <MonacoEditor
              height="200px"
              defaultValue="// default code"
              language="cpp"
              onChange={(value) => setValue('default_code', value)}
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
          </div>

          {errors.root && (
            <div className="text-red-500 text-sm mt-2">
              {errors.root.message}
            </div>
          )}

          <div className="flex justify-end pt-4">
            <Button onClick={close} fw={500} size="xs" variant="light">
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-2"
              size="xs"
              loading={loading}
              fw={500}
            >
              Create Question
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  )
}
