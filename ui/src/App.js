import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

import UserInfo from './components/containers/UserProfile/UserInfo';
import Header from './components/containers/Header/Header';

import {init as firebaseInit} from './helpers/FirebaseInit';

class App extends Component {
	componentWillMount() {
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
					photo: null,
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
						photo: firebase.auth().currentUser.photoURL,
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

	render() {
		console.log("Hello, this is my console");
		if(this.state) {
			return(
				<div>
					<Header
						isLogged = {this.state.isLogged}
						username = {this.state.username}
						photo = {this.state.photo}
					/>
					<UserInfo/>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default App;

