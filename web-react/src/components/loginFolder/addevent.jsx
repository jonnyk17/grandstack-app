import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import sportImg from "../../sport.svg";
import Freesolo from "../freesolo";
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const GET_EVENT = gql`
 {
  events{
    event
  }
 }
`
const CREATE_EVENT = gql`
  mutation Mutation($createEventsInput: [EventsCreateInput!]!) {
  createEvents(input: $createEventsInput) {
    events {
      event
    }
  }
}
`
const CONNECT_EVENT = gql`
  mutation Mutation($updateUsersWhere: UserWhere, $updateUsersConnect: UserConnectInput, $updateUsersCreate: UserRelationInput) {
  updateUsers(where: $updateUsersWhere, connect: $updateUsersConnect, create: $updateUsersCreate) {
    users {
      displayName
    }
  }
}
`
 export const AddEvent = ()=> {
  //const [eventState, setEventState] =React.useState("");
  const {loading, data, error} =useQuery(GET_EVENT)
  const [formState, setFormState] = useState({
    event: '',
    record: ''

  });
  const [newEvent] = useMutation(CREATE_EVENT)
  const [connect]=useMutation(CONNECT_EVENT)
  if (error) return <p>Error</p>;
  if(loading) return <p>Loading</p>
  const checkForm = () =>{
    
    if(formState.event!='' && formState.record!='' && !data.events.find((e)=>
    e.event===formState.event
  )){
      newEvent({
        variables:{
          "createEventsInput": [
            {
              "event": formState.event,
              "user": {
                "connect": {
                  "where": {
                    "id": user.sub
                  }
                }
              },
              "record": {
                "create": {
                  "record": formState.record,
                  "user": {
                    "connect": {
                      "where": {
                        "id": user.sub
                      }
                    }
                  }
                },
                "connect": {
                  "where": {
                    "record": formState.record
                  }
                }
              }
            }
          ]
        
        }});
      console.log(formState.record, formState.event, user.sub)
    }
    else if(formState.event!='' && formState.record!='' && data.events.find((e)=>
    e.event===formState.event
  )){
      console.log("OOK")
      connect({
        variables:{
          "updateUsersWhere": {
            "id": user.sub
          },
          "updateUsersConnect": {
            "Event": [
              {
                "where": {
                  "event": formState.event
                }
              }
            ]
          },
          "updateUsersCreate": {
            "Records": [
              {
                "record": formState.record,
                "event": {
                  "connect": {
                    "where": {
                      "event": formState.event
                    }
                  }
                }
              }
            ]
        }
      }});
    }
  }
  const {user, isLoading}=useAuth0();
  if (isLoading) return <p>Loading</p>
  
  
    if (error) return <p>Error</p>;
    if(loading) return <p>Loading</p>
    //data.events.push("Type Event")
    return (
      <div className="base-container" /*ref={this.props.containerRef}*/>
        <div className="header">Add Event</div>
        <div className="content">
          <div className="image">
            <img src={sportImg} />
          </div>
          <div className="form">
          <Freesolo  
            name="Search Event"
            list={data ? data.events.map(({ event }) => event): []}
            
            value={formState.event}
            onChange={(e)=> {
              console.log(e)
                setFormState({
                  ...formState,
                  event: e.target.value
                })}}
              onBlur={(e)=> {
                  console.log(e)
                    setFormState({
                      ...formState,
                      event: e.target.value
                    })}}  
  
            
            // onChange={(e)=>
            //   setFormState({
            //     ...formState,
            //     event: e.target.value
            //   })}
          >
            {" "}
       </Freesolo>
            <div className="form-group">
              <label htmlFor="record">Record</label>
              <input type="text" name="record" 
              placeholder="record"
              value={formState.record}
              onChange={(e)=>
                setFormState({
                  ...formState,
                  record: e.target.value
                })} />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn" onClick={checkForm}> 
            Add
          </button>
        </div>
      </div>
    );
  
}