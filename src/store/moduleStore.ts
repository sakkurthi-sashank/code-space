import { create } from 'zustand'

interface ModuleStore {
  module_id: string
  setModuleId: (moduleId: string) => void
}

export const useModuleStore = create<ModuleStore>((set) => ({
  module_id: '',
  setModuleId: (module_id: string) => set({ module_id }),
}))
