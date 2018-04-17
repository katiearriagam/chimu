import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

import request from 'request';

import UserInfo from './components/containers/UserProfile/UserInfo';
/*
import GitHubLogin from './components/containers/GitHub/';
import Logout from './components/containers/Logout/';
*/

import GitHub from "github-api";
import {init as firebaseInit} from './helpers/FirebaseInit';

class App extends Component {
  /*
	constructor(props) {
		super(props);
	}
	
	componentDidMount() {
		firebaseInit();
		// Activate auth state listener
		this.removeFirebaseListener = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.loadUserInfo();
				console.log("It's aliiiiive");
			} else {
				this.setState({
					isLogged: false,
					username: null,
				});
				console.log("Quite dead");
			}
		});
	}

	componentWillUnmount() {
		// Remove auth state listener
		this.removeFirebaseListener();
	}
	
	loadUserInfo() {
		var db = firebase.firestore();
		if (firebase.auth().currentUser) {
			// Get user information from Firebase
			var docRef = db.collection("Users").where("email", "==", firebase.auth().currentUser.email);
			docRef.get().then((queryRes) => {
				queryRes.forEach((doc) => {
					this.setState({
						isLogged: true,
						username: doc.id,
					});
					console.log("Info loaded!");
				});
			}).catch((error) => {
				console.log("Error getting document:", error);
			});
		} else {
			console.log("No session found");
		}
	}

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
		if (this.state) {
			console.log("Hello, this is my console");
			if (!this.state.isLogged) {
				return (
					<div id="w">
						<div id="example">
							<GitHubLogin 
								clientId="9b6d887428aaab26ce5b"
								redirectUri="http://localhost:3000/oauthcb"
								onSuccess={this.onSuccess.bind(this)}
								onFailure={this.onFailure}
							/>
						</div>
					</div>
				);
			}
			return (
				<div id="w">
					<div id="example">
						<Logout
							onFailure={this.onFailure}
						/>
					</div>
					<h2>{ this.state.username }</h2>
				</div>
			);
		} else {
			return null;
		}
	}
	*/

	render() {
		console.log("Hello, this is my console");
		return(
			<div>
				<UserInfo/>
			</div>
		);
	}
}

export default App;

