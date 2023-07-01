import { AddNewCourseModel } from '@/components/course/add-new-course-model'
import { CourseDisplayCards } from '@/components/course/course-display-cards'
import { MainLayout } from '@/layout/main-layout'

export default function CoursesPage() {
  return (
    <MainLayout>
      <CourseDisplayCards />
      <AddNewCourseModel />
    </MainLayout>
  )
}
