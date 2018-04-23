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
import '../../style/style.css';

function TabContainer(props) {
	return (
		<div>
	    	<Typography component="div" style={{ padding: 8 * 3 }}>
		    	{props.children}
		    </Typography>
	    </div>
	);
}

class SearchPage extends Component {

	performSearch(){
		console.log("this is what I would search:");
		let searchBarValue = document.getElementById("search-bar").value;
		if(searchBarValue != ""){
			// do query
		}
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
      		value: 0
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
				    	<input type="text" id="search-bar" className="searchTerm" placeholder="Search for users and projects." onKeyDown={this.onKeyPressed}/>
						<button type="submit" className="searchButton">
							<SearchIcon />
					    </button>
				   	</div>
					<button variant="raised" id="skills-button" className="filter-button" onClick={this.toggleHiddenSkills.bind(this)}>Filter by Skills</button>
				</div>

				<div className="searchResults">
			        <AppBar position="static">
			        	<Tabs className="tab" value={value} onChange={this.handleChange}>
			    	    	<Tab className="tabLabel" label="Users" />
			            	<Tab className="tabLabel" label="Project" />
			          	</Tabs>
			        </AppBar>
			        {value === 0 && <TabContainer>Item One</TabContainer>}
			        {value === 1 && <TabContainer>Item Two</TabContainer>}
			        {value === 2 && <TabContainer>Item Three</TabContainer>}
			    </div>
			</div>
		);
	}
}

export default SearchPage;

