import React, { Component } from 'react';
import * as firebase from 'firebase';

import ProjectInfoSideBar from '../../presentational/Project/ProjectInfoSideBar';

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
					<div className="UserInfo">
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

