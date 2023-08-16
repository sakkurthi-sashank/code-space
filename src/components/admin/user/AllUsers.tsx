import { Profile } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { DeleteUser } from './DeleteUser'
import { EditUser } from './EditUser'

export function AllUsers() {
  const user = useSession()
  const supabaseClient = useSupabaseClient<Database>()

  const { data, error, isLoading } = useQuery<Profile[], Error>(
    'admin-profiles',
    async () => {
      const { data, error } = await supabaseClient.from('profile').select('*')
      return error ? [] : data || []
    },
    {
      enabled: !!user?.user.id,
    },
  )

  const columns = useMemo<MRT_ColumnDef<Profile>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        enableEditing: false,
      },
      {
        accessorKey: 'is_admin',
        header: 'Is Admin',
        Cell: ({ renderedCellValue }) => {
          return <div>{renderedCellValue ? 'Yes' : 'No'}</div>
        },
      },
      {
        accessorKey: 'admission_number',
        header: 'Admission Number',
      },
      {
        accessorKey: 'display_name',
        header: 'Display Name',
      },
      {
        accessorKey: 'email_address',
        header: 'Email Address',
      },
      {
        accessorKey: 'phone_number',
        header: 'Phone Number',
      },
      {
        accessorKey: 'branch',
        header: 'Branch',
      },
      {
        accessorKey: 'batch',
        header: 'Batch',
      },
      {
        accessorKey: 'section',
        header: 'Section',
      },
      {
        header: 'Edit Course',
        Cell: ({ row }) => {
          return <EditUser {...row.original} />
        },
      },
      {
        header: 'Delete Course',
        Cell: ({ row }) => {
          return <DeleteUser userId={row.original.id!} />
        },
      },
    ],
    [],
  )

  const table = useMantineReactTable({
    columns,
    data: data || [],
    enableFullScreenToggle: false,
    columnFilterDisplayMode: 'popover',
  })

  return (
    <div className="flex flex-col w-full p-3">
      <MantineReactTable table={table} />
    </div>
  )
}
