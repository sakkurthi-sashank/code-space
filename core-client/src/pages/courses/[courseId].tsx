import { CourseContentAPI } from '@/api/course-content-api'
import { CourseContentCard } from '@/components/courses/CourseContentCard'
import { CourseContentFilter } from '@/components/courses/CourseContentFilter'
import { ICourseContent } from '@/interface/course-content'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { Stack } from '@mantine/core'
import { useRouter } from 'next/router'

export default function CourseContentPage() {
  const router = useRouter()
  const { courseId } = router.query

  const { data, error, isLoading } = CourseContentAPI(courseId as string)

  return (
    <DashboardLayout>
      <Stack spacing={0}>
        <CourseContentFilter />
        <div className="space-y-2 p-2">
          {isLoading && <div>Loading...</div>}
          {data?.map((courseContent: ICourseContent) => (
            <CourseContentCard key={courseContent.id} {...courseContent} />
          ))}
        </div>
      </Stack>
    </DashboardLayout>
  )
}
