import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton';
import CommunicationEmail from 'react-material-icons/icons/communication/email';

import '../../style/style.css';
import star from '../../images/star.png';

import UserAvatar from './UserAvatar';


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
	  
	const rating = this.props.rating != null ? (
		<label className="user-points">{parseFloat(this.props.rating).toFixed(1)}/5.0</label>
	) : (<label className="user-points"></label>);

    return(
      <div className="sidebar">
        <UserAvatar image={this.props.avatar}/>
        <label className="user-name">{this.props.name}</label>
        <span className="user-rating">
			{rating}
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
               key={this.props.roles.indexOf(data)}
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
               key={this.props.skills.indexOf(data)}
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

