import { CourseModuleAPI } from '@/apis/course-module-api'
import { ModuleCard } from '@/components/CourseModule/ModuleCard'
import { ModuleFilter } from '@/components/CourseModule/ModuleFilter'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { Stack } from '@mantine/core'
import { useRouter } from 'next/router'

export default function CourseContentPage() {
  const router = useRouter()
  const courseId = router.query.courseId
  const { data } = CourseModuleAPI(courseId as string)

  return (
    <DashboardLayout>
      <Stack spacing={0}>
        <ModuleFilter />
        <div className="space-y-2 p-2">
          {data?.map((courseContent) => (
            <ModuleCard key={courseContent.id} {...courseContent} />
          ))}
        </div>
      </Stack>
    </DashboardLayout>
  )
}
