import React, { Component } from 'react';
import * as firebase from 'firebase';


import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Button from 'material-ui/Button';

import AppBar from 'material-ui/AppBar';
import Tabs, { Tab } from 'material-ui/Tabs';
import Typography from 'material-ui/Typography';

import CheckboxList from '../../presentational/Shared/CheckboxList';
import UserProjectCard from '../../presentational/User/UserProjectCard';
import UserCard from '../../presentational/User/UserCard';


import '../../style/style.css';

/*
function TabContainer(props) {
	return (
		<div className="previousProjects">
			<h4 className="user-projects-subheader">User Projects</h4>
			{
			   	this.props.projects.map(data => {
			    	return(
			       		<UserProjectCard 
			       			title={data.title}
			       			shortDescription={data.shortDescription}
			    			image={data.image}
							key={this.props.indexOf(data)}
							link={data.link}
		            	/>
			       	);
		    	})}
		</div>
	);
}
*/

class SearchPage extends Component {

	performSearch(){
		console.log("this is what I would search:");
		let searchBarValue = document.getElementById("search-bar").value;
		if(searchBarValue != ""){
			// do query
		}
	}

	loadProjects(){
		this.setState({
      		currentProjects: []
		});

		var db = firebase.firestore();

		var projectCol = db.collection("Users_Projects").get().then((projectInfos) => {
			projectInfos.forEach((projectInfo) => {
				projectInfo.data().project.get().then((project) => {
					project.data().owner.get().then((user) => {
						this.setState(prevState => ({
							currentProjects: [...prevState.currentProjects, {
									title: project.id,
									shortDescription: project.data().sdesc,
									image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4',
									link: '/project/' + user.id + '/' + project.id,
							}]
						}));
						console.log(project.id);
						console.log(project.data().sdesc);
						console.log('/project/' + user.id + '/' + project.id);
					});
				}).catch(function(error){
					console.log("Error getting documents: ", error);
				})})});
	}

	loadUsers(){
		this.setState({
      		currentUsers: []
		});

		var db = firebase.firestore();



		var userCol = db.collection("Users").get().then((users)=>{

			users.forEach((user) => {
				const response = fetch('https://api.github.com/users/' + user.id).then((response) => {
				
					// Examine the text in the response
					response.json().then((json) => {

						this.setState(prevState => ({
								currentUsers: [...prevState.currentUsers, { 
									username: user.id,
									image: json.avatar_url,
									rating: '4.0',
									link: '/user/' + user.id
								}]
							}));					
					});
				
				}).catch((error) => {
					console.log("Github Fetch Error:", error);
				});
			});

		}).catch(function(error){
			console.log("Error getting documents: ", error);
		});


	}

	onKeyPressed(e){
		const ENTER_KEY_CODE = 13;
		if(e.keyCode == ENTER_KEY_CODE){
			console.log("this is what I would search:");
			let searchBarValue = document.getElementById("search-bar").value;
			if(searchBarValue != ""){
				// do query
			}
		}
	}
	
	skills = [
		{label: '.NET' },
		{label: 'Adobe InDesign' },
		{label: 'Adobe Lightroom' },
		{label: 'Adobe LiveCycle Designer' },
		{label: 'Adobe Premiere Pro' },
		{label: 'Afrikaans' },
		{label: 'After Effects' },
		{label: 'Agile Development' },
		{label: 'Agronomy' },
		{label: 'Air Conditioning' },
		{label: 'Airbnb' },
		{label: 'AJAX' },
		{label: 'Albanian' },
		{label: 'Algorithm' },
		{label: 'Alibaba' },
		{label: 'Amazon Fire' },
		{label: 'Amazon Kindle' },
		{label: 'Amazon Web Services' },
		{label: 'AMQP' },
		{label: 'Analytics' },
		{label: 'Android' },
		{label: 'Android Honeycomb' },
		{label: 'Android Wear SDK' },
		{label: 'Angular.js' },
		{label: 'Animation' },
		{label: 'ASP' },
		{label: 'ASP.NET' },
		{label: 'Asphalt' },
		{label: 'Assembly' },
		{label: 'Asterisk PBX' },
		{label: 'Astrophysics' },
		{label: 'Attic Access Ladders' },
		{label: 'Attorney' },
		{label: 'Audio Production' },
		{label: 'Audio Services' },
		{label: 'Audit' },
		{label: 'Augmented Reality' },
		{label: 'AutoCAD' },
		{label: 'Autotask' },
		{label: 'Awnings' },
		{label: 'Axure' },
		{label: 'Azure' },
		{label: 'backbone.js' },
		{label: 'Balsamiq' },
		{label: 'Buyer Sourcing' },
		{label: 'C Programming' },
		{label: 'C# Programming' },
		{label: 'C++ Programming' },
		{label: 'CAD/CAM' },
		{label: 'CakePHP' },
		{label: 'CGI' },
		{label: 'Computer Graphics' },
		{label: 'Computer Help' },
		{label: 'Computer Security' },
		{label: 'Crystal Reports' },
		{label: 'CS-Cart' },
		{label: 'CSS' },
		{label: 'CubeCart' },
		{label: 'CUDA' },
		{label: 'Customer Service' },
		{label: 'Customer Support' },
		{label: 'iPad' },
		{label: 'iPhone' },,
		{label: 'Java' },
		{label: 'JavaFX' },
		{label: 'Javascript' },
		{label: 'jQuery / Prototype' },
		{label: 'JSON' },
		{label: 'JSP' }
	];

	constructor(){
    	super()
    	this.state = {
      		isHiddenSkills: true,
      		value: 0,
      		currentProjects: []
    	}
	}


	handleChange = (event, value) => {
		this.setState({ value });
	};
	
	toggleHiddenSkills () {
		this.setState({
	    	isHiddenSkills: !this.state.isHiddenSkills
	    })
	}

	componentDidMount(){
		this.setState({
			isHiddenSkills: true,
      		value: 0,
      		currentProjects: [],
      		currentUsers: []
		});
		this.loadProjects();
		this.loadUsers();
	}


	render() {
		const { value } = this.state;

		return (
			<div>
				<h4 className="pageHeader">Search</h4>
				{!this.state.isHiddenSkills && 
					<div id="skills-modal" className="modal">
					  	<div className="skills-modal-content">
						    <span className="close" onClick={this.toggleHiddenSkills.bind(this)}>&times;</span>
							    <span>
									<CheckboxList 
										listName="SKILLS"
										items={this.skills}/>
								</span>
						</div>
					</div>
				}
				<div className="wrap">
					<div className="search">
				    	<input type="text" id="search-bar" className="searchTerm" placeholder="Search for users and projects." value="" onKeyDown={this.onKeyPressed}/>
						<button type="submit" className="searchButton">
							<SearchIcon />
					    </button>
				   	</div>
					<button variant="raised" id="skills-button" className="filter-button" onClick={this.toggleHiddenSkills.bind(this)}>Filter by Skills</button>
				</div>

				<div className="searchResults">
			        <AppBar position="static">
			        	<Tabs className="tab" value={value} onChange={this.handleChange}>
			    	    	<Tab className="tabLabel" label="Projects" />
			            	<Tab className="tabLabel" label="Users" />
			          	</Tabs>
			        </AppBar>
			        {value === 0 && 
			        	<div className="previousProjects">
							<h4 className="user-projects-subheader">Projects</h4>
							{
							   	this.state.currentProjects.map(data => {
							    	return(
							       		<UserProjectCard 
							       			title={data.title}
							       			shortDescription={data.shortDescription}
							    			image={data.image}
											//key={this.props.indexOf(data)}
											link={data.link}
						            	/>
							       	);
						    	})}
						</div>
			    	}

			    	{value === 1 && 
			        	<div className="previousProjects">
							<h4 className="user-projects-subheader">Users</h4>
							{
							   	this.state.currentUsers.map(data => {
							    	return(
							       		<UserCard 
							       			username={data.username}
							       			rating={data.rating}
							    			image={data.image}
											link={data.link}
						            	/>
							       	);
						    	})}
						</div>
			    	}
			    </div>
			</div>
		);
	}
}

export default SearchPage;

