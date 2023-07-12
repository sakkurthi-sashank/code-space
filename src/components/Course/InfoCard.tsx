import {
  Badge,
  Card,
  Flex,
  Image,
  Progress,
  Stack,
  Text,
  Title,
} from '@mantine/core'
import { useRouter } from 'next/router'

interface InfoCardProps {
  id: string
  course_image: string
  learning_tags: string[]
  course_name: string
  course_description: string
  course_code: string
  course_professor: string
  course_validity: number
}

export const InfoCard = ({
  id,
  course_image,
  learning_tags,
  course_name,
  course_description,
  course_code,
  course_professor,
  course_validity,
}: InfoCardProps) => {
  const router = useRouter()

  return (
    <Card
      withBorder
      radius={'md'}
      onClick={() => router.push(`/courses/module/${id}`)}
      className="max-w-xs max-h-[330px] h-full hover:shadow-lg cursor-pointer shadow-sm transition-all duration-200"
    >
      <Card.Section>
        <Image
          src={course_image}
          alt="Data Structures and Algorithms"
          width={'100%'}
          height={100}
        />
      </Card.Section>

      <Card.Section className="p-2.5 space-y-1">
        <Title order={3} fw={600} className="truncate text-gray-800">
          {course_name}
        </Title>
        <Text size={'xs'} color="gray" className="truncate">
          {course_description}
        </Text>
        <Text size={'xs'} color="gray" className="truncate">
          Course Code : {course_code}
        </Text>
        <Text size={'xs'} color="gray" className="truncate">
          Professor : Dr. {course_professor}
        </Text>
      </Card.Section>

      <Card.Section className="px-2.5">
        <Flex gap={10} mt={10} className="truncate">
          {learning_tags?.map((tag) => (
            <Badge color="indigo" key={tag} size="sm" variant="light">
              {tag}
            </Badge>
          ))}
        </Flex>
      </Card.Section>
      <Card.Section className="px-2.5 pb-5">
        <Stack spacing={4} mt="md">
          <Text size={10} color="gray">
            Validity
          </Text>
          <Progress color="gray" size="sm" value={course_validity} />
        </Stack>
      </Card.Section>
    </Card>
  )
}
