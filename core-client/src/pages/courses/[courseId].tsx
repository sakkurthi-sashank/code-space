import { CourseContentAPI } from '@/apis/course-content-api'
import { CourseContentCard } from '@/components/courses/CourseContentCard'
import { CourseContentFilter } from '@/components/courses/CourseContentFilter'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { Stack } from '@mantine/core'
import { useRouter } from 'next/router'

export default function CourseContentPage() {
  const router = useRouter()
  const { courseId } = router.query

  const { data } = courseId
    ? CourseContentAPI(courseId as string)
    : { data: [] }

  return (
    <DashboardLayout>
      <Stack spacing={0}>
        <CourseContentFilter />
        <div className="space-y-2 p-2">
          {data?.map((courseContent) => (
            <CourseContentCard key={courseContent.id} {...courseContent} />
          ))}
        </div>
      </Stack>
    </DashboardLayout>
  )
}
