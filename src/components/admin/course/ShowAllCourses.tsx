import { Course } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { ActionIcon, Image, Loader } from '@mantine/core'
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
import { DeleteCourse } from './DeleteCourse'
import { EditCourse } from './EditCourse'

export function ShowAllCourses() {
  const router = useRouter()
  const user = useSession()
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<Course[], Error>(
    'admin-courses',
    async () => {
      const { data, error } = await supabaseClient
        .from('course')
        .select('*')
        .order('created_at', { ascending: false })
      return error ? [] : data || []
    },
    {
      enabled: !!user?.user.id,
    },
  )

  const columns = useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'course_name',
        header: 'Course Name',
      },
      {
        accessorKey: 'course_image',
        header: 'Course Image',
        Cell: ({ row }) => (
          <Image
            src={row.original.course_image}
            alt={row.original.course_name}
            width={100}
            height={100}
            radius="md"
          />
        ),
      },
      {
        accessorKey: 'course_code',
        header: 'Course Code',
      },
      {
        accessorKey: 'enrollent_code',
        header: 'Enrollment Code',
        minSize: 300,
      },
      {
        accessorKey: 'course_description',
        header: 'Course Description',
        minSize: 400,
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.start_date!),
        accessorKey: 'start_date',
        header: 'Start Date',
        filterVariant: 'date-range',
        sortingFn: 'datetime',
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
            variant="filled"
            size={'md'}
            radius={'100%'}
            onClick={() => {
              router.push(`/admin/courses/module/${row.original.id}`)
            }}
          >
            <IconArrowNarrowRight size={16} stroke={1.75} />
          </ActionIcon>
        ),
      },
      {
        header: 'Edit Course',
        Cell: ({ row }) => <EditCourse {...row.original} />,
      },
      {
        header: 'Delete Course',
        Cell: ({ row }) => <DeleteCourse id={row.original.id!} />,
      },
    ],
    [router],
  )

  const table = useMantineReactTable({
    columns,
    data: data || [],
    enableFullScreenToggle: false,
    columnFilterDisplayMode: 'popover',
    enablePagination: false,
    enableTopToolbar: false,
    initialState: { density: 'xl' },
  })

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="flex flex-col w-full p-2">
      <MantineReactTable table={table} />
    </div>
  )
}
