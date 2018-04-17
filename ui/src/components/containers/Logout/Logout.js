import React, { Component } from 'react';
import * as firebase from 'firebase';

import Button from 'material-ui/Button';

class Logout extends Component {
	onBtnClick = () => {
		console.log("Attempting to log out...");
		firebase.auth().signOut().then(() => {
			console.log("Succesfully logged out!");
		}).catch((error) => {
			console.log("Error on log out");
			this.props.onFailure(error);
		});
	}
	
	render() {
		let { className, children } = this.props;
		let buttonText = 'Log Out';
		const attrs = { onClick: this.onBtnClick, color: "inherit" };
		
		if (className) {
		  attrs.className = className;
		}

		return <Button {...attrs}>{ children || buttonText }</Button>;
	}
}

export default Logout;