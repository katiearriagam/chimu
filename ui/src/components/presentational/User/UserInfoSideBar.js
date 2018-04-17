import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import UserAvatar from './UserAvatar';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import '../../style/style.css';
import star from '../../images/star.png';

import CommunicationEmail from 'react-material-icons/icons/communication/email';


class UserInfoSideBar extends Component {   
  constructor(props) {
    // Required to call original constructor
    super(props);
    this.sendEmail = this.sendEmail.bind(this);
  } 

  sendEmail(){
    window.location.href = "mailto:" + this.props.email;
  }

  render(){
    const email = this.props.email != null ? (
      <span onClick={this.sendEmail}>
        <IconButton className="IconButton">
          <CommunicationEmail/>
        </IconButton>
      </span>
      ) : (<span></span>);

    return(
      <div className="sidebar">
        <UserAvatar image={this.props.avatar}/>
        <label className="user-name">{this.props.name}</label>
        <span className="user-rating">
          <label className="user-points">{this.props.rating}/5.0</label>
          <img className="star" alt="" src={star}/>
        </span>
        <span className="user-contact">
          <a className="user-handle" href={this.props.githubUrl}>@{this.props.handle}</a>
          {email}
        </span>
        <label className="user-roles">Roles</label>
        <div className="chip-div">
        {
          this.props.roles.map(data => {
          return(
            <Chip className="Chip"
               key={data.key}
               label={data.label}
            />
          );
        })}
        </div>
        <label className="user-skills">Skills</label>
        <div className="chip-div">
        {
          this.props.skills.map(data => {
          return(
            <Chip className="Chip"
               key={data.key}
               label={data.label}
            />
          );
        })}
        </div>
      </div>
    );

  }
}

export default UserInfoSideBar;

