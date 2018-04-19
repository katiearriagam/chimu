import React, { Component } from 'react';
import '../../style/style.css'

class UserAvatar extends Component {
  	render(){
    	return(
    		<div className="avatar bigAvatar">
    			<img className="avatar-image" src={this.props.image} alt="avatar"/>
    		</div>
    	);
  	}
}

export default UserAvatar;