import { Module } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { ActionIcon } from '@mantine/core'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { IconArrowNarrowRight } from '@tabler/icons-react'
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { DeleteCourseModule } from './DeleteCourseModule'
import { EditCourseModule } from './EditCourseModule'

export function AllCoursesModule({ courseId }: { courseId: string }) {
  const router = useRouter()
  const user = useSession()
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<Module[], Error>(
    'admin-modules',
    async () => {
      const { data, error } = await supabaseClient
        .from('module')
        .select('*')
        .eq('course_id', courseId)
        .order('created_at', { ascending: false })
      return error ? [] : data || []
    },
    {
      enabled: !!user?.user.id,
    },
  )

  const columns = useMemo<MRT_ColumnDef<Module>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
      },
      {
        accessorKey: 'module_name',
        header: 'Course Name',
      },
      {
        accessorKey: 'duration',
        header: 'Duration',
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.start_date!),
        accessorKey: 'start_date',
        header: 'Start Date',
        filterVariant: 'date-range',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.end_date!),
        accessorKey: 'end_date',
        header: 'End Date',
        filterVariant: 'date-range',
        sortingFn: 'datetime',
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
      },
      {
        header: 'View Modules',
        Cell: ({ row }) => (
          <ActionIcon
            color="indigo"
            variant="light"
            onClick={() => {
              router.push(`/admin/courses/module-test/${row.original.id}`)
            }}
          >
            <IconArrowNarrowRight size={18} stroke={1.5} />
          </ActionIcon>
        ),
      },
      {
        header: 'Edit Module',
        Cell: ({ row }) => <EditCourseModule {...row.original} />,
      },
      {
        header: 'Delete Module',
        Cell: ({ row }) => <DeleteCourseModule id={row.original.id!} />,
      },
    ],
    [router],
  )

  const table = useMantineReactTable({
    columns,
    data: data || [],
    enableFullScreenToggle: false,
    columnFilterDisplayMode: 'subheader',
  })

  return (
    <div className="flex flex-col w-full p-3">
      <MantineReactTable table={table} />
    </div>
  )
}
