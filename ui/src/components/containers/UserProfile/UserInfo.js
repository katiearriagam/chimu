import React, { Component } from 'react';
import UserInfoSideBar from '../../presentational/User/UserInfoSideBar';

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
		    { key: 3, label: 'Back-end developer' }
		],
		username: 'CharlieBradbury',
		followers_url: ''
	};

  	async componentWillMount(){
  		const component = this; 
	    let followers_url = "";

	    const response = await fetch('https://api.github.com/users/' + component.state.username);
	    const json = await response.json();
	    // just log ‘json’
	    followers_url = json.followers_url;

	    this.setState({
	    	name: json.name,
	    	avatar_url: json.avatar_url,
	    	rating: '4.9',
	    	html_url: json.html_url,
	    	login: json.login,
	    	email: 'katiarriaga@gmail.com'
	    });

		console.log(component.state);
	}


	render() {
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
	}
	
}

export default UserInfo;

