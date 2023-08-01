import { useProfileQuery } from '@/service/Admin/Queries/useProfileQuery'
import { Profile } from '@/types/types'
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from 'mantine-react-table'
import { useMemo } from 'react'
import { DeleteProfile } from './DeleteProfile'
import { EditProfile } from './EditProfile'

export function AllProfiles() {
  const { data } = useProfileQuery()

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
          return <EditProfile {...row.original} />
        },
      },
      {
        header: 'Delete Course',
        Cell: ({ row }) => {
          return <DeleteProfile userId={row.original.id!} />
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
