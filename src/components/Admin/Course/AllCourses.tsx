import { useCourseQuery } from '@/service/Admin/Queries/useCourseQuery'
import { Course } from '@/types/types'
import { ActionIcon, Image } from '@mantine/core'
import { IconArrowNarrowRight } from '@tabler/icons-react'
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { DeleteCourse } from './DeleteCourse'
import { EditCourse } from './EditCourse'

export function AllCourses() {
  const { data } = useCourseQuery()
  const router = useRouter()

  const columns = useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
      },
      {
        accessorKey: 'course_image',
        header: 'Course Image',
        Cell: ({ row }) => {
          return (
            <Image
              src={row.original.course_image}
              alt={row.original.course_name}
              width={100}
              height={100}
              radius="md"
            />
          )
        },
      },
      {
        accessorKey: 'course_name',
        header: 'Course Name',
      },
      {
        accessorKey: 'course_code',
        header: 'Course Code',
      },
      {
        accessorKey: 'course_description',
        header: 'Course Description',
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
        Cell: ({ row }) => {
          return (
            <ActionIcon
              color="indigo"
              variant="light"
              onClick={() => {
                router.push(`/admin/courses/module/${row.original.id}`)
              }}
            >
              <IconArrowNarrowRight size={18} stroke={1.5} />
            </ActionIcon>
          )
        },
      },
      {
        header: 'Edit Course',
        Cell: ({ row }) => {
          return <EditCourse {...row.original} />
        },
      },
      {
        header: 'Delete Course',
        Cell: ({ row }) => {
          return <DeleteCourse id={row.original.id!} />
        },
      },
    ],
    [],
  )

  const table = useMantineReactTable({
    columns,
    data,
    enableFullScreenToggle: false,
    columnFilterDisplayMode: 'subheader',
  })

  return (
    <div className="flex flex-col w-full p-3">
      <MantineReactTable table={table} />
    </div>
  )
}
