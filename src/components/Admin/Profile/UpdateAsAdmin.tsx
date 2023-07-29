import { Switch } from '@mantine/core'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { User } from '@supabase/supabase-js'
import { useEffect, useState } from 'react'

export function UpdateAsAdmin({
  userId,
  userList,
}: {
  userId: string
  userList: User[]
}) {
  const [isAdmin, setAdmin] = useState(false)
  const supabaseClient = useSupabaseClient()

  useEffect(() => {
    const fetchUserData = async () => {
      const user = (await userList).find((user) => user.id === userId)
      if (user) {
        setAdmin(user.user_metadata?.role === 'admin')
      }
    }

    fetchUserData()
  }, [userId, userList])

  async function updateUserRole() {
    const newRole = isAdmin ? '' : 'admin'
    const { data } = await supabaseClient.auth.admin.updateUserById(userId, {
      user_metadata: { role: newRole },
    })

    if (data) {
      setAdmin(!isAdmin)
    }
  }

  return <Switch size="xs" onChange={updateUserRole} checked={isAdmin} />
}
