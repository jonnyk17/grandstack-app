import React from "react";
import SimpleSelect from "./simpleSelect";
import Chart from "./Chart.js";
import {
  ResponsiveContainer,

} from "recharts";

import { useAuth0 } from "@auth0/auth0-react";
import { useQuery, gql } from "@apollo/client";
import Title from "./Title";

const GET_DATA_QUERY = gql`
  query Query($usersWhere: UserWhere) {
    users(where: $usersWhere) {
      displayName
      Age
      Sport
      Event {
        event
        eventType
        record {
          record
        }
      }
    }
  }
`;
const GET_AVG_DATA = gql`
  query Query($recordsWhere: RecordWhere) {
  records(where: $recordsWhere) {
    record
  }
}
`
export default function RatingsChart() {
  const [filterState, setFilterState] = React.useState("");
  const [eventState, setEventState] = React.useState("");

  const arr = ["Age", "Sport"];
  const { user } = useAuth0();

  const { loading, error, data } = useQuery(GET_DATA_QUERY, {
    variables: { usersWhere: { id: user.sub } },
  });
  const { data: data1, loading: loading1, error: error1, refetch } = useQuery(GET_AVG_DATA);
  const arrEvent = [];
  const event_type = [];

  if (error || error1) return <p>Error</p>;
  if (loading || loading1) return <p>Loading</p>;
  const getData = () => {
    const type = event_type.find((e) => {
      if (e[0] === eventState)
        return e[1]
    }
    )

    var recState = ''
    if (type[1] === 'solid' || type[1] === 'sec') {
      recState = ((data.users[0].Event.find((e) => {
        if (e.event === eventState) {
          return e.record.record
        }
      }
      )))

      return Number(recState.record.record)
    }
    else if (type[1] === 'min') {
      recState = ((data.users[0].Event.find((e) => {
        if (e.event === eventState) {
          return e.record.record
        }
      }
      )))
      const arr = recState.record.record.split(":")

      return Number(arr[0] + '.' + arr[1])
    }
    else if (type[1] === 'hour') {
      recState = ((data.users[0].Event.find((e) => {
        if (e.event === eventState) {
          return e.record.record
        }
      }
      )))
      const arr = recState.record.record.split(":")
      const temp = Number(arr[1] * 60)
      const temp2 = arr[0] + '.' + temp.toString() + arr[2]
      return Number(temp2)
    }

  }
  const avg = (data1) => {
    var total = 0
    const type = event_type.find((e) => {
      if (e[0] === eventState)
        return e[1]
    }
    )

    if (type[1] === 'solid' || type[1] === 'sec') {

      const arr = data1.records.map(e => Number(e.record))

      for (var i = 0; i < arr.length; i++) {
        total += arr[i]
      }

      return total / arr.length
    }
    else if (type[1] === 'min') {
      var temp = []

      for (var k = 0; k < data1.records.length; k++) {

        var tempArr = data1.records[k].record.split(":")
        temp.push(Number(tempArr[0] + "." + tempArr[1]))
      }
      for (var j = 0; j < temp.length; j++) {
        total += temp[j]
      }
      return total / temp.length
    }
    else if (type[1] === 'hour') {
      var temp2 = ''
      temp = []
      for (k = 0; k < data1.records.length; k++) {
        tempArr = data1.records[k].record.split(":")
        temp2 = Number(tempArr[1]) * 60
        temp.push(Number(tempArr[0] + '.' + temp2.toString() + tempArr[2]))
      }
      for (j = 0; j < temp.length; j++) {
        total += temp[j]
      }
      return total / temp.length
    }
  }

  data.users[0].Event.map((row) => arrEvent.push(row.event));
  data.users[0].Event.map((row) => event_type.push([row.event, row.eventType]))
  return (
    <>
      <Title>Compare</Title>
      <SimpleSelect
        name="Select"
        list={arr}
        value={filterState}
        handleChange={(e) => {
          var filterType = e.target.value
          if (filterType !== "") refetch({
            recordsWhere: {
              event: {
                event: eventState
              },
              user: {
                [filterType]: data.users[0][filterType]
              }

            }
          })
          setFilterState(filterType)
        }}
      ></SimpleSelect>

      <SimpleSelect
        name="Select Event"
        list={arrEvent}
        value={eventState}
        handleChange={(e) => {
          var filterType = filterState
          if (filterType !== "") refetch({
            recordsWhere: {
              event: {
                event: e.target.value
              },
              user: {
                [filterType]: data.users[0][filterType]
              }

            }
          })

          setEventState(e.target.value)
        }}
      ></SimpleSelect>
      <ResponsiveContainer>
        <Chart
          chartData={{
            labels: [
              "Your Record",
              "Average of Players"
            ],
            datasets: [
              {
                label: "Average Record",
                data: (eventState != '' && filterState != '' ? [getData(),
                avg(data1)] : [0, 0]),

                backgroundColor: [
                  "rgba(255, 99, 132, 0.6)",
                  "rgba(54, 162, 235, 0.6)"

                ],
              },
            ],
          }}
        />
      </ResponsiveContainer>
    </>
  );
}
