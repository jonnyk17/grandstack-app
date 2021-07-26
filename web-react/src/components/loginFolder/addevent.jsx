import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import React from "react";
import sportImg from "../../sport.svg";
import Freesolo from "../freesolo";
const GET_EVENT = gql`
 {
  events{
    event
  }
 }
`

 export const AddEvent = ()=> {
  const [eventState, setEventState] =React.useState("");
  const {loading, data, error} =useQuery(GET_EVENT)


  const eventFilter = async (event)=>{   
    const val = event;
    setEventState(val)

  };
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
            value={eventState}
            handleChange={(e)=>eventFilter(e.target.value)}
          >
            {" "}
       </Freesolo>
            <div className="form-group">
              <label htmlFor="record">Record</label>
              <input type="text" name="record" placeholder="record" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Add
          </button>
        </div>
      </div>
    );
  
}