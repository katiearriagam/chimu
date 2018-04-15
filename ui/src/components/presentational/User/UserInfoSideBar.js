import React, { Component } from 'react';
import mui from 'material-ui';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from 'material-ui/styles';
import UserAvatar from './UserAvatar';
import Button from 'material-ui/Button';
import Chip from 'material-ui/Chip';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import '../../style/style.css';
import star from '../../images/star.png';

import CommunicationEmail from 'react-material-icons/icons/communication/email';


class UserInfoSideBar extends Component {
  render(){
    return(
      <div className="sidebar">
        <UserAvatar/>
        <label className="user-name">Katie Arriaga M.</label>
        <span className="user-rating">
          <label className="user-points">4.8/5.0</label>
          <img className="star" alt="" src={star}/>
        </span>
        <span className="user-contact">
          <a className="user-handle" href="https://github.com/katiearriagam">@katiearriagam</a>
          <IconButton className="IconButton">
            <CommunicationEmail/>
          </IconButton>
        </span>
        <label>Roles</label>
        <Chip label="Basic Chip"/>
        <label>Skills</label>
        <Chip label="Basic Chip"/>
      </div>
    );

  }
}

export default UserInfoSideBar;

