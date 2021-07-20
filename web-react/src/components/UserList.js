//SEARCH ATHLETES PAGE
import React from "react";
import { useQuery, gql, NetworkStatus } from "@apollo/client";
import { withStyles } from "@material-ui/core/styles";
import SimpleSelect from "./simpleSelect";
//import { useEffect } from "react";
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
} from "@material-ui/core";

import Title from "./Title";

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: "auto",
    margin: "auto",
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
});

const GET_USER = gql`
  query usersPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [UserSort]
     $displayNameContains: String
     $eventContains:String
    
  ) {
    users(
      options: { limit: $first, skip: $offset, sort: $orderBy }
      where: {displayName_CONTAINS: $displayNameContains, Event:{event_CONTAINS:  $eventContains}}
    ) {
      displayName
      Age
      Sport

      Records(where: {event:{event:  $eventContains}}) {
        record
      }
      Event {
        event
      }
    }

    events {
      event
    }
  }
 
`;

function UserList(props) {
  const { classes } = props;
  const [order, setOrder] = React.useState("ASC");
  const [orderBy, setOrderBy] = React.useState("displayName");
  const [page] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [filterState, setFilterState] = React.useState("");
  const [eventState, setEventState] =React.useState("");

  //const {/*loading: recordLoading, error: recordError, data: recordData, */ refetch: refetchRecord }=useQuery(GET_RECORD, {skip: true})

  const { loading, data, error, refetch, networkStatus} = useQuery(GET_USER, {
     variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: { [orderBy]: order },
      eventContains:"",
      recordsWhere: {}
    //    //filter: getFilter(),
       
     }
    
  });

  const handleSortRequest = (property) => {
    const newOrderBy = property;
    let newOrder = "DESC";

    if (orderBy === property && order === "DESC") {
      newOrder = "ASC";
    }

    setOrder(newOrder);
    setOrderBy(newOrderBy);
  };
  //const { loading, error, data } = useQuery(GET_USER)
  const handleFilterChange =  (event) => {
    //event.preventDefault()
    const val = event.target.value;
    setFilterState(val)
    refetch({
      displayNameContains: val
      
    })
  
    // setFilterState((oldFilterState) => ({
    //   ...oldFilterState,
    //   [filterName]: val,
    // }));
  };

  // if (error) return <p>Error</p>;
  // if (loading) return <p>Loading</p>;
  /* function getRecord(d){
    const { data } = await refetchRecord({ "recordsWhere": {
      "user": {
        "displayName": d.displayName
      },
      "event": {
        "event": String(eventState)
      }
    }}).catch(err => console.log(err))

    console.log(data)
    return data.records
  } */
  const eventFilter = async (event)=>{   
    const val = event;
    setEventState(val)
    refetch({
      
        eventContains: val
      
    })
    // setEventState(event)
    // console.log(eventState)
    // await refetch({
      
    //       event:"100m"
        
      
    //   })
    //setuserState(data.users.filter(eventData))
  };

  if (error) return <p>Error</p>;
  if (loading &&NetworkStatus.refetch!=networkStatus&&NetworkStatus.setVariables!=networkStatus) return <p>Loading</p>;
  console.log(eventState)
  return (
    <Paper className={classes.root}>
      <Title>Search Athletes</Title>
      
      <SimpleSelect
        name="Search Event"
        list={data ? data.events.map(({ event }) => event): []}
        value={eventState}
        handleChange={(e)=>eventFilter(e.target.value)}
      >
        {" "}
      </SimpleSelect>
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>} 
      <TextField
        id="search"
        label="Search"
        className={classes.textField}
        value={filterState}
        onChange={handleFilterChange}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />

      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && !loading && 
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell
              key="name"
              sortDirection={
                orderBy === "displayName" ? order.toLowerCase() : false
              }
            >
              <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                <TableSortLabel
                  active={orderBy === "displayName"}
                  direction={order.toLowerCase()}
                  onClick={() => handleSortRequest("displayName")}
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
                <TableCell>{n.Age}</TableCell>
                <TableCell>{n.Sport}</TableCell>
                <TableCell>{String(eventState)!="" ? String(eventState):""}</TableCell>
                <TableCell>{n.Records.map(({ record }) => <div key={record}>{record}</div>)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>}
    </Paper>
  );
}

export default withStyles(styles)(UserList);
