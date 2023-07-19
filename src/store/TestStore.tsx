import { supabase } from '@/libs/supabase'
import { CodingQuestion, TestCase } from '@/types/types'
import { create } from 'zustand'

interface CodingQuestionOnUserSelectedId extends CodingQuestion {
  test_case: TestCase[]
}

interface TestStore {
  currentSelectedQuestionId: number
  setCurrentSelectedQuestionId: (currentSelectedQuestionId: number) => void
  codingQuestionIds: { id: string }[]
  fetchCodingQuestionIds: (moduleId: string) => void
  codingQuestionOnUserSelectedId: CodingQuestionOnUserSelectedId | null
  fetchCodingQuestionOnUserSelectedId: (questionId: string) => void
}

export const useTestStore = create<TestStore>((set, get) => ({
  currentSelectedQuestionId: 0,

  setCurrentSelectedQuestionId: (currentSelectedQuestionId) =>
    set({ currentSelectedQuestionId }),

  codingQuestionIds: [],

  fetchCodingQuestionIds: async (moduleId) => {
    const { data, error } = await supabase
      .from('coding_question')
      .select(`id`)
      .eq('module_id', moduleId)
    if (error) {
      return
    }
    get().fetchCodingQuestionOnUserSelectedId(data ? data[0].id : '')
    set({ codingQuestionIds: data ?? [] })
  },

  codingQuestionOnUserSelectedId: null,

  fetchCodingQuestionOnUserSelectedId: async (questionId) => {
    const { data, error } = await supabase
      .from('coding_question')
      .select(
        `*, test_case (id, coding_question_id, input, output, is_sample_test_case)`,
      )
      .eq('id', questionId)
      .filter('test_case.is_sample_test_case', 'eq', true)
      .limit(1)

    if (error) {
      return
    }

    set({ codingQuestionOnUserSelectedId: data ? data[0] : null })
  },
}))
