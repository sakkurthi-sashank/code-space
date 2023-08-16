import { CodingQuestion } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { DeleteCourse } from './DeleteQuestion'
import { EditCourse } from './EditQuestion'

export function AllCodingQuestions() {
  const user = useSession()
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<CodingQuestion[], Error>(
    'admin-coding-questions',
    async () => {
      const { data, error } = await supabaseClient
        .from('coding_question')
        .select('*')
        .order('created_at', { ascending: false })
      return error ? [] : data || []
    },
    {
      enabled: !!user?.user.id,
    },
  )

  const columns = useMemo<MRT_ColumnDef<CodingQuestion>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
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
        accessorKey: 'input_format',
        header: 'Input Format',
      },
      {
        accessorKey: 'output_format',
        header: 'Output Format',
      },
      {
        accessorKey: 'default_code',
        header: 'Default Code',
      },
      {
        accessorKey: 'marks',
        header: 'Marks',
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
