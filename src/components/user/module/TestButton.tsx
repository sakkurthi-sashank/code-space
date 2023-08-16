import { Module, ProfileSubmittedModule } from '@/types/databaseExtractTypes.ts'
import { Database } from '@/types/supabase'
import { Button } from '@mantine/core'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

type ModuleData = Module & {
  coding_question: {
    id: string
  }[]
  profile_submitted_module: ProfileSubmittedModule[]
}

export function TestButton(module: ModuleData) {
  const supabaseClient = useSupabaseClient<Database>()
  const router = useRouter()
  const userId = useSession()?.user.id

  const isStarted = new Date(module.start_date!) < new Date()
  const isEnded = new Date(module.end_date!) < new Date()
  const isSubmitted = module.profile_submitted_module[0]?.is_submitted

  function buttonProps() {
    if (isStarted && !isEnded && isSubmitted === undefined) {
      return {
        children: 'Start',
        color: 'indigo',
        disabled: false,
        variant: 'filled',
      }
    } else if (!isStarted) {
      return {
        children: 'Not Started',
        color: 'gray',
        disabled: true,
        variant: 'outline',
      }
    } else if (isEnded) {
      return {
        children: 'Ended',
        color: 'gray',
        disabled: true,
        variant: 'outline',
      }
    }

    if (isSubmitted === false) {
      return {
        children: 'Resume',
        color: 'green',
        disabled: false,
        variant: 'outline',
      }
    } else if (isSubmitted === undefined) {
      return {
        children: 'Start',
        color: 'indigo',
        disabled: false,
        variant: 'filled',
      }
    } else if (isSubmitted === true) {
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
      .from('profile_submitted_module')
      .select('*')
      .eq('profile_id', userId!)
      .eq('module_id', moduleId)
      .limit(1)
      .maybeSingle()

    if (!data) {
      await supabaseClient
        .from('profile_submitted_module')
        .insert({
          profile_id: userId!,
          module_id: moduleId,
          is_submitted: false,
        })
        .select('*')
    }
    router.push(`/courses/modules/module-test/validation/${moduleId}`)
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
