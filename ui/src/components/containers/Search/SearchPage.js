import React, { Component } from 'react';
import * as firebase from 'firebase';


import TextField from 'material-ui/TextField';
import IconButton from 'material-ui/IconButton';
import SearchIcon from '@material-ui/icons/Search';

import CheckboxList from '../../presentational/Shared/CheckboxList';
import '../../style/style.css';

class SearchPage extends Component {
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

	render() {
		return (
			<div>
				<h3>Hello world</h3>
				<CheckboxList 
					listName="this is a list"
					items={this.skills}/>
				<div className="wrap">
					<div className="search">
				    	<input type="text" id="search-bar" className="searchTerm" placeholder="Search for users and projects." onKeyDown={this.onKeyPressed}/>
						<button type="submit" className="searchButton">
							<SearchIcon />
					    </button>
				   	</div>
				</div>
			</div>
		);
	}
}

export default SearchPage;

