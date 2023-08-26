import { languageOptions } from '@/constants/languageOptions'
import { CodingQuestion, TestCase } from '@/types/databaseExtractTypes.ts'
import { create } from 'zustand'

interface EditorStore {
  editorCode: string
  setEditorCode: (code: string) => void

  currentQuestion: (CodingQuestion & { test_case: TestCase[] }) | null
  setCurrentQuestion: (
    question: CodingQuestion & { test_case: TestCase[] },
  ) => void

  allQuestions: CodingQuestion[]
  setAllQuestions: (questions: CodingQuestion[]) => void

  languageId: number
  setLanguageId: (id: number) => void
  language: string
  setLanguage: (language: string) => void

  questionIds: string[]
  setQuestionIds: (ids: string[]) => void

  sampleTestCases: TestCase[]
  setSampleTestCases: (testCases: TestCase[]) => void

  hiddenTestCases: TestCase[]
  setHiddenTestCases: (testCases: TestCase[]) => void
}

export const useEditorStore = create<EditorStore>((set) => ({
  editorCode: '',
  setEditorCode: (code: string) => set(() => ({ editorCode: code })),

  currentQuestion: null,
  setCurrentQuestion: (question: CodingQuestion & { test_case: TestCase[] }) =>
    set(() => ({ currentQuestion: question })),

  allQuestions: [],
  setAllQuestions: (questions: CodingQuestion[]) =>
    set(() => ({ allQuestions: questions })),

  languageId: 0,
  setLanguageId: (id: number) => set(() => ({ languageId: id })),
  language: languageOptions[0].value,
  setLanguage: (language: string) => set({ language }),

  questionIds: [],
  setQuestionIds: (ids: string[]) => set(() => ({ questionIds: ids })),

  sampleTestCases: [],
  setSampleTestCases: (testCases: TestCase[]) =>
    set(() => ({ sampleTestCases: testCases })),

  hiddenTestCases: [],
  setHiddenTestCases: (testCases: TestCase[]) =>
    set(() => ({ hiddenTestCases: testCases })),
}))
