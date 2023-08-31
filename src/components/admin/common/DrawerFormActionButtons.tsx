import { Button, Group } from '@mantine/core'

export const DrawerFormActionButtons = ({
  close,
  loading,
}: {
  close: () => void
  loading: boolean
}) => {
  return (
    <Group
      spacing={'xs'}
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: '0.75rem',
      }}
    >
      <Button
        onClick={close}
        fw={500}
        color="red"
        variant="filled"
        size="xs"
        uppercase
      >
        Cancel
      </Button>
      <Button
        type="submit"
        className="ml-2"
        size="xs"
        loading={loading}
        fw={500}
        uppercase
      >
        Save Changes
      </Button>
    </Group>
  )
}
