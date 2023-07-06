import { CourseInfoCards } from '@/components/Course/course-info-cards'
import { EnrollNewCourse } from '@/components/Course/enroll-new-course'
import { MainLayout } from '@/layout/main-layout'

export default function CoursesPage() {
  return (
    <MainLayout>
      <CourseInfoCards />
      <EnrollNewCourse />
    </MainLayout>
  )
}
