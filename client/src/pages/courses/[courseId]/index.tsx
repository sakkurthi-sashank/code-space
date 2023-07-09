import { ModuleDCardDetailView } from '@/components/CourseModule/ModuleCardDetailView'
import { ModuleFilter } from '@/components/CourseModule/ModuleFilter'
import { ModuleInfoCards } from '@/components/CourseModule/ModuleInfoCard'
import { MainLayout } from '@/layout/main-layout'
import { Divider, Stack, useMantineTheme } from '@mantine/core'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

interface Module {
  module_id: string
  module_name: string
  module_unit: string
  module_start_date: string
  module_end_date: string
  is_result_disabled: boolean
}

export default function CourseModulesPage() {
  const router = useRouter()
  const theme = useMantineTheme()

  const courseId = router.query.courseId as string
  const studentId = 'fc8cb36a-93fc-42a1-a43b-3384730295c7'

  const { data } = useQuery<Module[]>(['course-module-details'], async () => {
    const response = await axios.post(
      'http://localhost:8080/api/course-module/get-course-modules-by-course-id-and-student-id',
      {
        courseId: courseId,
        studentId: studentId,
      },
    )
    return response.data
  })

  return (
    <MainLayout>
      <Stack spacing={0} className="h-full w-full">
        <ModuleFilter />
        <div className="h-full w-full flex bg-white">
          <div className="w-1/2">
            {data?.map((module) => (
              <ModuleInfoCards {...module} key={module.module_id} />
            ))}
          </div>
          <Divider orientation="vertical" color={theme.colors.gray[2]} />
          <div className="w-1/2">
            <ModuleDCardDetailView
              moduleId={'ad981972-1bcd-11ee-be56-0242ac120002'}
            />
          </div>
        </div>
      </Stack>
    </MainLayout>
  )
}
