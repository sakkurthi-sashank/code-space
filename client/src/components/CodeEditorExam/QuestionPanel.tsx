import {
  Code,
  ScrollArea,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core'

export const QuestionPanel = () => {
  const theme = useMantineTheme()

  return (
    <ScrollArea
      sx={{
        borderRadius: '5px',
        border: `1px solid ${theme.colors.gray[1]}`,
      }}
      h={'70vh'}
      type="never"
      p={'md'}
    >
      <Stack spacing={'xs'}>
        <Title order={4}>Two Sum</Title>
        <Text size={'sm'}>
          Given an array of integers nums and an integer target, return indices
          of the two numbers such that they add up to target.
          <br />
          You may assume that each input would have exactly one solution, and
          you may not use the same element twice.
          <br />
          You can return the answer in any order.
        </Text>
        <Text size={'md'} weight={600}>
          Input Format:
        </Text>
        <Text size={'sm'}>
          First line of input contains number of elements in array. Next line
          contains array elements. Last line contains target.
        </Text>
        <Text size={'md'} weight={600}>
          Output Format:
        </Text>
        <Text size={'sm'}>
          For each testcase, in a new line, print the indices of two numbers
          such that they add up to target.
        </Text>
        <Text size={'md'} weight={600}>
          Sample Input 1 :
        </Text>
        <Code p={'sm'}>
          4
          <br />
          2 7 11 15
          <br />9
        </Code>
        <Text size={'md'} weight={600}>
          Sample Output 1 :
        </Text>
        <Code p={'sm'}>0 1</Code>
        <Text size={'md'} weight={600}>
          Sample Input 2 :
        </Text>
        <Code>
          3
          <br />
          3 2 4
          <br />6
        </Code>
        <Text size={'md'} weight={600}>
          Sample Output 2 :
        </Text>
        <Code p={'sm'}>1 2</Code>
      </Stack>
    </ScrollArea>
  )
}
