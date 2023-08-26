import { AddCourse } from './CreateNewCourse'

export function CourseHeader() {
  return (
    <div className="flex justify-end items-center p-2.5 border-b rounded bg-white">
      <AddCourse />
    </div>
  )
}
