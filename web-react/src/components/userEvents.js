import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'
import { useAuth0 } from "@auth0/auth0-react"


const GET_USER_EVENTS = gql`
query Query($usersWhere: UserWhere,$recordWhere: RecordWhere) {
  users(where: $usersWhere) {
    Event{
      event
      record(where: $recordWhere) {
        record
      }
    }
   
  }
}
`

export default function userEvents() {
  const { user, isLoading } = useAuth0();
  if (isLoading) return <p>Loading</p>
  if (user)
    var id1 = user.sub
  else
    id1 = ""
  const { loading, error, data } = useQuery(GET_USER_EVENTS, {
    variables: {
      "usersWhere": {
        "id": id1

      },
      "recordWhere": {
        "user": {
          "id": id1
        }
      }
    }
  })

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <>
      {data &&
        <React.Fragment>
          <Title>Your Events</Title>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Event</TableCell>
                <TableCell align="right">Record</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.users.map((row) => (
                row.Event.map((row2) => (
                  <TableRow key={row2.event}>
                    <TableCell>{row2.event}</TableCell>
                    <TableCell align="right"> {row2.record.record}</TableCell>
                  </TableRow>
                ))
              ))}
            </TableBody>
          </Table>
        </React.Fragment>
      }
    </>
  )
}
