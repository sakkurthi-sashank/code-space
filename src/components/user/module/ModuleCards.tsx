import { Module, ProfileSubmittedModule } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { formatCustomDate } from '@/utils/formatCustomDate'
import { Button, Title, useMantineTheme } from '@mantine/core'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import router from 'next/router'
import { useQuery } from 'react-query'
import { TestButton } from './TestButton'

type ModuleData = Module & {
  coding_question: {
    id: string
  }[]
  profile_submitted_module: ProfileSubmittedModule[]
}

export function ModuleCards({ courseId }: { courseId: string }) {
  const user = useSession()
  const theme = useMantineTheme()
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<ModuleData[], Error>(
    ['user-modules', courseId],
    async () => {
      const { data, error } = await supabaseClient
        .from('module')
        .select(`*, coding_question(id), profile_submitted_module(*)`)
        .eq('course_id', courseId)
        .eq('profile_submitted_module.profile_id', user?.user.id)
        .order('created_at', { ascending: false })

      return error ? [] : data || []
    },
    {
      enabled: !!user?.user.id && !!courseId,
    },
  )

  return (
    <div>
      {data?.map((module) => (
        <div
          className="flex border-b bg-white p-3 justify-between items-center flex-wrap gap-3"
          key={module.id}
        >
          <div className="space-y-1.5">
            <Title order={4} fw={600} style={{ color: theme.colors.gray[7] }}>
              {module.module_name}
            </Title>
            <div className="text-xs gap-2 grid grid-cols-2 text-gray-600">
              <span>
                Start Date:
                {formatCustomDate(module.start_date!)}
              </span>
              <span>End Date: {formatCustomDate(module.end_date!)}</span>
              <span>Duration: {module.duration} minutes</span>
              <span>No of Questions: {module.coding_question.length}</span>
            </div>
          </div>
          <div className="space-x-3">
            <TestButton {...module} />
            <Button
              onClick={() =>
                router.push(`/courses/modules/module-test/results/${module.id}`)
              }
              variant="outline"
              color="indigo"
              size="xs"
              uppercase
              disabled={
                module.profile_submitted_module[0]?.is_submitted === true
                  ? false
                  : true
              }
            >
              Results
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}
