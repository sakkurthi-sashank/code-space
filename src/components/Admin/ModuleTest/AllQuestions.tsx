import { useFetchAdminModulesFromSupabase } from '@/service/queries/course-module'
import { CodingQuestion } from '@/types/types'
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { useMemo } from 'react'
import { DeleteCourseModule } from './DeleteQuestion'
import { EditCourseModule } from './EditQuestion'

export function AllModuleTest({ moduleId }: { moduleId: string }) {
  const { data } = useFetchAdminModulesFromSupabase(moduleId)

  const columns = useMemo<MRT_ColumnDef<CodingQuestion>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
      },
      {
        accessorKey: 'default_code',
        header: 'Default Code',
      },
      {
        accessorKey: 'input_formate',
        header: 'Input Formate',
        Cell: ({ renderedCellValue }) => (
          <pre className="font-mono">{renderedCellValue}</pre>
        ),
      },
      {
        accessorKey: 'marks',
        header: 'Marks',
      },
      {
        accessorKey: 'output_formate',
        header: 'Output Formate',
      },
      {
        accessorKey: 'problem_name',
        header: 'Problem Name',
      },
      {
        accessorKey: 'problem_statement',
        header: 'Problem Statement',
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
