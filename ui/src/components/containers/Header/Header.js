import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'request';
import * as firebase from 'firebase';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';

import '../../style/style.css';

import GitHubLogin from '../../presentational/Header/GitHubLogin';
import Logout from '../../presentational/Header/Logout';
import UserButton from '../../presentational/Header/UserButton';

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
		// Get the access token here
		let jsonObject = {'code': response['code']};
		request.post({
			url: 'http://localhost:8080/chimu/',
			form: jsonObject,
		}, (err, response, body) => {
			if(err){
				console.error("ERROR");
				console.error(err);
			}
			
			// Exchange access token for Firebase credential
			let credential = firebase.auth.GithubAuthProvider.credential(JSON.parse(body)['access_token']);
			
			// Sign in with Firebase and retrieve additional info
			firebase.auth().signInAndRetrieveDataWithCredential(credential).then((result) => {
				// Store new user info
				if (result.additionalUserInfo.isNewUser) {
					var db = firebase.firestore();
					const response = fetch('https://api.github.com/user?access_token='+JSON.parse(body)['access_token']).then((response) => {
						response.json().then((json) => {
							db.collection("Users").doc(result.additionalUserInfo.username).set({
								email: result.user.email,
								public_email: json.email
							})
							.then(() => {
								console.log("Document successfully written!");
							})
							.catch((error) => {
								console.error("Error writing document: ", error);
							});
						});
					}).catch((error) => {
						console.log("Github Fetch Error:", error);
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
			<div className="header">
				<IconButton color="inherit" aria-label="Search">
					<SearchIcon />
				</IconButton>
				<Link to={{ pathname: '/user/' + this.props.username }} style={{ textDecoration: 'none', color: 'inherit' }}>
					<UserButton
						username = {this.props.username}
						photo = {this.props.photo}
					/>
				</Link>
				<Link to={{ pathname: '/notifications'}} style={{ textDecoration: 'none', color: 'inherit' }}>
					<IconButton color="inherit" aria-label="Notification Center">
						<MailIcon />
					</IconButton>
				</Link>
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
							<Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>
								chimu
							</Link>
						</Typography>
						{ headerButtons }
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

export default withStyles(styles)(Header);