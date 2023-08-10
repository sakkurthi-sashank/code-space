import { Dashboard } from '@/components/common/Dashboard'
import { TestButton } from '@/components/student/Module/TestButton'
import { useModulesQuery } from '@/service/queries/student/useModulesQuery'
import { dateFormatter } from '@/utils/dateFormatter'
import { Button, Title, useMantineTheme } from '@mantine/core'
import { useRouter } from 'next/router'

export default function ModulePage() {
  const router = useRouter()
  const { courseId } = router.query
  const { data } = useModulesQuery({ courseId: courseId as string })
  const theme = useMantineTheme()

  return (
    <Dashboard>
      <div className="h-12 border-b border-gray-200 flex items-center justify-between bg-white"></div>
      <div className="divide-y">
        {data?.map((module) => (
          <div
            className="flex bg-white p-3 justify-between items-center flex-wrap gap-3"
            key={module.id}
          >
            <div className="space-y-1.5">
              <Title order={4} fw={600} style={{ color: theme.colors.gray[7] }}>
                {module.module_name}
              </Title>
              <div className="text-xs gap-2 grid grid-cols-2 text-gray-600">
                <span>
                  Start Date:
                  {dateFormatter(module.start_date!)}
                </span>
                <span>End Date: {dateFormatter(module.end_date!)}</span>
                <span>Duration: {module.duration} minutes</span>
                <span>No of Questions: {module.coding_question.length}</span>
              </div>
            </div>
            <div className="space-x-3">
              <TestButton {...module} />
              <Button
                onClick={() =>
                  router.push(`/courses/module-test/results/${module.id}`)
                }
                variant="outline"
                color="indigo"
                size="xs"
                uppercase
                disabled={
                  module.profile_completed_module[0]?.is_submitted === true
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
    </Dashboard>
  )
}
