//PROFILE PAGE
import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { Grid } from '@material-ui/core'
import { useQuery, gql } from '@apollo/client'
import { useAuth0 } from '@auth0/auth0-react'
const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
})

export const GET_COUNT_QUERY = gql`
  query Query($usersWhere: UserWhere) {

  users(where: $usersWhere) {
    displayName
    Sport
    Age
    Height
    Weight
  }
}
`

export default function Deposits() {
  const classes = useStyles()
  const {isLoading, user}=useAuth0();
  
  const { loading, error, data } = useQuery(GET_COUNT_QUERY, { skip: isLoading, variables:{
    "usersWhere": {
      "id": user.sub
    
    }
  }})


    
    
    if(data.users.length !== 0){
    if (error) return <p>Error</p>
    if (loading) return <p>Loading</p>
    // while(data.users.length===0){
    //   refetch()
    // }
    console.log(data)
    return (
      <React.Fragment>
        <Title>{data.users[0].displayName}</Title>
        <Grid  container justify="flex-start" spacing={4}>
          <Grid item>
            <Typography component="p" variant="h6">
              Age: {data.users[0].Age}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" variant="h6">
              Height: {data.users[0].Height}
            </Typography>
          </Grid>
            
        </Grid>
        <Grid container justify="flex-start" spacing={4}>
          <Grid item>
            <Typography component="p" variant="h6">
              Sport: {data.users[0].Sport}
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" variant="h6">
              Weight: {data.users[0].Weight}
            </Typography>
          </Grid>
        
        </Grid>
        <div>
          <Link to="/users" className={classes.navLink}>
            View users
          </Link>
        </div>
      </React.Fragment>
    )
  }
  else{
    return (
      <React.Fragment>
        <Title>Profile</Title>
        <Grid  container justify="flex-start" spacing={4}>
          <Grid item>
            <Typography component="p" variant="h6">
              Age: 
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" variant="h6">
              Height: 
            </Typography>
          </Grid>
            <Grid item>
            <Typography component="p" variant="h6">
              Events:
            </Typography>
          </Grid>
          
        </Grid>
        <Grid container justify="flex-start" spacing={4}>
          <Grid item>
            <Typography component="p" variant="h6">
              Sport: 
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="p" variant="h6">
              Weight: 
            </Typography>
          </Grid>
        
        </Grid>
        <div>
          <Link to="/users" className={classes.navLink}>
            View users
          </Link>
        </div>
      </React.Fragment>
    )
  }
}
