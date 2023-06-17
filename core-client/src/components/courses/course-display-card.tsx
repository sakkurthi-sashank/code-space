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
import { useRouter } from 'next/router'

interface CourseDisplayCardProps {
  id: string
  title: string
  description: string
  professor: string
  tags: string[]
  startDate: string
  endDate: string
  progress: number
  validity: number
}

export function CourseDisplayCard({
  id,
  title,
  description,
  professor,
  tags,
  startDate,
  endDate,
  progress,
  validity,
}: CourseDisplayCardProps) {
  const router = useRouter()

  return (
    <Card
      shadow="xs"
      padding="lg"
      radius="md"
      withBorder
      className="w-full max-w-sm cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-xl"
      sx={{
        minHeight: 350,
      }}
      onClick={() => router.push(`/courses/${id}`)}
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
            {title}
          </Text>
          <Text size={12}>{description}</Text>
          <Text size={12}>{professor}</Text>
        </Stack>
      </Card.Section>

      <Card.Section px={20}>
        <Flex gap={10}>
          {tags.map((tag) => (
            <Badge color="violet" variant="light" key={tag}>
              {tag}
            </Badge>
          ))}
        </Flex>
      </Card.Section>

      <Card.Section pt={20}>
        <List spacing="xs" size={'xs'} withPadding mt={10}>
          <List.Item
            icon={
              <ThemeIcon color="indigo" variant="light" size={22} radius="xl">
                <IconCalendarTime size={'0.8rem'} />
              </ThemeIcon>
            }
          >
            Starts on : {startDate}
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color="indigo" variant="light" size={22} radius="xl">
                <IconCalendarTime size={'0.8rem'} />
              </ThemeIcon>
            }
          >
            Ends on : {endDate}
          </List.Item>
        </List>
      </Card.Section>

      <Card.Section px={20} pt={20}>
        <Stack spacing={10}>
          <Stack spacing={6}>
            <Text size={12} color="gray">
              Progress
            </Text>
            <Progress color="indigo" size="sm" value={progress} />
          </Stack>
          <Stack spacing={6}>
            <Text size={12} color="gray">
              Validity
            </Text>
            <Progress color="red" size="sm" value={validity} />
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  )
}
