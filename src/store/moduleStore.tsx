import { supabase } from '@/libs/supabase'
import { create } from 'zustand'

interface PreviewModulesData {
  id: string
  module_name: string
  start_date: string
  end_date: string
  duration: number | null
}

interface UserSelectedModuleFullData {
  id: string
  module_name: string
  start_date: string
  end_date: string
  duration: number | null
  coding_question: {
    id: string
    marks: number | null
  }[]
  mcq_question: {
    id: string
    marks: number | null
  }[]
}

interface ModuleStore {
  userSelectedModuleId: string | null
  setUserSelectedModuleId: (id: string | null) => void
  previewModulesData: PreviewModulesData[] | null
  fetchPreviewModulesData: (courseId: string) => Promise<void>
  userSelectedModuleFullData: UserSelectedModuleFullData | null
  fetchUserSelectedModuleFullData: (
    userSelectedModuleId: string,
  ) => Promise<void>
}

export const useModuleStore = create<ModuleStore>((set) => ({
  userSelectedModuleId: null,

  setUserSelectedModuleId: (id: string | null) =>
    set({ userSelectedModuleId: id }),

  previewModulesData: null,

  fetchPreviewModulesData: async (courseId: string) => {
    if (!courseId) {
      return
    }
    const { data } = await supabase
      .from('module')
      .select('*')
      .filter('course_id', 'eq', courseId)

    set({ previewModulesData: data })
  },

  userSelectedModuleFullData: null,

  fetchUserSelectedModuleFullData: async (userSelectedModuleId: string) => {
    if (!userSelectedModuleId) {
      return
    }

    const { data, error } = await supabase
      .from('module')
      .select(
        `
        id,
        module_name,
        start_date,
        end_date,
        duration,
        coding_question (
          id,
          marks
        ),
        mcq_question (
          id,
          marks
        )
      `,
      )
      .eq('id', userSelectedModuleId)
      .single()

    if (error) {
      return
    }

    set({ userSelectedModuleFullData: data })
  },
}))
