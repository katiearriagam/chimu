import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import request from 'request';

import UserInfo from './components/containers/UserProfile/UserInfo';

import GitHub from "github-api";

class App extends Component {
	render() {
		console.log("Hello, this is my console");

		return(
			<div>
				<UserInfo/>
			</div>
		);
	}
}

export default App;

