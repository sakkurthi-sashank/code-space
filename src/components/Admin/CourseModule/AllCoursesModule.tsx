import { useCourseModuleQuery } from '@/service/Admin/Queries/useCourseModuleQuery'
import { Module } from '@/types/types'
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { useMemo } from 'react'
import { DeleteCourseModule } from './DeleteCourseModule'
import { EditCourseModule } from './EditCourseModule'

export function AllCoursesModule({ courseId }: { courseId: string }) {
  const { data } = useCourseModuleQuery(courseId)

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
        header: 'Edit Module',
        Cell: ({ row }) => {
          return <EditCourseModule {...row.original} />
        },
      },
      {
        header: 'Delete Module',
        Cell: ({ row }) => {
          return <DeleteCourseModule id={row.original.id!} />
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
