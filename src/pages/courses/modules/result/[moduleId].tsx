import { Dashboard } from '@/components/common/dashboard'
import { useRouter } from 'next/router'

export default function ModuleResult() {
  const { moduleId } = useRouter().query

  return (
    <Dashboard>
      <div className="h-full w-full p-4">
        <div className="h-full w-full bg-white rounded-md shadow"></div>
      </div>
    </Dashboard>
  )
}
