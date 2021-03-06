import React, { Component } from 'react';
import * as firebase from 'firebase';
import { withRouter } from 'react-router';

import ProjectInfoSideBar from '../../presentational/Project/ProjectInfoSideBar';
import ProjectDetails from '../../presentational/Project/ProjectDetails';
import ProjectJoin from '../../presentational/Project/ProjectJoin';
import ProjectLeave from '../../presentational/Project/ProjectLeave';

import '../../style/style.css';


class ProjectInfo extends Component {

	constructor(props) {
        super(props)
        this.handlerUpdateProjectInfo = this.handlerUpdateProjectInfo.bind(this);
    }
	
	deleteProject() {
		var db = firebase.firestore();
		
		var skillRefs = [];
		var roleRefs = [];
		
		this.state.skills.forEach((skill) => {
			skillRefs.push(db.collection("Skills").doc(skill.label));
		});
		
		this.state.roles.forEach((role) => {
			roleRefs.push(db.collection("Roles").doc(role.label));
		});
		
		var projectRef = db.collection("Projects").doc(this.state.owner).collection("projects").doc(this.state.name);
		
		// Eliminate docs in Users_Projects
		db.collection("Users_Projects").where("project", "==", projectRef).get().then((projectUsers) => {
			projectUsers.forEach((projectUser) => {
				projectUser.ref.delete();
			});
		}).catch((error) => {
			console.log("Error getting documents: ", error);
		});
		
		// Eliminate references in Skill docs
		skillRefs.forEach((skillRef) => {
			skillRef.get().then((skill) => {
				var projectsInSkill = skill.data().projects;
				projectsInSkill.some((project) => {
					if (project.id === projectRef.id) {
						projectsInSkill.splice(projectsInSkill.indexOf(project), 1);
						return true;
					}
					return false;
				});
				skillRef.update({
					projects: projectsInSkill,
				})
			});
		});
		
		// Eliminate references in Role docs
		roleRefs.forEach((roleRef) => {
			roleRef.get().then((role) => {
				var projectsInRole = role.data().projects;
				projectsInRole.some((project) => {
					if (project.id === projectRef.id) {
						projectsInRole.splice(projectsInRole.indexOf(project), 1);
						return true;
					}
					return false;
				});
				roleRef.update({
					projects: projectsInRole,
				})
			});
		});
		
		// Eliminate project doc
		projectRef.delete().then(() => {
			this.props.history.push('/user/' + this.props.loggedUser);
		}).catch((error) => {
			console.log("Error deleting document: ", error);
		});
		
	}
	
	deleteMember(username) {
		var db = firebase.firestore();
		var userProjectRef = db.collection("Users_Projects").doc(username + '-' + this.state.name);
		userProjectRef.delete().then(() => {
			console.log("Document successfully deleted!");
			var updatedMembers = this.state.members.slice();
			updatedMembers.some((member) => {
				if (member.username === username) {
					updatedMembers.splice(updatedMembers.indexOf(member), 1);
					return true;
				}
				return false;
			});
			this.setState({
				members: updatedMembers,
			})
		}).catch((error) => {
		  console.error("Error removing document: ", error);
		});
	}
	
	changeProjectStatus(handleClickOpen) {
		var db = firebase.firestore();
		db.collection("Projects").doc(this.state.owner).collection("projects").doc(this.state.name).update({
			status: !this.state.status,
		}).then(() => {
			console.log("Document successfully updated!");
			if (!this.state.status)
				handleClickOpen();
			this.setState({
				status: !this.state.status,
			});
		}).catch(function(error) {
			// The document probably doesn't exist.
			console.error("Error updating document: ", error);
		});
	}

	updateRatings(newRatings, closeFunc) {
		var db = firebase.firestore();
		var userRef = null;
		
		newRatings.forEach((newRating) => {
			userRef = db.collection("Users").doc(newRating.username);
			db.collection("Users_Projects").doc(userRef.id + '-' + this.props.match.params.project).update({
				rating: newRating.rating
			})
			.then(() => {
				console.log("Document successfully updated!");
				closeFunc();
			})
			.catch(function(error) {
				// The document probably doesn't exist.
				console.error("Error updating document: ", error);
			});
		});
	}
	
  	componentDidMount(){
		var db = firebase.firestore();
		// Get project information from Firebase
		var docRef = db.collection("Projects").doc(this.props.match.params.username).collection("projects").doc(this.props.match.params.project);
		docRef.get().then((doc) => {
			if (doc.exists) {
				var info = doc.data();
				this.setState({
					keys: info.keywords,
					name: doc.id,
					status: info.status,
					repo_url: info.repo,
					owner: this.props.match.params.username,
					avatar_url: info.avatar,
					sdesc: info.sdesc,
					valid: true,
					skills: [],
					roles: [],
					longDescription: info.ldesc,
					members: []
				});
				
				db.collection("Users_Projects").doc(this.props.loggedUser + '-' + doc.id).get().then((loggedFile) => {
					if(loggedFile.exists) {
						this.setState({
							isMember: true,
						})
					} else {
						this.setState({
							isMember: false,
						})
					}
				}).catch(function(error) {
					console.log("Error getting document: ", error);
				});
				
				db.collection("Users_Projects").where("project", "==", docRef).where("isApproved", "==", true).where("hasAccepted", "==", true).get().then((projectInfos) => {
					console.log(projectInfos);
					projectInfos.forEach((projectInfo) => {
						projectInfo.data().user.get().then((user) => {
							const response = fetch('https://api.github.com/users/' + user.id).then((response) => {
								if (response.status === 200) {
									response.json().then((json) => {
										this.setState(prevState => ({
											members: [...prevState.members, {
														username: user.id,
														avatar: json.avatar_url,
													}]
										}));
									});
								}
							}).catch((error) => {
								console.log("Github Fetch Error:", error);
							});
						}).catch(function(error) {
							console.log("Error getting documents: ", error);
						});
					});
				}).catch(function(error) {
					console.log("Error getting documents: ", error);
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
			} else {
				this.setState({
					valid: false,
				})
				console.log("No such document!");
			}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}
	
	handlerJoinProject() {
		var db = firebase.firestore();
		
		var projectRef = db.collection("Projects").doc(this.state.owner).collection("projects").doc(this.state.name);
		var userRef = db.collection("Users").doc(this.props.loggedUser);
		
		this.setState({
			isMember: true,
		})
		
		db.collection("Users_Projects").doc(this.props.loggedUser + '-' + this.state.name).set({
			hasAccepted: true,
			isApproved: false,
			project: projectRef,
			rating: null,
			user: userRef,
		}).then(() => {
			console.log("Document successfully written!");
		}).catch(function(error) {
			console.error("Error writing document: ", error);
		});
	}
	
	handlerLeaveProject() {
		var db = firebase.firestore();
		
		var updatedMembers = this.state.members;
		
		updatedMembers.some((member) => {
			if (this.props.loggedUser === member.username) {
				updatedMembers.splice(updatedMembers.indexOf(member), 1);
				return true;
			}
			return false;
		});
		
		this.setState({
			members: updatedMembers,
			isMember: false,
		});
		
		db.collection("Users_Projects").doc(this.props.loggedUser + '-' + this.state.name).delete().then(() => {
			console.log("Document successfully deleted!");
		}).catch(function(error) {
			console.error("Error deleting document: ", error);
		});
	}

	handlerUpdateProjectInfo(newState){
		var db = firebase.firestore();
		
		var projectRef = db.collection("Projects").doc(this.state.owner).collection("projects").doc(this.state.name);
		
		projectRef.update({
			keywords: newState.keywords,
			repo: newState.repo,
			sdesc: newState.sdesc,
			ldesc: newState.ldesc,
			avatar: newState.avatar,
		})
		.then(() => {
			console.log("Document successfully updated!");
			this.setState({
				keys: newState.keywords,
				avatar_url: newState.avatar,
				repo_url: newState.repo,
				sdesc: newState.sdesc,
				longDescription: newState.ldesc,
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
					var projectsInSkill = skill.data().projects;
					projectsInSkill.some((proj) => {
						if (proj.id === projectRef.id) {
							projectsInSkill.splice(projectsInSkill.indexOf(proj),1);
							return true;
						}
					});
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
					skillsInProject.some((skill) => {
						if (skill.id === skillRef.id) {
							skillsInProject.splice(skillsInProject.indexOf(skill),1);
							return true;
						}
					});
					transaction.update(projectRef, {skills: skillsInProject});
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
					var projectsInSkill = skill.data().projects;
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
					skillsInProject.push(skillRef);
					transaction.update(projectRef, {skills: skillsInProject});
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
					var projectsInRole = role.data().projects;
					console.log(projectsInRole);
					projectsInRole.some((proj) => {
						if (proj.id === projectRef.id) {
							projectsInRole.splice(projectsInRole.indexOf(proj),1);
							return true;
						}
					});
					console.log(projectsInRole);
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
					rolesInProject.some((role) => {
						if (role.id === roleRef.id) {
							rolesInProject.splice(rolesInProject.indexOf(role),1);
							return true;
						}
					});
					transaction.update(projectRef, {roles: rolesInProject});
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
		
		this.setState({
			roles: updatedRoles,
		});
		
	}

	render() {
		if (this.state) {
			if (this.state.valid) {
				return (
					<div className="page-content">
						<div className="sidebar">
							<ProjectInfoSideBar 
								avatar={this.state.avatar_url}
								name={this.state.name}
								status={this.state.status}
								repo={this.state.repo_url}
								owner={this.state.owner}
								sdesc={this.state.sdesc}
								keys={this.state.keys}
								ldesc={this.state.longDescription}
								skills={this.state.skills}
								roles={this.state.roles}
								updateInfo={this.handlerUpdateProjectInfo.bind(this)}
								members={this.state.members}
								loggedUser={this.props.loggedUser}
								updateRatings={this.updateRatings.bind(this)}
								changeProjectStatus={this.changeProjectStatus.bind(this)}
								deleteProject={this.deleteProject.bind(this)}
							/>
						</div>
						<div className="ProjectDetails">
							{ this.props.loggedUser && this.state.isMember === false &&
								<ProjectJoin
									handler={this.handlerJoinProject.bind(this)}
								/>
							}
							{ this.props.loggedUser && this.props.loggedUser !== this.state.owner && this.state.isMember &&
								<ProjectLeave
									name={this.state.name}
									handler={this.handlerLeaveProject.bind(this)}
								/>
							}
							<ProjectDetails
								longDescription={this.state.longDescription}
								skills={this.state.skills}
								roles={this.state.roles}
								members={this.state.members}
								owner={this.state.owner}
								loggedUser={this.props.loggedUser}
								deleteMember={this.deleteMember.bind(this)}
							/>
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

export default withRouter(ProjectInfo);

