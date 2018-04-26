import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import request from 'request';
import * as firebase from 'firebase';

import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';

import '../../style/style.css';

import GitHubLogin from '../../presentational/Header/GitHubLogin';
import Logout from '../../presentational/Header/Logout';
import UserButton from '../../presentational/Header/UserButton';
import ProjectForm from '../ProjectProfile/ProjectForm';

const styles = {
	flex: {
		flex: 1,
	},
};

class Header extends Component {
	createNewProject(newState) {
		var db = firebase.firestore();
		var userRef = db.collection("Users").doc(this.props.username);
		var projectRef = db.collection("Projects").doc(this.props.username).collection("projects").doc(newState.name);
		
		var keywords = newState.keywords ? newState.keywords : [];
		var repo = newState.repo ? newState.repo : null;
		var sdesc = newState.sdesc ? newState.sdesc : null;
		var ldesc = newState.ldesc ? newState.ldesc : null;
		var avatar = newState.avatar ? newState.avatar : null;
		
		db.collection("Projects").doc(this.props.username).collection("projects").doc(newState.name).set({
			keywords: keywords,
			repo: repo,
			avatar: avatar,
			sdesc: sdesc,
			ldesc: ldesc,
			status: false,
			owner: userRef,
			skills: [],
			roles: [],
		}).then(() => {
			console.log("Document successfully written!");
			
			db.collection("Users_Projects").doc(this.props.username + '-' + newState.name).set({
				hasAccepted: true,
				isApproved: true,
				project: projectRef,
				rating: null,
				user: userRef,
			}).catch((error) => {
				console.error("Error writing document: ", error);
			});
			
			var addSkills = newState.skills.slice().filter((e) => {
				return e.isChecked === true
			}).map((item) => {
				return item["label"]
			});
			
			var addRoles = newState.roles.slice().filter((e) => {
				return e.isChecked === true
			}).map((item) => {
				return item["label"]
			});
			
			addSkills.forEach((addSkill) => {
				var skillRef = db.collection("Skills").doc(addSkill);
				
				db.runTransaction((transaction) => {
					return transaction.get(skillRef).then((skill) => {
						console.log("Two");
						var projectsInSkill = skill.data().projects;
						if (!projectsInSkill)
							projectsInSkill = [projectRef];
						else
							projectsInSkill.push(projectRef);
						transaction.update(skillRef, {projects: projectsInSkill});
					});
				}).catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error running transaction: ", error);
				});
				
				db.runTransaction((transaction) => {
					return transaction.get(projectRef).then((project) => {
						console.log("One");
						var skillsInProject = project.data().skills;
						if (!skillsInProject)
							skillsInProject = [skillRef];
						else
							skillsInProject.push(skillRef);
						transaction.update(projectRef, {skills: skillsInProject});
					});
				}).catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error running transaction: ", error);
				});
			});
			
			addRoles.forEach((addRole) => {
				var roleRef = db.collection("Roles").doc(addRole);
				
				db.runTransaction((transaction) => {
					return transaction.get(roleRef).then((role) => {
						console.log("Two");
						var projectsInRole = role.data().projects;
						projectsInRole.push(projectRef);
						transaction.update(roleRef, {projects: projectsInRole});
					});
				}).catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error running transaction: ", error);
				});
				
				db.runTransaction((transaction) => {
					return transaction.get(projectRef).then((project) => {
						console.log("One");
						var rolesInProject = project.data().roles;
						rolesInProject.push(roleRef);
						transaction.update(projectRef, {roles: rolesInProject});
					});
				}).catch(function(error) {
					// The document probably doesn't exist.
					console.error("Error running transaction: ", error);
				});
			});
			
		}).catch((error) => {
			console.error("Error writing document: ", error);
		});
	}
	
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
				<Link to={{ pathname: '/search' }} style={{ textDecoration: 'none', color: 'inherit' }}>
					<IconButton color="inherit" aria-label="Search">
						<SearchIcon />
					</IconButton>
				</Link>
				<ProjectForm
					action="ADD"
					updateInfo={this.createNewProject.bind(this)}
					owner={this.props.username}
				/>
				<Link to={{ pathname: '/notifications'}} style={{ textDecoration: 'none', color: 'inherit' }}>
					<IconButton color="inherit" aria-label="Notification Center">
						<MailIcon />
					</IconButton>
				</Link>
				<Link to={{ pathname: '/user/' + this.props.username }} style={{ textDecoration: 'none', color: 'inherit' }}>
					<UserButton
						username = {this.props.username}
						photo = {this.props.photo}
					/>
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