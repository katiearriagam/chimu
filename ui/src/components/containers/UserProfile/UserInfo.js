import React, { Component } from 'react';
import * as firebase from 'firebase';

import UserInfoSideBar from '../../presentational/User/UserInfoSideBar';

class UserInfo extends Component {
  	componentDidMount(){
		var db = firebase.firestore();
	    const response = fetch('https://api.github.com/users/' + this.props.match.params.username).then((response) => {
			if (response.status !== 200) {
				this.setState({
					valid: false,
				})
				console.log('Looks like there was a problem. Status Code: ' + response.status);
			} else {
				// Examine the text in the response
				response.json().then((json) => {
					// Get user information from Firebase
					var docRef = db.collection("Users").doc(this.props.match.params.username);
					docRef.get().then((doc) => {
						if (doc.exists) {
							var info = doc.data();
							this.setState({
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
								name: json.name,
								avatar_url: json.avatar_url,
								rating: '4.9',
								html_url: json.html_url,
								login: json.login,
								email: info.email,
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
				});
			}
		}).catch((error) => {
			console.log("Github Fetch Error:", error);
		});
	}


	render() {
		if (this.state) {
			if (this.state.valid) {
				return (
					<div className="UserInfo">
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

