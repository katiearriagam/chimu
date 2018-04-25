import React, { Component } from 'react';
import * as firebase from 'firebase';

import Button from 'material-ui/Button';

import UserInfoSideBar from '../../presentational/User/UserInfoSideBar';
import UserProjectCard from '../../presentational/User/UserProjectCard';
import UserProfileEditForm from '../UserProfile/UserProfileEditForm';
import InviteUserDialog from '../../presentational/User/InviteUserDialog';

import '../../style/style.css';

class UserInfo extends Component {
	loadData(props) {
		var db = firebase.firestore();
	    const response = fetch('https://api.github.com/users/' + props.match.params.username).then((response) => {
			if (response.status !== 200) {
				this.setState({
					valid: false,
				})
				console.log('Looks like there was a problem. Status Code: ' + response.status);
			} else {
				// Examine the text in the response
				response.json().then((json) => {
					// Get user information from Firebase
					var docRef = db.collection("Users").doc(props.match.params.username);
					docRef.get().then((doc) => {
						if (doc.exists) {
							var info = doc.data();
							this.setState({
								previousProjects: [],
								currentProjects: [],
								skills: [],
								roles: [],
								name: json.name,
								avatar_url: json.avatar_url,
								html_url: json.html_url,
								login: json.login,
								email: info.public_email,
								inviteOpen: false,
								valid: true,
							});
							info.skills.forEach((skill) => {
								skill.get().then((skill) => {
									this.setState(prevState => ({
										skills: [...prevState.skills, {
													label: skill.id,
												}]
									}));
								}).catch((error) => {
									console.log("Error getting document:", error);
								});
							});
							info.roles.forEach((role) => {
								role.get().then((role) => {
									this.setState(prevState => ({
										roles: [...prevState.roles, {
													label: role.id,
												}]
									}));
								}).catch((error) => {
									console.log("Error getting document:", error);
								});
							});
							
							this.loadLoggedInfo(props);
							
							var ratingCant = 0;
							var ratingSum = 0;
							// Get user's projects information
							var projectCol = db.collection("Users_Projects").where("user", "==", docRef).where("isApproved", "==", true).where("hasAccepted", "==", true).get().then((projectInfos) => {
								projectInfos.forEach((projectInfo) => {
									projectInfo.data().project.get().then((project) => {
										// Get completed projects
										if (project.data().status) {
											if (projectInfo.data().rating) {
												ratingSum = ratingSum + projectInfo.data().rating;
												ratingCant = ratingCant + 1;
											}
											project.data().owner.get().then((user) => {
												this.setState(prevState => ({
													previousProjects: [...prevState.previousProjects, {
																		title: project.id,
																		shortDescription: project.data().sdesc,
																		image: project.data().avatar,
																		link: '/project/' + user.id + '/' + project.id,
																	 }]
												}));
											}).catch(function(error) {
												console.log("Error getting documents: ", error);
											});
										// Get ongoing projects
										} else {
											project.data().owner.get().then((user) => {
												this.setState(prevState => ({
													currentProjects: [...prevState.currentProjects, {
																		title: project.id,
																		shortDescription: project.data().sdesc,
																		image: project.data().avatar,
																		link: '/project/' + user.id + '/' + project.id,
																	 }]
												}));
												console.log(this.state.currentProjects);
											}).catch(function(error) {
												console.log("Error getting documents: ", error);
											});
										}
									}).then(() => {
										if (ratingCant === 0) {
											console.log("No ratings");
											this.setState({
												rating: 5,
											});
										} else {
											this.setState({
												rating: ratingSum/ratingCant,
											});
										}
									}).catch(function(error) {
										console.log("Error getting documents: ", error);
									});
								});
							}).catch(function(error) {
								console.log("Error getting documents: ", error);
							});
						} else {
							this.setState({
								valid: false,
							})
							console.log("No such document!");
						}
					}).catch((error) => {
						console.log("Error getting document:", error);
					});
				});
			}
		}).catch((error) => {
			console.log("Github Fetch Error:", error);
		});
	}
	
	loadLoggedInfo(props) {
		var db = firebase.firestore();
		this.setState({
				loggedProjects: [],
			});
		
		if (props.loggedUser) {
			db.collection("Projects").doc(props.loggedUser).collection("projects").get().then((projects) => {
				projects.forEach((project) => {
					this.setState(prevState => ({
						loggedProjects: [...prevState.loggedProjects, {
										label: project.id,
									}]
					}));
				});
			}).catch((error) => {
				console.log("Error getting document:", error);
			});
		}
	}
	
	componentWillReceiveProps (nextProps) {
		if (nextProps.match.params.username !== this.props.match.params.username) {
			this.state = null;
			console.log(nextProps.match.params.username);
			this.loadData(nextProps);
		}
		
		if (nextProps.loggedUser !== this.props.loggedUser) {
			this.loadLoggedInfo(nextProps);
		}
	}
	
  	componentWillMount(){
		this.loadData(this.props);
	}
	
	handleClickOpen = () => {
		this.setState({
			inviteOpen: true,
		})
	}
	
	handleClose = () => {
		this.setState({
			inviteOpen: false,
		})
		console.log("Exit");
	}
	
	handleCloseWInfo = (projectName) => {
		var db = firebase.firestore();
		
		var projectRef = db.collection("Projects").doc(this.props.loggedUser).collection("projects").doc(projectName);
		var userRef = db.collection("Users").doc(this.state.login);
		var userProjectRef = db.collection("Users_Projects").doc(this.state.login + '-' + projectName);
		
		userProjectRef.get().then((doc) => {
			if (!doc.exists) {
				userProjectRef.set({
					hasAccepted: false,
					isApproved: true,
					project: projectRef,
					rating: null,
					user: userRef,
				}).then(() => {
					console.log("Document successfully written!");
					this.setState({
						inviteOpen: false,
					})
					console.log("Exit w info");
				}).catch(function(error) {
					console.error("Error writing document: ", error);
				});
			} else {
				this.setState({
					inviteOpen: false,
				})
				console.log("Exit w info already existing");
			}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}
	
	handlerUpdateUserInfo(newState){
		var db = firebase.firestore();
		
		var userRef = db.collection("Users").doc(this.state.login);
		
		userRef.update({
			public_email: newState.email,
		})
		.then(() => {
			console.log("Document successfully updated!");
			this.setState({
				email: newState.email,
			});
		})
		.catch(function(error) {
			// The document probably doesn't exist.
			console.error("Error updating document: ", error);
		});
		
		// Need to create a delete list, a add list and a display list w/ both
		var oldSkills = this.state.skills.slice().map((item) => {
			return item["label"]
		});
		var oldRoles = this.state.roles.slice().map((item) => {
			return item["label"]
		});
		
		var newSkills = newState.skills.slice().filter((e) => {
			return e.isChecked === true
		}).map((item) => {
			return item["label"]
		});
		
		var updatedSkills = newState.skills.slice().filter((e) => {
			return e.isChecked === true
		}).map((item) => {
			return {label : item["label"]}
		});
		
		var deleteSkills = oldSkills.filter(x => !newSkills.includes(x));
		var addSkills = newSkills.filter(x => !oldSkills.includes(x));
		
		deleteSkills.forEach((deleteSkill) => {
			var skillRef = db.collection("Skills").doc(deleteSkill);
			
			db.runTransaction((transaction) => {
				return transaction.get(skillRef).then((skill) => {
					console.log("Two");
					var usersInSkill = skill.data().users;
					usersInSkill.some((user) => {
						if (user.id === userRef.id) {
							usersInSkill.splice(usersInSkill.indexOf(user),1);
							return true;
						}
					});
					transaction.update(skillRef, {users: usersInSkill});
				});
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error running transaction: ", error);
			});
			
			db.runTransaction((transaction) => {
				return transaction.get(userRef).then((user) => {
					console.log("One");
					var skillsInUser = user.data().skills;
					skillsInUser.some((skill) => {
						if (skill.id === skillRef.id) {
							skillsInUser.splice(skillsInUser.indexOf(skill),1);
							return true;
						}
					});
					transaction.update(userRef, {skills: skillsInUser});
				});
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error running transaction: ", error);
			});
		});
		
		addSkills.forEach((addSkill) => {
			var skillRef = db.collection("Skills").doc(addSkill);
			
			db.runTransaction((transaction) => {
				return transaction.get(skillRef).then((skill) => {
					console.log("Two");
					var usersInSkill = skill.data().users;
					usersInSkill.push(userRef);
					transaction.update(skillRef, {users: usersInSkill});
				});
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error running transaction: ", error);
			});
			
			db.runTransaction((transaction) => {
				return transaction.get(userRef).then((user) => {
					console.log("One");
					var skillsInUser = user.data().skills;
					skillsInUser.push(skillRef);
					transaction.update(userRef, {skills: skillsInUser});
				});
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error running transaction: ", error);
			});
		});
		
		this.setState({
			skills: updatedSkills,
		});
		
		var newRoles = newState.roles.slice().filter((e) => {
			return e.isChecked === true
		}).map((item) => {
			return item["label"]
		});
		
		var updatedRoles = newState.roles.slice().filter((e) => {
			return e.isChecked === true
		}).map((item) => {
			return {label : item["label"]}
		});
		
		var deleteRoles = oldRoles.filter(x => !newRoles.includes(x));
		var addRoles = newRoles.filter(x => !oldRoles.includes(x));
		
		deleteRoles.forEach((deleteRole) => {
			var roleRef = db.collection("Roles").doc(deleteRole);
			
			db.runTransaction((transaction) => {
				return transaction.get(roleRef).then((role) => {
					console.log("Two");
					var usersInRole = role.data().users;
					console.log(usersInRole);
					usersInRole.some((proj) => {
						if (proj.id === userRef.id) {
							usersInRole.splice(usersInRole.indexOf(proj),1);
							return true;
						}
					});
					console.log(usersInRole);
					transaction.update(roleRef, {users: usersInRole});
				});
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error running transaction: ", error);
			});
			
			db.runTransaction((transaction) => {
				return transaction.get(userRef).then((user) => {
					console.log("One");
					var rolesInUser = user.data().roles;
					rolesInUser.some((role) => {
						if (role.id === roleRef.id) {
							rolesInUser.splice(rolesInUser.indexOf(role),1);
							return true;
						}
					});
					transaction.update(userRef, {roles: rolesInUser});
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
					var usersInRole = role.data().users;
					usersInRole.push(userRef);
					transaction.update(roleRef, {users: usersInRole});
				});
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error running transaction: ", error);
			});
			
			db.runTransaction((transaction) => {
				return transaction.get(userRef).then((user) => {
					console.log("One");
					var rolesInUser = user.data().roles;
					rolesInUser.push(roleRef);
					transaction.update(userRef, {roles: rolesInUser});
				});
			}).catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error running transaction: ", error);
			});
		});
		
		this.setState({
			roles: updatedRoles,
		});
		
	}

	render() {
		if (this.state) {
			if (this.state.valid) {
				const editButton = this.props.loggedUser && this.props.loggedUser === this.state.login ? (
					<UserProfileEditForm
						email={this.state.email}
						roles={this.state.roles}
						skills={this.state.skills}
						updateInfo={this.handlerUpdateUserInfo.bind(this)}
					/>
				) : ( null );
				const inviteButton = this.props.loggedUser && this.props.loggedUser !== this.state.login && this.state.loggedProjects ? (
					<div className="invite-button">
						<Button variant="raised" onClick={this.handleClickOpen}>INVITE TO PROJECT</Button>
						<InviteUserDialog
							open={this.state.inviteOpen}
							username={this.state.login}
							projects={this.state.loggedProjects}
							handleClose={this.handleClose.bind(this)}
							handleCloseWInfo={this.handleCloseWInfo.bind(this)}
						/>
					</div>
				) : ( null );
				
				const headerPrevious = this.state.previousProjects.length > 0 ? ("PREVIOUS PROJECTS") : ("");
				const headerCurrent = this.state.currentProjects.length > 0 ? ("CURRENT PROJECTS") : ("");
				return (
					<div className="page-content">
						<div className="sidebar">
							<UserInfoSideBar
								avatar={this.state.avatar_url}
								name={this.state.name}
								rating={this.state.rating}
								githubUrl={this.state.html_url}
								handle={this.state.login}
								email={this.state.email}
								roles={this.state.roles}
								skills={this.state.skills}
							/>
						</div>
						<div className="UserProjects">
							{editButton}
							{inviteButton}
							<div className="currentProjects">
								<h4 className="user-projects-subheader">{headerCurrent}</h4>
								{
					        	this.state.currentProjects.map(data => {
						        	return(
						        		<UserProjectCard 
						        			title={data.title}
						        			shortDescription={data.shortDescription}
						        			image={data.image}
											key={this.state.currentProjects.indexOf(data)}
											link={data.link}
						            	/>
						          	);
						        })}
							</div>
							<div className="previousProjects">
								<h4 className="user-projects-subheader">{headerPrevious}</h4>
								{
						        	this.state.previousProjects.map(data => {
						        	return(
						        		<UserProjectCard 
						        			title={data.title}
						        			shortDescription={data.shortDescription}
						        			image={data.image}
											key={this.state.previousProjects.indexOf(data)}
											link={data.link}
						            	/>
						          	);
						        })}
							</div>
						</div>
					</div>
				);
			} else {
				return <h1>Error 404</h1>;
			}
		} else {
			return null;
		}
	}
}

export default UserInfo;

