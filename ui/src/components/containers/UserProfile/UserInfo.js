import React, { Component } from 'react';
import * as firebase from 'firebase';

import UserInfoSideBar from '../../presentational/User/UserInfoSideBar';
import UserProjectCard from '../../presentational/User/UserProjectCard';

import '../../style/style.css';

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
								previousProjects: [],
								currentProjects: [],
								skills: [],
								roles: [],
								name: json.name,
								avatar_url: json.avatar_url,
								rating: '4.9',
								html_url: json.html_url,
								login: json.login,
								email: info.public_email,
								valid: true,
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
							
							// Get user's projects information
							var projectCol = db.collection("Projects").doc(this.props.match.params.username).collection("projects");
							projectCol.where("status", "==", true).get().then((docs) => {
								docs.forEach((project) => {
									this.setState(prevState => ({
										currentProjects: [...prevState.currentProjects, {
															title: project.id,
															shortDescription: project.data().sdesc,
															image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
														 }]
									}));
								});
							}).catch(function(error) {
								console.log("Error getting documents: ", error);
							});
							
							projectCol.where("status", "==", false).get().then((docs) => {
								docs.forEach((project) => {
									this.setState(prevState => ({
										previousProjects: [...prevState.previousProjects, {
															title: project.id,
															shortDescription: project.data().sdesc,
															image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
														 }]
									}));
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


	render() {
		if (this.state) {
			if (this.state.valid) {
				const headerPrevious = this.state.previousProjects.length > 0 ? ("PREVIOUS PROJECTS") : ("");
				const headerCurrent = this.state.currentProjects.length > 0 ? ("CURRENT PROJECTS") : ("");
				return (
					<div>
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
						<div className="UserProjects currentProjects">
							<h4 className="user-projects-subheader">{headerCurrent}</h4>
							{
				        	this.state.currentProjects.map(data => {
					        	return(
					        		<UserProjectCard 
					        			title={data.title}
					        			shortDescription={data.shortDescription}
					        			image={data.image}
										key={this.state.currentProjects.indexOf(data)}
					            	/>
					          	);
					        })}
						</div>
						<div className="UserProjects previousProjects">
							<h4 className="user-projects-subheader">{headerPrevious}</h4>
							{
					        	this.state.previousProjects.map(data => {
					        	return(
					        		<UserProjectCard 
					        			title={data.title}
					        			shortDescription={data.shortDescription}
					        			image={data.image}
										key={this.state.previousProjects.indexOf(data)}
					            	/>
					          	);
					        })}
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

