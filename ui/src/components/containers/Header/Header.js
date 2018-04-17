import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import request from 'request';
import * as firebase from 'firebase';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';

import '../../style/style.css';

import GitHubLogin from '../GitHub/';
import Logout from '../Logout/';

const styles = {
	flex: {
		flex: 1,
	},
};

class Header extends Component {
	onFailure(response) {
		console.error(response);
	}
	onSuccess(response) {
		console.log(firebase.auth().currentUser);
		// Get the access token here
		console.log("code -> " + response['code']);
		let jsonObject = {'code': response['code']};
		request.post({
			url: 'http://localhost:8080/chimu/',
			form: jsonObject,
		}, (err, response, body) => {
			if(err){
				console.error("ERROR");
				console.error(err);
			}
			console.log(JSON.parse(body)['access_token']);
			
			// Exchange access token for Firebase credential
			let credential = firebase.auth.GithubAuthProvider.credential(JSON.parse(body)['access_token']);
			console.log(credential);
			
			// Sign in with Firebase and retrieve additional info
			firebase.auth().signInAndRetrieveDataWithCredential(credential).then((result) => {
				var db = firebase.firestore();
				// Store new user info
				if (result.additionalUserInfo.isNewUser) {
					db.collection("Users").doc(result.additionalUserInfo.username).set({
						email: result.user.email
					})
					.then(() => {
						console.log("Document successfully written!");
					})
					.catch((error) => {
						console.error("Error writing document: ", error);
					});
				} 
			}).catch((error) => {
				// Handle Errors here.
				let errorCode = error.code;
				console.log(errorCode);
				let errorMessage = error.message;
				console.log(errorMessage);
				// The email of the user's account used.
				let email = error.email;
				console.log(email);	
			});
		});
	}
	
	render() {
		const { classes } = this.props;
		const headerButtons = this.props.isLogged ? (
			<div>
				<IconButton color="inherit" aria-label="Search">
					<SearchIcon />
				</IconButton>
				<Button color="inherit">{this.props.username}</Button>
				<IconButton color="inherit" aria-label="Notification Center">
					<Badge badgeContent={1} color="secondary">
						<MailIcon />
					</Badge>
				</IconButton>
				<Logout
					onFailure={this.onFailure}
				/>
			</div>
		) : (
			<GitHubLogin 
				clientId="9b6d887428aaab26ce5b"
				redirectUri="http://localhost:3000/oauthcb"
				onSuccess={this.onSuccess.bind(this)}
				onFailure={this.onFailure}
			/>
		);
		
		return(
			<div className="header">
				<AppBar className="header-content" position="static">
					<Toolbar>
						<Typography variant="title" color="inherit" className={classes.flex}>
							chimu
						</Typography>
						{ headerButtons }
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(Header);