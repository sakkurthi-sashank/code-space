import { supabase } from '@/libs/supabase'
import { Profile } from '@/types/types'
import { ScrollArea, Table } from '@mantine/core'
import { User } from '@supabase/supabase-js'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { DeleteProfile } from './DeleteProfile'
import { UpdateAsAdmin } from './UpdateAsAdmin'
import { UpdateProfile } from './UpdateProfile'

export const AllProfiles = () => {
  const [allProfiles, setAllProfiles] = useState<Profile[]>([])
  const [userList, setUserList] = useState<User[]>([])

  useEffect(() => {
    const getAllProfiles = async () => {
      const { data: allProfiles, error } = await supabase
        .from('profile')
        .select('*')
      if (error) {
        console.log(error)
        return
      }
      setAllProfiles(allProfiles)
    }
    getAllProfiles()
  }, [])

  const fetchUserData = useCallback(async () => {
    const { data: userList, error } = await supabase.auth.admin.listUsers()
    if (error) {
      console.log(error)
      return
    }
    setUserList(userList.users)
  }, [])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  const userListCache = useMemo(() => userList, [userList])

  return (
    <div className="flex p-3 mx-3 bg-white justify-between items-center">
      <ScrollArea w={'100%'}>
        <Table striped withBorder withColumnBorders>
          <thead>
            <tr>
              <th>Admission Number</th>
              <th>Display Name</th>
              <th>Email Address</th>
              <th>Phone Number</th>
              <th>Branch</th>
              <th>Batch</th>
              <th>Section</th>
              <th>isAdmin</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {allProfiles.map((profile) => (
              <tr key={profile.id}>
                <td>{profile.admission_number}</td>
                <td>{profile.display_name}</td>
                <td>{profile.email_address}</td>
                <td>{profile.phone_number}</td>
                <td>{profile.branch}</td>
                <td>{profile.batch}</td>
                <td>{profile.section}</td>
                <td>
                  <UpdateAsAdmin
                    userId={profile.id!}
                    userList={userListCache}
                  />
                </td>
                <td>
                  <UpdateProfile {...profile} />
                </td>
                <td>
                  <DeleteProfile userId={profile.id!} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </ScrollArea>
    </div>
  )
}
