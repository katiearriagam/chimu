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
					skills: [
						{ key: 0, label: 'React' },
						{ key: 1, label: 'JavaScript' },
						{ key: 3, label: 'Vue.js' },
						{ key: 5, label: 'PHP' },
						{ key: 4, label: 'Firebase' },
					],
					roles: [
						{ key: 0, label: 'Designer' },
						{ key: 1, label: 'Front-end developer' },
						{ key: 3, label: 'Back-end developer' }
					],
					longDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
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

