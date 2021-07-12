//USER EVENT PAGE
import React from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery, gql } from '@apollo/client'
import Title from './Title'


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



export default function RecentReviews() {
  const { loading, error, data } = useQuery(GET_USER_EVENTS, { variables: { "usersWhere": {
    "userName": "jk7"
  },
  "recordWhere": {
    "user": {
      "userName": "jk7"
    }
  }
  }})
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  console.log(data)
  data.users.map((row)=>(
    row.Event.map((row2)=>(
    console.log(row2.record.record)
    ))
  ))
  
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
            row.Event.map((row2)=>(
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
