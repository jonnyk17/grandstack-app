import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import SimpleSelect from './simpleSelect'
//import { makeStyles } from '@material-ui/core/styles'
// import {Grid} from '@material-ui/core'
import {
  Bar,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer,
  BarChart,
} from 'recharts'

import { useQuery, gql } from '@apollo/client'
import Title from './Title'

const GET_DATA_QUERY = gql`
  query User($userName: String!){
   User(userName: $userName) {
        event
      }
    }
  
`

export default function RatingsChart() {
  const theme = useTheme()
  const arr = [
    {event: 'Age'},
    {event: 'Weight'},
    {event: 'Sport'}
] 
  const { loading, error, data } = useQuery(GET_DATA_QUERY, {variables: { userName: "Jonathon"}})
  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>
  console.log(data.User)
  return (
    <>
      <Title>Compare</Title>
      <SimpleSelect name="Select" list={arr}></SimpleSelect>
      
      <SimpleSelect name="Select Event" list={data.User}>
      </SimpleSelect>
      <ResponsiveContainer>
        <BarChart
          //data={data.ratingsCount}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="stars" className={theme.axis} />
          <YAxis className={theme.axis}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
              Count
            </Label>
          </YAxis>
          <Bar dataKey="count" fill={theme.palette.primary.main}></Bar>
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
