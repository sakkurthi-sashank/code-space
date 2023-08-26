import { CodingQuestion } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import {
  ActionIcon,
  Button,
  Drawer,
  NumberInput,
  Textarea,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import MonacoEditor from '@monaco-editor/react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconEdit } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

export function EditCourse(props: CodingQuestion) {
  const [opened, { open, close }] = useDisclosure(false)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()
  const supabaseClient = useSupabaseClient<Database>()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    setError,
    formState: { errors },
  } = useForm<CodingQuestion>({
    defaultValues: {
      ...props,
    },
  })

  useEffect(() => {
    reset({
      ...props,
    })
  }, [props, reset])

  const handleEditCourse = async (values: CodingQuestion) => {
    setLoading(true)

    const { data, error } = await supabaseClient
      .from('coding_question')
      .update(values)
      .eq('id', props.id!)
      .select('id')

    if (error) {
      setLoading(false)
      setError('root', { message: error.message })
      return
    }

    if (data) {
      setLoading(false)
      queryClient.invalidateQueries('admin-coding-questions')
      close()
    }
  }

  return (
    <>
      <ActionIcon onClick={open} color="gray">
        <IconEdit size={18} stroke={1.5} />
      </ActionIcon>
      <Drawer
        opened={opened}
        size={'100%'}
        position="right"
        onClose={close}
        title={'Edit Course'}
      >
        <form onSubmit={handleSubmit(handleEditCourse)} className="space-y-3">
          <Textarea
            description="Problem Statement"
            placeholder="Problem Statement"
            defaultValue={props.problem_name}
            radius={'md'}
            autosize
            minRows={2}
            {...register('problem_name', {
              required: true,
            })}
          />

          <Textarea
            description="Problem Statement"
            placeholder="Problem Statement"
            defaultValue={props.problem_statement}
            radius={'md'}
            autosize
            minRows={4}
            {...register('problem_statement', {
              required: true,
            })}
          />

          <NumberInput
            description="Marks"
            placeholder="Marks"
            defaultValue={props.marks}
            radius={'md'}
            error={errors.marks?.message}
            onChange={(value) => setValue('marks', Number(value))}
          />

          <Textarea
            description="Input Format"
            placeholder="Input Format"
            defaultValue={props.input_format}
            radius={'md'}
            autosize
            minRows={2}
            {...register('input_format', {
              required: true,
            })}
          />

          <Textarea
            description="Output Format"
            placeholder="Output Format"
            defaultValue={props.output_format}
            radius={'md'}
            autosize
            minRows={2}
            {...register('output_format', {
              required: true,
            })}
          />

          <div className="rounded-md overflow-hidden">
            <MonacoEditor
              height="200px"
              defaultValue={props.default_code!}
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
            <Button onClick={close} fw={500} variant="light" size="xs">
              Cancel
            </Button>
            <Button
              type="submit"
              className="ml-2"
              fw={500}
              loading={loading}
              size="xs"
            >
              Edit Course
            </Button>
          </div>
        </form>
      </Drawer>
    </>
  )
}
