import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { Grid } from '@material-ui/core'
//import { useQuery, gql } from '@apollo/client'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
})

/*const GET_COUNT_QUERY = gql`
  {
    userCount
  }
`*/

export default function Deposits() {
  const classes = useStyles()

  //const { loading, error, data } = useQuery(GET_COUNT_QUERY)
  //if (error) return <p>Error</p>
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
