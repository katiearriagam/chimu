import React, { Component } from 'react';
import * as firebase from 'firebase';

import ProjectInfoSideBar from '../../presentational/Project/ProjectInfoSideBar';
import ProjectDetails from '../../presentational/Project/ProjectDetails';

import '../../style/style.css';


class ProjectInfo extends Component {
  	componentDidMount(){
		var db = firebase.firestore();
		// Get project information from Firebase
		var docRef = db.collection("Projects").doc(this.props.match.params.username).collection("projects").doc(this.props.match.params.project);
		docRef.get().then((doc) => {
			if (doc.exists) {
				var info = doc.data();
				console.log(info);
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
					members: [
						{username: 'katiearriagam', avatar: 'https://avatars0.githubusercontent.com/u/14140121?s=400&u=ee4802ab6dbcc76aa049b0c6e42ba84b5a017c28&v=4'},
						{username: 'katiearriagam', avatar: 'https://avatars0.githubusercontent.com/u/14140121?s=400&u=ee4802ab6dbcc76aa049b0c6e42ba84b5a017c28&v=4'},
						{username: 'katiearriagam', avatar: 'https://avatars0.githubusercontent.com/u/14140121?s=400&u=ee4802ab6dbcc76aa049b0c6e42ba84b5a017c28&v=4'},
						{username: 'katiearriagam', avatar: 'https://avatars0.githubusercontent.com/u/14140121?s=400&u=ee4802ab6dbcc76aa049b0c6e42ba84b5a017c28&v=4'},
					]
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

