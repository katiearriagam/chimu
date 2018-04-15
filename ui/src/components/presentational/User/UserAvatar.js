import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../style/style.css'

class UserAvatar extends Component {
  render(){
    return(
    	<div className="avatar bigAvatar">
    		<img className="avatar-image" src="https://lh3.ggpht.com/QcM5ze2mGK0frV4cbdL7otLHts8p_RoC-N2mggz7M6Jv36vZN3B9Y3OmFvJwwLHuUyDc=s360"/>
    	</div>
    );
  }
}

export default UserAvatar;