import React, { Component } from 'react';
import * as firebase from 'firebase';

import ProjectInfoSideBar from '../../presentational/Project/ProjectInfoSideBar';

class ProjectInfo extends Component {
  	componentDidMount(){
		var db = firebase.firestore();
		// Get user information from Firebase
		var docRef = db.collection("Projects").doc(this.props.propKey);
		docRef.get().then((doc) => {
			if (doc.exists) {
				var info = doc.data();
				info.owner.get().then((user) => {
					if (user.exists) {
						this.setState({
							keys: info.keywords,
							name: info.name,
							status: info.status,
							repo_url: info.repo,
							owner: user.id,
							avatar_url: 'https://images.fineartamerica.com/images-medium-large/puppy-portrait-snake-jagger.jpg',
							sdesc: info.sdesc,
						});
					}
				}).catch((error) => {
					console.log("Error getting document:", error);
				});
			} else {
				console.log("No such document!");
			}
		}).catch((error) => {
			console.log("Error getting document:", error);
		});
	}


	render() {
		if (this.state) {
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
			return null;
		}
	}
	
}

export default ProjectInfo;

