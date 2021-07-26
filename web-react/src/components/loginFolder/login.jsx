import React from "react";
import loginImg from "../../login.svg";
import LoginButton from "./loginbutton"
export class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Login</div>
        <div className="content">
          <div className="image">
            <img src={loginImg} />
          </div>
         
        </div>
        <div className="footer">
          
            <LoginButton/>
        
        </div>
      </div>
    );
  }
}