import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase';

import request from 'request';

import GitHubLogin from './components/containers/GitHub/';
import Logout from './components/containers/Logout/';
import UserInfoSideBar from './components/presentational/User/UserInfoSideBar';

import GitHub from "github-api";
import {init as firebaseInit} from './helpers/FirebaseInit';

class App extends Component {
  /*
	constructor(props) {
		super(props);
		this.state = {
			isLogged: false,
			username: null,
		}
		firebaseInit();
	}
	
	componentDidMount() {
		// Activate auth state listener
		this.removeFirebaseListener = firebase.auth().onAuthStateChanged((user) => {
			if (user) {
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
			var docRef = db.collection("Users").doc(firebase.auth().currentUser.email);
			docRef.get().then((doc) => {
				if (doc.exists) {
					this.setState({
						isLogged: true,
						username: doc.data().username,
					});
					console.log("Info loaded!");
				} else {
					// doc.data() will be undefined in this case
					console.log("No such document!");
				}
			}).catch((error) => {
				console.log("Error getting document:", error);
			});
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
					db.collection("Users").doc(result.user.email).set({
						username: result.additionalUserInfo.username
					})
					.then(() => {
						console.log("Document successfully written!");
						// Load logged user info
						this.loadUserInfo();
					})
					.catch((error) => {
						console.error("Error writing document: ", error);
					});
				} else {
					// Load logged user info
					this.loadUserInfo();
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
	}
	*/

	state = {
	    skills: [
	    { key: 0, label: 'React' },
	    { key: 1, label: 'React' },
	    { key: 3, label: 'React' },
	    { key: 5, label: 'React' },
	    { key: 4, label: 'React' },
	],
		roles: [
	    { key: 0, label: 'Designer' },
	    { key: 1, label: 'Front-end developer' },
	    { key: 3, label: 'PM' }
	]
	};

	render() {
		console.log("Hello, this is my console");

		return (
			<div id="w">
				<div id="example">
					<UserInfoSideBar 
						avatar="https://avatars0.githubusercontent.com/u/8510219?s=400&v=4"
						name="Oscar Gonzalez"
						rating="4.9"
						githubUrl="https://github.com/osdagoso"
						handle="osdagoso"
						email="osdagoso@mail.com"
						roles={this.state.roles}
						skills={this.state.skills}
					/>
				</div>
			</div>
		);
	}
}

				/*	<h1>Simple Github API Webapp</h1>
					<p>Enter a single Github username below and click the button to display profile info via JSON.</p>
					<input type="text" name="ghusername" id="ghusername" placeholder="Github username..."/>
					<a href="#" id="ghsubmitbtn">Pull User Data</a>
					<div id="ghapidata" className="clearfix"></div>*/

/*
$(document).ready(function () {
  console.log("hello load");



  function requestJSON(url, callback) {
	  $.ajax({
		url: url,
		complete: function(xhr) {
		  callback.call(null, xhr.responseJSON);
		}
	  });
	}

	$('#ghsubmitbtn').on('click', function(e){
	  console.log("hello world");
	  e.preventDefault();
	  $('#ghapidata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');
	  
	  var username = $('#ghusername').val();
	  var requri   = 'https://api.github.com/users/'+username;
	  console.log(username);
	  var repouri  = 'https://api.github.com/users/'+username+'/repos';
	  
	  requestJSON(requri, function(json) {
		if(json.message == "Not Found" || username == '') {
		  $('#ghapidata').html("<h2>No User Info Found</h2>");
		}
		
		else {
		  // else we have a user and we display their info
		  var fullname   = json.name;
		  var username   = json.login;
		  var aviurl     = json.avatar_url;
		  var profileurl = json.html_url;
		  var location   = json.location;
		  var followersnum = json.followers;
		  var followingnum = json.following;
		  var reposnum     = json.public_repos;
		  
		  if(fullname == undefined) { fullname = username; }

		  var outhtml = '<h2>'+fullname+' <span class="smallname">(@<a href="'+profileurl+'" target="_blank">'+username+'</a>)</span></h2>';
		  outhtml = outhtml + '<div class="ghcontent"><div class="avi"><a href="'+profileurl+'" target="_blank"><img src="'+aviurl+'" width="80" height="80" alt="'+username+'"></a></div>';
		  outhtml = outhtml + '<p>Followers: '+followersnum+' - Following: '+followingnum+'<br>Repos: '+reposnum+'</p></div>';
		  outhtml = outhtml + '<div class="repolist clearfix">';
				  var repositories;
		  $.getJSON(repouri, function(json){
			repositories = json;   
			outputPageContent();	
		  });          
		  
		  function outputPageContent() {
			if(repositories.length == 0) { outhtml = outhtml + '<p>No repos!</p></div>'; }
			else {
			  outhtml = outhtml + '<p><strong>Repos List:</strong></p> <ul>';
			  $.each(repositories, function(index) {
				outhtml = outhtml + '<li><a href="'+repositories[index].html_url+'" target="_blank">'+repositories[index].name + '</a></li>';
			  });
			  outhtml = outhtml + '</ul></div>'; 
			}
			$('#ghapidata').html(outhtml);
		  } // end outputPageContent()
		} // end else statement
	  }); // end requestJSON Ajax call
	}); // end click event handler
});
*/
export default App;

