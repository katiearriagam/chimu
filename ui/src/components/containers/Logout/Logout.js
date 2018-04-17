import React, { Component } from 'react';
import * as firebase from 'firebase';

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
		let buttonText = 'Log out';
		const attrs = { onClick: this.onBtnClick };
		
		if (className) {
		  attrs.className = className;
		}

		return <button {...attrs}>{ children || buttonText }</button>;
	}
}

export default Logout;