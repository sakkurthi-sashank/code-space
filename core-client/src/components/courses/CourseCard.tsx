import { Card, Badge, Button, Text, Stack, Flex, List, ThemeIcon } from '@mantine/core'
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
      }}
    >
      <Card.Section withBorder>
        <Stack px={20} py={16} bg={''}>
          <Text size={30} weight={500} color="dark">
            Data Structures and Algorithms
          </Text>
        </Stack>
      </Card.Section>

      <Card.Section p={20}>
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

      <Card.Section pb={20} px={20}>
        <List spacing="xs" mt={10}>
          <List.Item
            icon={
              <ThemeIcon color="indigo" variant="light" size={24} radius="xl">
                <IconCalendarTime size={'0.9rem'} />
              </ThemeIcon>
            }
          >
            Starts on : 20th June 2024
          </List.Item>
          <List.Item
            icon={
              <ThemeIcon color="indigo" variant="light" size={24} radius="xl">
                <IconCalendarTime size={'0.9rem'} />
              </ThemeIcon>
            }
          >
            Ends on : 20th August 2024
          </List.Item>
        </List>
      </Card.Section>
      <Card.Section px={20} withBorder>
        <Button variant="light" color="indigo" fullWidth my={20}>
          Explore Course
        </Button>
      </Card.Section>
    </Card>
  )
}
