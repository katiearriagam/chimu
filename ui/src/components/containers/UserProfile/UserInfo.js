import React, { Component } from 'react';
import * as firebase from 'firebase';

import UserInfoSideBar from '../../presentational/User/UserInfoSideBar';
import UserProjectCard from '../../presentational/User/UserProjectCard';
import GitHub from "github-api";
import '../../style/style.css';

class UserInfo extends Component {
	constructor(props) {
	    // Required to call original constructor
	    super(props);
  	} 

	state = {
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
		    { key: 3, label: 'Back-end develoepr' }
		],
		previousProjects: [
			{
				title: 'flutter', 
				shortDescription: 'Flutter makes it easy and fast to build beautiful mobile apps.',
				image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
			},
			{
				title: 'flutter', 
				shortDescription: 'Lorem ipsum dolor sit amet, audire probatus ius cu. Est libris putant urbanitas et. Homero tempor cu nam, pro dissentias conclusionemque no. Odio quas elaboraret per cu. Sea ut platonem efficiantur, et liber fierent oportere pro. Nec eu modo dolores voluptaria.',
				image: 'https://avatars2.githubusercontent.com/u/33663932?s=200&v=4'
			},
			{
				title: 'flutter', 
				shortDescription: 'Flutter makes it easy and fast to build beautiful mobile apps.',
				image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
			},
			{
				title: 'flutter', 
				shortDescription: 'Flutter makes it easy and fast to build beautiful mobile apps.',
				image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
			},
			{
				title: 'flutter', 
				shortDescription: 'Flutter makes it easy and fast to build beautiful mobile apps.',
				image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
			},
			{
				title: 'flutter', 
				shortDescription: 'Lorem ipsum dolor sit amet, audire probatus ius cu. Est libris putant urbanitas et. Homero tempor cu nam, pro dissentias conclusionemque no. Odio quas elaboraret per cu. Sea ut platonem efficiantur, et liber fierent oportere pro. Nec eu modo dolores voluptaria.',
				image: 'https://avatars2.githubusercontent.com/u/33663932?s=200&v=4'
			},
			{
				title: 'flutter', 
				shortDescription: 'Flutter makes it easy and fast to build beautiful mobile apps.',
				image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
			},
			{
				title: 'flutter', 
				shortDescription: 'Flutter makes it easy and fast to build beautiful mobile apps.',
				image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
			}

		],
		currentProjects: [{
				title: 'flutter', 
				shortDescription: 'Flutter makes it easy and fast to build beautiful mobile apps.',
				image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
			},
			{
				title: 'flutter', 
				shortDescription: 'Flutter makes it easy and fast to build beautiful mobile apps.',
				image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4'
			}],
		username: 'hecerinc',
	};

  	async componentWillMount(){
  		const component = this; 
	    let followers_url = "";

	    const response = await fetch('https://api.github.com/users/' + component.state.username);
	    const json = await response.json();

	    this.setState({
	    	name: json.name,
	    	avatar_url: json.avatar_url,
	    	rating: '4.9',
	    	html_url: json.html_url,
	    	login: json.login,
	    	email: json.email
	    });

		console.log(component.state);
	}

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
		const headerPrevious = this.state.previousProjects.length > 0 ? ("PREVIOUS PROJECTS") : ("");
		const headerCurrent = this.state.currentProjects.length > 0 ? ("CURRENT PROJECTS") : ("");

		return (
			<div>
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
				<div className="UserProjects previousProjects">
					<h4 className="user-projects-subheader">{headerPrevious}</h4>
					{
			        	this.state.previousProjects.map(data => {
			        	return(
			        		<UserProjectCard 
			        			title={data.title}
			        			shortDescription={data.shortDescription}
			        			image={data.image}
			            	/>
			          	);
			        })}
				</div>
			</div>
		);
	}
	
}

export default UserInfo;

