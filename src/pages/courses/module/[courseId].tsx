import { Dashboard } from '@/components/common/Dashboard'
import { useAuth } from '@/hooks/useAuth'
import { useModuleQuery } from '@/service/Student/Queries/useModuleQuery'
import { Module } from '@/types/types'
import { Badge, Button } from '@mantine/core'
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from 'mantine-react-table'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

interface ModuleData extends Module {
  coding_question: {
    id: string
  }[]
}

export default function ModulePage() {
  const router = useRouter()
  const { user, loading } = useAuth()
  const { courseId } = router.query
  const { data } = useModuleQuery({ courseId: courseId as string })

  const columns = useMemo<MRT_ColumnDef<ModuleData>[]>(
    () => [
      {
        accessorKey: 'module_name',
        header: 'Module Name',
      },
      {
        accessorKey: 'start_date',
        header: 'Start Date',
        Cell: ({ row }) => {
          const { start_date } = row.original
          return <div>{new Date(start_date!).toLocaleString()}</div>
        },
      },
      {
        accessorKey: 'end_date',
        header: 'End Date',
        Cell: ({ row }) => {
          const { end_date } = row.original
          return <div>{new Date(end_date!).toLocaleString()}</div>
        },
      },
      {
        accessorKey: 'duration',
        header: 'Test Duration',
        Cell: ({ row }) => {
          const { duration } = row.original
          return <div>{duration} minutes</div>
        },
      },
      {
        header: 'No of Questions',
        Cell: ({ row }) => {
          return <div>{row.original.coding_question.length}</div>
        },
      },
      {
        header: 'Status',
        Cell: ({ row }) => {
          const { start_date, end_date } = row.original

          if (start_date && end_date) {
            const startDate = new Date(start_date)
            const endDate = new Date(end_date)
            const currentDate = new Date()

            if (currentDate < startDate) {
              return <Badge color="yellow">Upcoming</Badge>
            } else if (currentDate > endDate) {
              return <Badge color="red">Expired</Badge>
            } else {
              return <Badge color="green">Active</Badge>
            }
          }
          return null
        },
      },
      {
        header: 'Start Test',
        Cell: ({ row }) => {
          const { id } = row.original
          return (
            <Button
              onClick={() => {
                router.push(`/courses/module-test/validation/${id}`)
              }}
              variant="filled"
              color="indigo"
              size="xs"
            >
              Start Test
            </Button>
          )
        },
      },
      {
        header: 'View Results',
        Cell: ({ row }) => {
          const { id } = row.original
          return (
            <Button
              onClick={() => {
                router.push(`/courses/module-test/results/${id}`)
              }}
              variant="outline"
              color="indigo"
              size="xs"
            >
              View Results
            </Button>
          )
        },
      },
    ],
    [router],
  )

  const table = useMantineReactTable({
    columns,
    data,
    enableFullScreenToggle: false,
    columnFilterDisplayMode: 'popover',
  })

  if (!user && !loading) {
    router.push('/auth/login')
    return null
  }

  if (user) {
    return (
      <Dashboard>
        <div className="p-3">
          <MantineReactTable table={table} />
        </div>
      </Dashboard>
    )
  }

  return null
}
