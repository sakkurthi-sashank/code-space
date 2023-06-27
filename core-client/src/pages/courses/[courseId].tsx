import { CourseContentAPI } from '@/apis/course-content-api'
import { ContentFilter } from '@/components//CourseContent/ContentFilter'
import { CourseInfoContentCard } from '@/components/CourseContent/CourseInfoContentCard'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { Stack } from '@mantine/core'
import { useRouter } from 'next/router'

export default function CourseContentPage() {
  const router = useRouter()
  const courseId = router.query.courseId
  const { data } = CourseContentAPI(courseId as string)

  return (
    <DashboardLayout>
      <Stack spacing={0}>
        <ContentFilter />
        <div className="space-y-2 p-2">
          {data?.map((courseContent) => (
            <CourseInfoContentCard key={courseContent.id} {...courseContent} />
          ))}
        </div>
      </Stack>
    </DashboardLayout>
  )
}
