import { supabase } from '@/libs/supabase'
import { Profile } from '@/types/types'
import { ScrollArea, Table } from '@mantine/core'
import { useEffect, useState } from 'react'

export const AllStudents = () => {
  const [allStudents, setAllStudents] = useState<Profile[]>([])

  useEffect(() => {
    const getAllStudents = async () => {
      const { data: allStudents, error } = await supabase
        .from('profile')
        .select('*')
      if (error) {
        console.log(error)
        return
      }
      setAllStudents(allStudents)
    }

    getAllStudents()
  }, [])

  return (
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
          </tr>
        </thead>
        <tbody>
          {allStudents.map((student) => {
            return (
              <tr>
                <td>{student.admission_number}</td>
                <td>{student.display_name}</td>
                <td>{student.email_address}</td>
                <td>{student.phone_number}</td>
                <td>{student.branch}</td>
                <td>{student.batch}</td>
                <td>{student.section}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
