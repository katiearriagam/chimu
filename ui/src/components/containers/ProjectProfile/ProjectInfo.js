import React, { Component } from 'react';
import * as firebase from 'firebase';

import ProjectInfoSideBar from '../../presentational/Project/ProjectInfoSideBar';
import ProjectDetails from '../../presentational/Project/ProjectDetails';

import '../../style/style.css';


class ProjectInfo extends Component {
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
					avatar_url: 'https://images.fineartamerica.com/images-medium-large/puppy-portrait-snake-jagger.jpg',
					sdesc: info.sdesc,
					valid: true,
					skills: [],
					roles: [],
					longDescription: info.ldesc,
					members: []
				});
				db.collection("Users_Projects").where("project", "==", docRef).where("isApproved", "==", true).get().then((projectInfos) => {
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
										hex: skill.data().hex,
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
										hex: role.data().hex,
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
								members={this.state.members}
								updateRatings={this.updateRatings.bind(this)}
							/>
						</div>
						<div className="ProjectDetails">
							<ProjectDetails
								longDescription={this.state.longDescription}
								skills={this.state.skills}
								roles={this.state.roles}
								members={this.state.members}
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

export default ProjectInfo;

