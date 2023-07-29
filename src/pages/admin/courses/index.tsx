import { AllCourses } from '@/components/Admin/Course/AllCourses'
import { AddCourse } from '@/components/Admin/Course/CreateCourse'
import { Dashboard } from '@/components/common/Dashboard'

const Example = () => {
  return (
    <Dashboard>
      <div className="flex justify-end p-2">
        <AddCourse />
      </div>
      <AllCourses />
    </Dashboard>
  )
}

export default Example
