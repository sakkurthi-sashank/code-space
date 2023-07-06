import { AddNewCourseModel } from '@/components/course/AddNewCourse'
import { CourseCards } from '@/components/course/CourseCards'
import { MainLayout } from '@/layout/main-layout'

export default function CoursesPage() {
  return (
    <MainLayout>
      <CourseCards />
      <AddNewCourseModel />
    </MainLayout>
  )
}
