import { DashboardLayout } from '@/layouts/DashboardLayout'
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  List,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  useMantineTheme,
} from '@mantine/core'
import { IconCalendarTime } from '@tabler/icons-react'

export default function CoursePage() {
  const theme = useMantineTheme()

  return (
    <DashboardLayout>
      <Stack spacing={0}>
        <Box
          sx={{
            height: 50,
            backgroundColor: 'white',
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
          }}
        ></Box>

        <Flex
          bg="white"
          h="90vh"
          sx={{
            borderBottom: `1px solid ${theme.colors.gray[2]}`,
          }}
        >
          <Box sx={{ width: '40%' }}>
            <Tabs defaultValue="pending">
              <Tabs.List grow h={50}>
                <Tabs.Tab value="pending">Pending</Tabs.Tab>
                <Tabs.Tab value="completed">Completed</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="pending">
                <Box
                  p="sm"
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.colors.gray[0],
                      cursor: 'pointer',
                    },
                  }}
                >
                  <Stack spacing={3}>
                    <Text size={16} fw={600}>
                      Introduction to Data Structures
                    </Text>
                    <Flex justify="start" gap={10}>
                      <Text size={12}>Starts on: 20th June 2024</Text>
                      <Divider
                        color={theme.colors.gray[2]}
                        orientation="vertical"
                      />
                      <Text size={12}>Ends on: 20th August 2024</Text>
                    </Flex>
                  </Stack>

                  <Flex gap={10} mt={10}>
                    <Badge color="gray">10 days Ago</Badge>
                  </Flex>
                </Box>

                <Divider color={theme.colors.gray[2]} />
              </Tabs.Panel>

              <Tabs.Panel value="completed">
                {/* Completed panel content */}
              </Tabs.Panel>
            </Tabs>
          </Box>

          <Divider orientation="vertical" color={theme.colors.gray[2]} />

          <Box sx={{ width: '60%' }}>
            <Stack spacing={8} p="md">
              <Text size={24} fw={600}>
                Introduction to Data Structures
              </Text>

              <Flex justify="start" gap={10}>
                <Text size={16}>Starts on: 20th June 2024</Text>
                <Divider color={theme.colors.gray[2]} orientation="vertical" />
                <Text size={16}>Ends on: 20th August 2024</Text>
              </Flex>
            </Stack>

            <Tabs defaultValue="overview">
              <Tabs.List grow h={50}>
                <Tabs.Tab value="overview">Overview</Tabs.Tab>
                <Tabs.Tab value="questions">Results</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="overview">
                <Stack spacing={3} p="md">
                  <Stack spacing={6} mt={20}>
                    <Text size={16} fw={600}>
                      Overview
                    </Text>

                    <Text size={14}>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, voluptatum. Quisquam, voluptatum. Quisquam,
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quisquam, voluptatum. Quisquam, voluptatum. Quisquam,
                    </Text>

                    <List spacing="xs" mt={10} size="sm">
                      <List.Item
                        icon={
                          <ThemeIcon
                            color="green"
                            variant="light"
                            size={24}
                            radius="xl"
                          >
                            <IconCalendarTime size="0.9rem" />
                          </ThemeIcon>
                        }
                      >
                        No of Questions: 10
                      </List.Item>
                      <List.Item
                        icon={
                          <ThemeIcon
                            color="green"
                            variant="light"
                            size={24}
                            radius="xl"
                          >
                            <IconCalendarTime size="0.9rem" />
                          </ThemeIcon>
                        }
                      >
                        Duration: 30 mins
                      </List.Item>
                      <List.Item
                        icon={
                          <ThemeIcon
                            color="green"
                            variant="light"
                            size={24}
                            radius="xl"
                          >
                            <IconCalendarTime size="0.9rem" />
                          </ThemeIcon>
                        }
                      >
                        Difficulty: Easy
                      </List.Item>
                      <List.Item
                        icon={
                          <ThemeIcon
                            color="green"
                            variant="light"
                            size={24}
                            radius="xl"
                          >
                            <IconCalendarTime size="0.9rem" />
                          </ThemeIcon>
                        }
                      >
                        Marks: 10
                      </List.Item>
                      <List.Item
                        icon={
                          <ThemeIcon
                            color="green"
                            variant="light"
                            size={24}
                            radius="xl"
                          >
                            <IconCalendarTime size="0.9rem" />
                          </ThemeIcon>
                        }
                      >
                        Negative Marks: 0
                      </List.Item>
                      <List.Item
                        icon={
                          <ThemeIcon
                            color="green"
                            variant="light"
                            size={24}
                            radius="xl"
                          >
                            <IconCalendarTime size="0.9rem" />
                          </ThemeIcon>
                        }
                      >
                        Type: MCQ
                      </List.Item>
                      <List.Item
                        icon={
                          <ThemeIcon
                            color="green"
                            variant="light"
                            size={24}
                            radius="xl"
                          >
                            <IconCalendarTime size="0.9rem" />
                          </ThemeIcon>
                        }
                      >
                        Status: Active
                      </List.Item>
                      <List.Item
                        icon={
                          <ThemeIcon
                            color="green"
                            variant="light"
                            size={24}
                            radius="xl"
                          >
                            <IconCalendarTime size="0.9rem" />
                          </ThemeIcon>
                        }
                      >
                        Start Before: 20th June 2024 12:00 PM
                      </List.Item>
                    </List>
                  </Stack>

                  <Flex justify="end" mt={30}>
                    <Button color="indigo" variant="filled">
                      Start Test
                    </Button>
                  </Flex>
                </Stack>
              </Tabs.Panel>

              <Tabs.Panel value="questions">
                {/* Questions panel content */}
              </Tabs.Panel>
            </Tabs>
          </Box>
        </Flex>
      </Stack>
    </DashboardLayout>
  )
}
