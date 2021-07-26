//import { useMutation, gql } from '@apollo/client'
import React from "react";
import loginImg from "../../login.svg";

export class Register extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Register</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
          <div className="form">
           
            <div className="form-group">
              <label htmlFor="diaplayname">Display Name</label>
              <input type="text" name="displayname" placeholder="displayname" />
            </div>
            <div className="form-group">
              <label htmlFor="sport">Sport</label>
              <input type="text" name="sport" placeholder="sport" />
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="text" name="age" placeholder="age" />
            </div>
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input type="text" name="height" placeholder="height" />
            </div>
            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <input type="text" name="weight" placeholder="weight" />
            </div>
          </div>
        </div>
        <div className="footer">
          <button type="button" className="btn">
            Register
          </button>
        </div>
      </div>
    );
  }
}