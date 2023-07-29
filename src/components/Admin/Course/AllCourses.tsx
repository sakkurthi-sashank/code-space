import { supabase } from '@/libs/supabase'
import { Course } from '@/types/types'
import { Image } from '@mantine/core'
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { useEffect, useMemo, useState } from 'react'
import { DeleteCourse } from './DeleteCourse'
import { EditCourse } from './EditCourse'

export function AllCourses() {
  const [data, setData] = useState<Course[]>([])

  const fetchCourses = async () => {
    const { data, error } = await supabase
      .from('course')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw error
    }
    setData(data)
  }

  useEffect(() => {
    fetchCourses()
  }, [])

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
        accessorKey: 'start_date',
        header: 'Start Date',
        filterVariant: 'date-range',
        sortingFn: 'datetime',
        Cell: ({ row }) => {
          return <>{new Date(row.original.start_date!).toLocaleDateString()}</>
        },
      },
      {
        accessorKey: 'end_date',
        header: 'End Date',
        filterVariant: 'date-range',
        sortingFn: 'datetime',
        Cell: ({ row }) => {
          return <>{new Date(row.original.end_date!).toLocaleDateString()}</>
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
          return (
            <>
              <DeleteCourse id={row.original.id!} />
            </>
          )
        },
      },
    ],
    [],
  )

  const table = useMantineReactTable({
    columns,
    data,
    enableFullScreenToggle: false,
    columnFilterDisplayMode: 'popover',
  })

  return (
    <div className="flex flex-col w-full p-3">
      <MantineReactTable table={table} />
    </div>
  )
}
