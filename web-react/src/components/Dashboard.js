import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import RatingsChart from './RatingsChart'
import Profile from './profile'
import UserEvents from './userEvents'
export default function Dashboard() {
  const theme = useTheme()

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 500,
    },
    fixedHeightProfile: {
      height: 150,
    }
  }))
  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
  const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeightProfile)

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Profile */}
        <Grid item xs={12} md={12} lg={12}>
          <Paper className={fixedHeightPaper2}>
            <Profile />
          </Paper>
        </Grid>
        {/* Ratings Chart */}
        <Grid item xs={12} md={8} lg={7}>
          <Paper className={fixedHeightPaper}>
            <RatingsChart />
          </Paper>
        </Grid>
        {/* Recent Reviews */}
        <Grid item xs={12} md={8} lg={5}>
          <Paper className={classes.paper}>
            <UserEvents />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
