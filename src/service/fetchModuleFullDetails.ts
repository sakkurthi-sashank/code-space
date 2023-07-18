import { supabase } from '@/libs/supabase'

export interface Module {
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

export const fetchModuleFullDetails = async (
  moduleId: string | undefined,
): Promise<Module | null> => {
  if (!moduleId) return null

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
    .eq('id', moduleId)
    .single()

  if (error) {
    console.error('Error fetching module details:', error)
    return null
  }

  return data
}
