import {
  Badge,
  Card,
  Flex,
  List,
  Progress,
  Stack,
  Text,
  ThemeIcon,
} from '@mantine/core'
import { IconCalendarTime } from '@tabler/icons-react'

export default function CourseCard() {
  return (
    <Card
      shadow="xs"
      padding="lg"
      radius="md"
      withBorder
      sx={{
        maxWidth: 370,
        width: '100%',
        minHeight: 300,
      }}
    >
      <Card.Section>
        <Stack px={20} spacing={4} py={16}>
          <Text
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            size={30}
            weight={500}
            color="dark"
          >
            Data Structures and Algorithms
          </Text>
          <Text size={12}>Odd Sem | 2024</Text>
          <Text size={12}>Amith Kumar Mandal</Text>
        </Stack>
      </Card.Section>

      <Card.Section px={20}>
        <Flex gap={10}>
          <Badge color="red" variant="filled">
            C++
          </Badge>
          <Badge color="blue" variant="filled">
            Algorithms
          </Badge>
          <Badge color="cyan" variant="filled">
            Data Structures
          </Badge>
        </Flex>
      </Card.Section>

      <Card.Section pt={10} px={20}>
        <List spacing="xs" size={'sm'} mt={10}>
          <List.Item
            icon={
              <ThemeIcon color="indigo" variant="light" size={22} radius="xl">
                <IconCalendarTime size={'0.8rem'} />
              </ThemeIcon>
            }
          >
            Starts on : 20th June 2024
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color="indigo" variant="light" size={22} radius="xl">
                <IconCalendarTime size={'0.8rem'} />
              </ThemeIcon>
            }
          >
            Ends on : 20th August 2024
          </List.Item>
        </List>
      </Card.Section>

      <Card.Section px={20} pt={20}>
        <Stack spacing={5}>
          <Text size={12} color="gray">
            Progress
          </Text>
          <Progress color="indigo" size="sm" value={0} />
        </Stack>
      </Card.Section>
    </Card>
  )
}
