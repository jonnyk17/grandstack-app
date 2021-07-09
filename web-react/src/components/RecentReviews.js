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
 query User($userName: String!){
  User(userName: $userName) {
    event
    record
  }
}
`



export default function RecentReviews() {
  const { loading, error, data } = useQuery(GET_USER_EVENTS, { variables: { userName: "jk7"}})
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
          {data.User.map((row) => (
            <TableRow key={row.event}>
              <TableCell>{row.event}</TableCell>
              <TableCell align="right"> {row.record}</TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  }
  </>
  )
}
