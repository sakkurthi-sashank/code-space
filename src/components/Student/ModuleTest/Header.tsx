import { Header } from '@mantine/core'
import { ChangeQuestions } from './ChangeQuestion'

export const ModuleTestHeader = () => {
  return (
    <Header height={50}>
      <ChangeQuestions
        moduleId="48e56e62-42d2-40f8-9b59-1034d7c14b15"
        setCurrentUserSelectedQuestionId={() => {}}
      />
    </Header>
  )
}
