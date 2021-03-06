import { useQuery, useMutation, gql } from "@apollo/client";

import React from "react";
import sportImg from "../../sport.svg";
import SimpleSelect from "../simpleSelect";
import Recordpane from "../recordPane";
import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
const GET_EVENT = gql`
  {
    events {
      event
    }
  }
`;
const CREATE_EVENT = gql`
  mutation Mutation($createEventsInput: [EventsCreateInput!]!) {
    createEvents(input: $createEventsInput) {
      events {
        event
      }
    }
  }
`;
const CONNECT_EVENT = gql`
  mutation Mutation(
    $updateUsersWhere: UserWhere
    $updateUsersConnect: UserConnectInput
    $updateUsersCreate: UserRelationInput
  ) {
    updateUsers(
      where: $updateUsersWhere
      connect: $updateUsersConnect
      create: $updateUsersCreate
    ) {
      users {
        displayName
      }
    }
  }
`;
const DELETE_RECORD = gql`
  mutation Mutation($deleteRecordsWhere: RecordWhere) {
    deleteRecords(where: $deleteRecordsWhere) {
      nodesDeleted
    }
  }
`;
var event = [
  {
    name: "100m",
    type: "sec",
  },
  {
    name: "100m hurdles",
    type: "sec",
  },
  {
    name: "200m",
    type: "sec",
  },
  {
    name: "400m",
    type: "min",
  },
  {
    name: "400m hurdles",
    type: "min",
  },
  {
    name: "800m",
    type: "min",
  },
  {
    name: "1 mile",
    type: "min",
  },
  {
    name: "10k",
    type: "hour",
  },
  {
    name: "5k",
    type: "min",
  },
  {
    name: "Marathon",
    type: "hour",
  },
  {
    name: "Long Jump",
    type: "solid",
  },
  {
    name: "Pole Vault",
    type: "solid",
  },
  {
    name: "High Jump",
    type: "solid",
  },
  {
    name: "Bench Press",
    type: "solid",
  },
  {
    name: "Deadlift",
    type: "solid",
  },
  {
    name: "Pullups",
    type: "solid",
  },
  {
    name: "Squat",
    type: "solid",
  },
  {
    name: "Vertical Jump",
    type: "solid",
  },
  {
    name: "5 mile",
    type: "hour",
  },
  {
    name: "50 m freestyle swim",
    type: "min",
  },
  {
    name: "100 m freestyle swim",
    type: "min",
  },
  {
    name: "200 m freestyle swim",
    type: "min",
  },
  {
    name: "400 m freestyle swim",
    type: "min",
  },
  {
    name: "800 m freestyle swim",
    type: "min",
  },
  {
    name: "1500 m freestyle swim",
    type: "min",
  },
  {
    name: "100 m backstroke swim",
    type: "min",
  },
  {
    name: "200 m backstroke swim",
    type: "min",
  },
  {
    name: "100 m breaststroke swim",
    type: "min",
  },
  {
    name: "200 m breaststroke swim",
    type: "min",
  },
  {
    name: "100 m butterfly swim",
    type: "min",
  },
  {
    name: "200 m butterfly swim",
    type: "min",
  },
];
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const AddEvent = () => {
  const { loading, data, error } = useQuery(GET_EVENT);
  const [formState, setFormState] = useState({
    event: "",
    record: "",
    recordType: "",
  });
  const [snackbarText, setSnackbar] = React.useState("");

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar("");
  };
  const [newEvent] = useMutation(CREATE_EVENT);
  const [deleteRecord] = useMutation(DELETE_RECORD);
  const [connect] = useMutation(CONNECT_EVENT);
  if (error) return <p>Error</p>;
  if (loading) return <p>Loading</p>;
  const checkForm = () => {
    if (
      formState.event != "" &&
      formState.record != "" &&
      formState.recordType != "" &&
      !data.events.find((e) => e.event === formState.event)
    ) {
      newEvent({
        variables: {
          createEventsInput: [
            {
              event: formState.event,
              eventType: formState.recordType,
              user: {
                connect: {
                  where: {
                    id: user.sub,
                  },
                },
              },
              record: {
                create: {
                  record: formState.record,
                  user: {
                    connect: {
                      where: {
                        id: user.sub,
                      },
                    },
                  },
                },
                connect: {
                  where: {
                    record: formState.record,
                  },
                },
              },
            },
          ],
        },
        refetchQueries: [
          {
            query: GET_EVENT,
          },
        ],
      });
      setSnackbar({ severity: "success", message: "Event Added" });
    } else if (
      formState.event != "" &&
      formState.record != "" &&
      formState.recordType != "" &&
      data.events.find((e) => e.event === formState.event)
    ) {
      deleteRecord({
        variables: {
          deleteRecordsWhere: {
            user: {
              id: user.sub,
              Event: {
                event: formState.event,
              },
            },
          },
        },
      });
      connect({
        variables: {
          updateUsersWhere: {
            id: user.sub,
          },
          updateUsersConnect: {
            Event: [
              {
                where: {
                  event: formState.event,
                },
              },
            ],
          },
          updateUsersCreate: {
            Records: [
              {
                record: formState.record,
                event: {
                  connect: {
                    where: {
                      event: formState.event,
                    },
                  },
                },
              },
            ],
          },
        },
      });
      setSnackbar({ severity: "success", message: "Event Added" });
    } else {
      setSnackbar({ severity: "error", message: "Fill All Fields" });
    }
  };
  const { user, isLoading } = useAuth0();
  if (isLoading) return <p>Loading</p>;

  if (error) return <p>Error</p>;
  if (loading) return <p>Loading</p>;
  var eventList = [];
  event.map((e) => eventList.push(e.name));
  return (
    <div className="base-container">
      <div className="header">Add Event</div>
      <div className="content">
        <div className="image">
          <img src={sportImg} />
        </div>
        <div className="form">
          <SimpleSelect
            name="Select"
            list={eventList}
            handleChange={(e) =>
              setFormState({
                ...formState,
                event: e.target.value,
              })
            }
          />
          <div className="form-group">
            <Recordpane
              type={event.find((e) => {
                if (e.name === formState.event) {
                  return e.type;
                }
              })}
              formState={formState}
              setFormState={setFormState}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn" onClick={checkForm}>
          Add
        </button>
        <Snackbar
          open={snackbarText != ""}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={snackbarText.severity}>
            {snackbarText.message}
          </Alert>
        </Snackbar>
      </div>
    </div>
  );
};
