import { InfoCard } from '@/components/CourseModule/InfoCard'
import { InfoCardFullDetails } from '@/components/CourseModule/InfoCardFullDetails'
import { ModuleHeader } from '@/components/CourseModule/ModuleHeader'
import { Divider, useMantineTheme } from '@mantine/core'
import { useState } from 'react'

export const ModuleLayout = ({ courseId }: { courseId: string }) => {
  const theme = useMantineTheme()
  const [moduleId, setModuleId] = useState('')

  const data = [
    {
      id: '51ae8fb6-2090-11ee-be56-0242ac120002',
      module_name: 'Introduction to Programming',
      start_date: '2023-01-01 12:00PM',
      end_date: '2023-01-01 12:00PM',
    },
  ]

  return (
    <>
      <ModuleHeader courseId={courseId} />
      <div className="h-full w-full flex bg-white">
        <div className="w-1/2">
          {data.map((item) => (
            <InfoCard key={item.id} {...item} setModuleId={setModuleId} />
          ))}
        </div>
        <Divider orientation="vertical" color={theme.colors.gray[2]} />
        <div className="w-1/2">
          <InfoCardFullDetails />
        </div>
      </div>
    </>
  )
}
