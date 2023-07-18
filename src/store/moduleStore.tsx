import { supabase } from '@/libs/supabase'
import { CodingQuestion, MCQQuestion, Module } from '@/types/types'
import { create } from 'zustand'

interface ModuleData extends Module {
  coding_question?: CodingQuestion[]
  mcq_question?: MCQQuestion[]
}

interface ModuleStore {
  currentSelectedModuleId: string | null
  setCurrentSelectedModuleId: (id: string) => void
  previewModuleDetails: Module[] | null
  fetchPreviewModuleDetails: (courseId: string) => Promise<void>
  fullModuleDetails: ModuleData | null
  fetchFullModuleDetails: (currentSelectedModuleId: string) => Promise<void>
}

export const useModuleStore = create<ModuleStore>((set) => ({
  currentSelectedModuleId: null,
  setCurrentSelectedModuleId: (id: string) =>
    set({ currentSelectedModuleId: id }),
  previewModuleDetails: null,
  fetchPreviewModuleDetails: async (courseId: string) => {
    if (!courseId) {
      return
    }
    const { data } = await supabase
      .from('module')
      .select('*')
      .filter('course_id', 'eq', courseId)

    set({ previewModuleDetails: data })
  },
  fullModuleDetails: null,
  fetchFullModuleDetails: async (currentSelectedModuleId: string) => {
    if (!currentSelectedModuleId) {
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
      .eq('id', currentSelectedModuleId)
      .single()

    if (error) {
      return
    }
    set({ fullModuleDetails: data })
  },
}))
