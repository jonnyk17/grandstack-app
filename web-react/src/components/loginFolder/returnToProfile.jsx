import React from "react";
import sportImg from "../../sport.svg";
import { Link } from 'react-router-dom'
export class ReturnToProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="base-container" ref={this.props.containerRef}>
        <div className="header">Return To Profile</div>
        <div className="content">
          <div className="image">
            <img src={sportImg} />
          </div>
          <div className="form">
          </div>
        </div>
        
        <div className="footer">
        <Link to="/" >
            <button type="button" className="btn">
                Return To Profile
            </button>
        </Link>
        </div>
      </div>
 
    );
  }
}