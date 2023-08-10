import { Database } from '@/types/supabase'
import { Module, ProfileCompletedModule } from '@/types/types'
import { Button } from '@mantine/core'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

type ModuleData = Module & {
  coding_question: {
    id: string
  }[]
  profile_completed_module: ProfileCompletedModule[]
}

export function TestButton(module: ModuleData) {
  const supabaseClient = useSupabaseClient<Database>()
  const router = useRouter()
  const userId = useSession()?.user.id

  function buttonProps() {
    if (module.profile_completed_module[0]?.is_submitted === false) {
      return {
        children: 'Resume',
        color: 'green',
        disabled: false,
        variant: 'outline',
      }
    } else if (module.profile_completed_module[0]?.is_submitted === undefined) {
      return {
        children: 'Start',
        color: 'indigo',
        disabled: false,
        variant: 'filled',
      }
    } else if (module.profile_completed_module[0]?.is_submitted === true) {
      return {
        children: 'Completed',
        color: 'gray',
        disabled: true,
        variant: 'outline',
      }
    }
  }

  async function handleStartTest(moduleId: string) {
    const { data, error } = await supabaseClient
      .from('profile_completed_module')
      .select('*')
      .eq('profile_id', userId!)
      .eq('module_id', moduleId)
      .limit(1)
      .maybeSingle()
    if (!data) {
      await supabaseClient
        .from('profile_completed_module')
        .insert({
          profile_id: userId!,
          module_id: moduleId,
          is_submitted: false,
        })
        .select('*')
    }
    router.push(`/courses/module-test/validation/${moduleId}`)
  }

  return (
    <Button
      onClick={() => handleStartTest(module.id!)}
      {...buttonProps()}
      size="xs"
      uppercase
    />
  )
}
