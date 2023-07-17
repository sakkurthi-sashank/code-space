import { Badge, Card, Flex, Image, Text, Title } from '@mantine/core'
import { useRouter } from 'next/router'

interface InfoCardProps {
  id: string
  course_image: string
  learning_tags: string[]
  course_name: string
  course_description: string
  course_code: string
  profile: {
    display_name: string
  } | null
}

export const InfoCard = ({
  id,
  course_image,
  learning_tags,
  course_name,
  course_description,
  course_code,
  profile,
}: InfoCardProps) => {
  const router = useRouter()

  return (
    <Card
      withBorder
      radius={'md'}
      onClick={() => router.push(`/courses/module/${id}`)}
      className="max-w-sm w-full min-h-[310px] h-full hover:shadow-lg cursor-pointer shadow-sm transition-all duration-200"
    >
      <Card.Section>
        <Image
          src={course_image}
          alt="Data Structures and Algorithms"
          width={'100%'}
          height={120}
        />
      </Card.Section>

      <Card.Section className="p-3 space-y-1.5">
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
          Professor : Dr. {profile?.display_name}
        </Text>
      </Card.Section>

      <Card.Section className="px-2.5 pb-5">
        <Flex gap={10} mt={10} className="truncate">
          {learning_tags?.map((tag) => (
            <Badge color="indigo" key={tag} size="sm" variant="light">
              {tag}
            </Badge>
          ))}
        </Flex>
      </Card.Section>
    </Card>
  )
}
