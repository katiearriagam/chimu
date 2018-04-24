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

class SearchPage extends Component {

	getSearchTerm(){
		console.log("this is what I would search:");
		let searchBarValue = document.getElementById("search-bar").value;
		if(searchBarValue != ""){
			return searchBarValue;
		}
		else return "";
	}

	loadProjects(){
		this.setState({
      		currentProjects: []
		});

		var db = firebase.firestore();
		
		if (this.getSearchTerm() != "") {
			db.collection("Projects").get().then((userFolders) => {
				userFolders.forEach((userFolder) => {
					userFolder.ref.collection("projects").get().then((projects) => {
					//userFolder.ref.collection("projects").where(firebase.firestore.FieldPath.documentId(), "==", this.getSearchTerm()).get().then((projects) => {
						projects.forEach((project) => {
							if (project.id == this.getSearchTerm()) {
								this.setState(prevState => ({
									currentProjects: [...prevState.currentProjects, {
											title: project.id,
											shortDescription: project.data().sdesc,
											image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4',
											link: '/project/' + userFolder.id + '/' + project.id,
									}]
								}));
							} else {
								var keywords = project.data().keywords;
								keywords.every((key) => {
									console.log(key);
									console.log(this.getSearchTerm());
									if (key.toLowerCase() == this.getSearchTerm().toLowerCase()) {
										this.setState(prevState => ({
											currentProjects: [...prevState.currentProjects, {
													title: project.id,
													shortDescription: project.data().sdesc,
													image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4',
													link: '/project/' + userFolder.id + '/' + project.id,
											}]
										}));
										return "success";
									}
								});
							}
						});
					}).catch((error) => {
						console.log("Error getting documents: ", error);
					});
				});
			}).catch((error) =>{
				console.log("Error getting documents: ", error);
			});
		} else {
			db.collection("Projects").get().then((userFolders) => {
				userFolders.forEach((userFolder) => {
					userFolder.ref.collection("projects").get().then((projects) => {
						projects.forEach((project) => {
							this.setState(prevState => ({
								currentProjects: [...prevState.currentProjects, {
										title: project.id,
										shortDescription: project.data().sdesc,
										image: 'https://avatars1.githubusercontent.com/u/14101776?s=200&v=4',
										link: '/project/' + userFolder.id + '/' + project.id,
								}]
							}));
						});
					}).catch((error) => {
						console.log("Error getting documents: ", error);
					});
				});
			}).catch((error) =>{
				console.log("Error getting documents: ", error);
			});
		}
	}

	loadUsers(){
		this.setState({
      		currentUsers: []
		});

		var db = firebase.firestore();

		console.log('searching for -> ' + this.getSearchTerm());

		if(this.getSearchTerm() != ""){
			var userCol = db.collection("Users").where(firebase.firestore.FieldPath.documentId(), "==", this.getSearchTerm()).get().then((users)=>{

				users.forEach((user) => {
					const response = fetch('https://api.github.com/users/' + user.id).then((response) => {
					
						// Examine the text in the response
						response.json().then((json) => {
							
							// Get user's projects information
							var projectCol = db.collection("Users_Projects").where("user", "==", user.ref).where("isApproved", "==", true).where("hasAccepted", "==", true).get().then((projectInfos) => {
								var projectCant = projectInfos.size;
								var ratingCant = 0;
								var ratingSum = 0;
								var rating = 0;
								projectInfos.forEach((projectInfo) => {
									projectInfo.data().project.get().then((project) => {
										// Get completed projects
										if (project.data().status) {
											if (projectInfo.data().rating) {
												ratingSum = ratingSum + projectInfo.data().rating;
												ratingCant = ratingCant + 1;
											}
										}
										console.log("one");
									}).then(() => {
										if (ratingCant === 0) {
											rating = 5;	
										} else {
											rating = ratingSum/ratingCant;	
										}
										projectCant = projectCant - 1;
										console.log("two");
										console.log("attempting three");
										if (projectCant == 0) {
											console.log("three");
											this.setState(prevState => ({
												currentUsers: [...prevState.currentUsers, { 
													username: user.id,
													image: json.avatar_url,
													rating: rating,
													link: '/user/' + user.id
												}]
											}));
										}
									}).catch(function(error) {
										console.log("Error getting documents: ", error);
									});
								});
							}).catch(function(error) {
								console.log("Error getting documents: ", error);
							});				
						});
					
					}).catch((error) => {
						console.log("Github Fetch Error:", error);
					});
				});

			}).catch(function(error){
				console.log("Error getting documents: ", error);
			});	
		}
		else{
			var userCol = db.collection("Users").get().then((users)=>{

				users.forEach((user) => {
					const response = fetch('https://api.github.com/users/' + user.id).then((response) => {
					
						// Examine the text in the response
						response.json().then((json) => {
							
							// Get user's projects information
							var projectCol = db.collection("Users_Projects").where("user", "==", user.ref).where("isApproved", "==", true).where("hasAccepted", "==", true).get().then((projectInfos) => {
								var projectCant = projectInfos.size;
								var ratingCant = 0;
								var ratingSum = 0;
								var rating = 0;
								projectInfos.forEach((projectInfo) => {
									projectInfo.data().project.get().then((project) => {
										// Get completed projects
										if (project.data().status) {
											if (projectInfo.data().rating) {
												ratingSum = ratingSum + projectInfo.data().rating;
												ratingCant = ratingCant + 1;
											}
										}
									}).then(() => {
										if (ratingCant === 0) {
											rating = 5;	
										} else {
											rating = ratingSum/ratingCant;	
										}
										projectCant = projectCant - 1;

										if (projectCant == 0) {
											this.setState(prevState => ({
												currentUsers: [...prevState.currentUsers, { 
													username: user.id,
													image: json.avatar_url,
													rating: rating,
													link: '/user/' + user.id
												}]
											}));
										}
									}).catch(function(error) {
										console.log("Error getting documents: ", error);
									});
								});
							}).catch(function(error) {
								console.log("Error getting documents: ", error);
							});				
						});
					
					}).catch((error) => {
						console.log("Github Fetch Error:", error);
					});
				});

			}).catch(function(error){
				console.log("Error getting documents: ", error);
			});	
		}
	}

	clickedSearch(){
		this.loadUsers();
		this.loadProjects();
	}

	handler(index) {
		const skills = this.state.skills;
	    skills[index].isChecked = !skills[index].isChecked;
	    this.forceUpdate();
    }

	onKeyPressed(e){
		const ENTER_KEY_CODE = 13;
		if(e.keyCode == ENTER_KEY_CODE){
			console.log("pressed enter");
			this.clickedSearch();
		}
	}

	/*
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
	];*/
	
	loadSkills() {
		this.setState({
      		skills: [],
		});

		var db = firebase.firestore();
		
		db.collection("Skills").get().then((skills) => {
			skills.forEach((skill) => {
				this.setState(prevState => ({
					skills: [...prevState.skills, { 
						label: skill.id,
						isChecked: false
					}]
				}));
			});
		});
	}

	constructor(){
    	super()
    	this.state = {
      		isHiddenSkills: true,
      		value: 0,
      		currentProjects: []
    	}
    	this.clickedSearch = this.clickedSearch.bind(this);
    	this.onKeyPressed = this.onKeyPressed.bind(this);
    	this.loadUsers = this.loadUsers.bind(this);
	    this.loadProjects = this.loadProjects.bind(this);
		this.loadSkills = this.loadSkills.bind(this);
        this.handler = this.handler.bind(this);
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
      		currentUsers: [],
			skills: []
		});
		this.loadProjects();
		this.loadUsers();
		this.loadSkills();
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
										items={this.state.skills}
										action={this.handler}/>
								</span>
						</div>
					</div>
				}
				<div className="wrap">
					<div className="search">
				    	<input type="text" id="search-bar" className="searchTerm" placeholder="Search for users and projects." onKeyDown={this.onKeyPressed}/>
						<button type="submit" className="searchButton" onClick={this.clickedSearch}>
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

