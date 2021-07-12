//SEARCH ATHLETES PAGE
import React from 'react'
import { useQuery, gql } from '@apollo/client'
import { withStyles } from '@material-ui/core/styles'
import SimpleSelect from "./simpleSelect"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel,
  TextField,
} from '@material-ui/core'


import Title from './Title'

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 100,
  },
  textField: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1),
    minWidth: 300,
    marginTop: theme.spacing(-7),
  },
})

const GET_USER = gql`
  query usersPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [UserSort]
    $filter: UserWhere
  ) {
    users(
      options: { limit: $first, skip: $offset, sort: $orderBy }
      where: $filter
    ) {
      displayName
      Age
      Sport
      
      Records
      {
        record
      }
      Event{
      event
    }
    }
    
  }
  
  
 
`

function UserList(props) {
  const { classes } = props
  const [order, setOrder] = React.useState('ASC')
  const [orderBy, setOrderBy] = React.useState('displayName')
  const [page] = React.useState(0)
  const [rowsPerPage] = React.useState(10)
  const [filterState, setFilterState] = React.useState({ displayNameFilter: '' })
  

  const getFilter = () => {
    return filterState.displayNameFilter.length > 0
      ? { displayName_CONTAINS: filterState.displayNameFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_USER, {
    variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: { [orderBy]: order },
      filter: getFilter(),
    },
  })

  const handleSortRequest = (property) => {
    const newOrderBy = property
    let newOrder = 'DESC'

    if (orderBy === property && order === 'DESC') {
      newOrder = 'ASC'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }
   //const { loading, error, data } = useQuery(GET_USER)
  const handleFilterChange = (filterName) => (event) => {
    const val = event.target.value

    setFilterState((oldFilterState) => ({
      ...oldFilterState,
      [filterName]: val,
    }))
  }
  const set= new Set()
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  
  data.users.map((row) =>(
    row.Event.map((row2) =>(
      set.add(row2.event)
    ))
  ))
  console.log(Array.from(set))
  return (
    <Paper className={classes.root}>
      <Title>Search Athletes</Title>
      <SimpleSelect name="Search Event" list={Array.from(set)}> </SimpleSelect>
      <TextField
        id="search"
        label="Search"
        className={classes.textField}
        value={filterState.displayNameFilter}
        onChange={handleFilterChange('displayNameFilter')}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />

      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell
                key="name"
                sortDirection={orderBy === 'displayName' ? order.toLowerCase() : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'displayName'}
                    direction={order.toLowerCase()}
                    onClick={() => handleSortRequest('displayName')}
                  >
                    Name
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell key="Age">Age</TableCell>
              <TableCell key="Sport">Sport</TableCell>
              <TableCell key="Event">Event</TableCell>
              <TableCell key="Record">Record</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.users.map((n) => {
              return (
                <TableRow key={n.id}>
                  <TableCell component="th" scope="row">
                    {n.displayName}
                  </TableCell>
                  <TableCell>
                    {n.Age}
                  </TableCell>
                  <TableCell>{n.Sport}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}

export default withStyles(styles)(UserList)
