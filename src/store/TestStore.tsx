import { supabase } from '@/libs/supabase'
import { CodingQuestion } from '@/types/types'
import { create } from 'zustand'

interface TestStore {
  currentQuestionId: number
  setCurrentQuestion: (currentQuestion: number) => void
  codingQuestions: CodingQuestion[]
  fetchCodingQuestions: (moduleId: string) => void
}

export const useTestStore = create<TestStore>((set) => ({
  currentQuestionId: 0,

  setCurrentQuestion: (currentQuestionId) => set({ currentQuestionId }),

  codingQuestions: [],

  fetchCodingQuestions: async (moduleId) => {
    console.log(moduleId)

    const { data: codingQuestions, error } = await supabase
      .from('coding_question')
      .select(`*,test_case(*)`)
      .eq('module_id', moduleId)
      .filter('test_case.is_sample_test_case', 'eq', true)
    if (error) {
      console.log(error)
    } else {
      set({ codingQuestions: codingQuestions ?? [] })
    }
  },
}))
