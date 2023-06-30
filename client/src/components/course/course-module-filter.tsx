import { Box, Select, TextInput, useMantineTheme } from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'

export const CourseModuleFilter = () => {
  const theme = useMantineTheme()
  return (
    <Box
      className="w-full space-x-3 px-3"
      sx={{
        height: 50,
        backgroundColor: 'white',
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="w-full max-w-xs">
        <TextInput
          icon={<IconSearch size="0.8rem" stroke={1.5} />}
          radius="xl"
          size="xs"
          placeholder="Search Modules"
          rightSectionWidth={42}
          w={'full'}
        />
      </div>
      <div>
        <Select
          placeholder="Filter by"
          radius="xl"
          size="xs"
          data={[
            { value: 'isCompleted', label: 'Completed' },
            { value: 'isPending', label: 'Pending' },
            { value: 'isInProgress', label: 'In Progress' },
            { value: 'isExpired', label: 'Expired' },
          ]}
        />
      </div>
    </Box>
  )
}
