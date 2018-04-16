import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import '../../style/style.css'

class UserAvatar extends Component {
	constructor(props) {
    	// Required to call original constructor
    	super(props);
  	} 
  	render(){
    	return(
    		<div className="avatar bigAvatar">
    			<img className="avatar-image" src={this.props.image}/>
    		</div>
    	);
  	}
}

export default UserAvatar;