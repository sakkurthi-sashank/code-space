import { ICourse } from '@/interface/course'
import {
  Badge,
  Card,
  Divider,
  Flex,
  Progress,
  Stack,
  Text,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core'
import { IconCalendarTime } from '@tabler/icons-react'
import { useRouter } from 'next/router'

export const CourseInfoCard: React.FC<ICourse> = ({
  id,
  courseName,
  courseUnqId,
  courseDescription,
  professorName,
  courseStartDate,
  courseEndDate,
  learningTags,
  cousreValidityPeriod,
  studentProgress,
}) => {
  const router = useRouter()

  const handleCardClick = () => {
    router.push(`/courses/${id}`)
  }

  return (
    <Card
      shadow="xs"
      radius="md"
      withBorder
      className="w-full max-w-sm cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-xl"
      sx={{
        minHeight: 350,
      }}
      onClick={handleCardClick}
    >
      <Card.Section px={20} py={16}>
        <Stack spacing={4}>
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
            {courseName}
          </Text>
          <Text size={12}>Course ID: {courseUnqId}</Text>
          <Text size={12}>{courseDescription}</Text>
          <Text size={12}>Professor: {professorName}</Text>
        </Stack>
      </Card.Section>

      <Card.Section px={20} py={8}>
        <Flex gap={10}>
          {learningTags?.map((tag) => (
            <Badge color="indigo" variant="light" key={tag}>
              {tag}
            </Badge>
          ))}
        </Flex>
      </Card.Section>

      <Card.Section px={20} py={14}>
        <div className="flex justify-around">
          <UnstyledButton className="flex items-center justify-between space-x-3">
            <ThemeIcon variant="light" radius="xl" size="sm" color="green">
              <IconCalendarTime stroke={1.5} size={'0.8rem'} />
            </ThemeIcon>
            <Text size={12} color="gray">
              Starts Date <br /> {courseStartDate}
            </Text>
          </UnstyledButton>

          <Divider orientation="vertical" />

          <UnstyledButton className="flex items-center justify-between space-x-3">
            <ThemeIcon variant="light" radius="xl" size="sm" color="red">
              <IconCalendarTime stroke={1.5} size={'0.8rem'} />
            </ThemeIcon>
            <Text size={12} color="gray">
              Ends Date <br /> {courseEndDate}
            </Text>
          </UnstyledButton>
        </div>
      </Card.Section>

      <Card.Section px={20} py={10}>
        <Stack spacing={10}>
          <Stack spacing={6}>
            <Text size={12} color="gray">
              Validity
            </Text>
            <Progress color="red" size="sm" value={cousreValidityPeriod} />
          </Stack>
          <Stack spacing={6}>
            <Text size={12} color="gray">
              Progress
            </Text>
            <Progress color="indigo" size="sm" value={studentProgress} />
          </Stack>
        </Stack>
      </Card.Section>
    </Card>
  )
}
